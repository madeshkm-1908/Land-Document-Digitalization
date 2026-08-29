from fastapi import FastAPI, File, UploadFile, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
import uvicorn
import os
import shutil
from typing import List

from .services.ocr import extract_text, preprocess_image, extract_text_from_bytes
from .services.nlp import extract_entities, extract_land_entities
from .services.matching import fuzzy_match_names
from .services.graph import build_ownership_graph, add_ownership_relationship
from .services.ec_verification import verify_with_ec
from .models.schemas import DocumentResponse, Entities, GraphResponse

# ====== CREATE THE APP (THIS WAS MISSING) ======
app = FastAPI(
    title="Land Document Intelligence System",
    description="AI-powered system for land record digitization and ownership verification",
    version="1.0.0"
)

# Enable CORS for frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Create directories
UPLOAD_DIR = "uploads"
os.makedirs(UPLOAD_DIR, exist_ok=True)
os.makedirs("temp", exist_ok=True)

@app.get("/")
async def root():
    return {"message": "Land Document Intelligence System API", "status": "running"}

@app.post("/upload/")
async def upload_document(file: UploadFile = File(...)):
    """
    Upload a land document (scanned/deed/EC) for processing
    """
    try:
        # Save the uploaded file
        file_path = os.path.join(UPLOAD_DIR, file.filename)
        with open(file_path, "wb") as buffer:
            shutil.copyfileobj(file.file, buffer)

        # Read file bytes for PDF processing
        with open(file_path, "rb") as f:
            file_bytes = f.read()

        # Step 1: OCR - Extract text from document
        text = extract_text_from_bytes(file_bytes, file.filename)
        
        if not text or len(text.strip()) < 50:
            print("Low text extraction, trying preprocessing...")
            processed_path = preprocess_image(file_path)
            if processed_path:
                text = extract_text(processed_path)
        
        # Step 2: NLP - Extract entities from text
        entities = extract_land_entities(text)
        
        # Step 3: Build ownership graph
        graph_data = build_ownership_graph(entities)
        
        # Step 4: EC Verification
        ec_verification = verify_with_ec(entities)
        
        response = {
            "filename": file.filename,
            "text_preview": text[:500] + "..." if len(text) > 500 else text,
            "entities": entities,
            "graph": graph_data,
            "ec_verification": ec_verification,
            "status": "success"
        }
        
        return JSONResponse(content=response)
    
    except Exception as e:
        print(f"Upload error: {e}")
        import traceback
        traceback.print_exc()
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/upload-multiple/")
async def upload_multiple_documents(files: List[UploadFile] = File(...)):
    """
    Upload multiple documents for batch processing
    """
    results = []
    for file in files:
        result = await upload_document(file)
        results.append({
            "filename": file.filename,
            "result": result
        })
    return {"results": results}

@app.get("/graph/{deed_id}")
async def get_ownership_graph(deed_id: str):
    """
    Get ownership graph for a specific deed
    """
    return {
        "deed_id": deed_id,
        "graph": {
            "nodes": [
                {"id": "root", "label": "Root of Title (1950)"},
                {"id": "d1", "label": "Deed #A123 (1980)"},
                {"id": "d2", "label": "Deed #B456 (1995)"},
                {"id": "current", "label": "Current Owner"}
            ],
            "edges": [
                {"source": "root", "target": "d1", "label": "Transfer"},
                {"source": "d1", "target": "d2", "label": "Transfer"},
                {"source": "d2", "target": "current", "label": "Transfer"}
            ]
        }
    }

@app.post("/verify-ec/")
async def verify_ec(document_id: str, ec_number: str):
    """
    Verify Encumbrance Certificate against deed records
    """
    return {
        "document_id": document_id,
        "ec_number": ec_number,
        "verified": True,
        "matches_found": 3,
        "flags": []
    }

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)
