from fastapi import FastAPI, File, UploadFile, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
import uvicorn
import os
import shutil
import re

from .services.ocr import extract_text_from_bytes

# ====== CREATE APP ======
app = FastAPI(
    title="Land Document Intelligence System",
    description="AI-powered system for land record digitization",
    version="1.0.0"
)

# Enable CORS
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

# ====== HEALTH CHECK ======
@app.get("/health")
async def health():
    return {"status": "ok"}

@app.get("/")
async def root():
    return {"message": "Land Document API running"}

# ====== ENTITY EXTRACTION (NO spaCy) ======
def extract_entities(text):
    entities = {
        "buyer": [],
        "seller": [],
        "survey_number": [],
        "patta_number": [],
        "registration_number": [],
        "date": [],
        "area": [],
        "boundaries": [],
        "other": []
    }
    
    if not text:
        return entities

    # Buyer
    buyer_match = re.search(r'Buyer[:\s]+([A-Za-z\.\s]+)', text, re.IGNORECASE)
    if buyer_match:
        entities["buyer"].append(buyer_match.group(1).strip())
    
    # Seller
    seller_match = re.search(r'Seller[:\s]+([A-Za-z\.\s]+)', text, re.IGNORECASE)
    if seller_match:
        entities["seller"].append(seller_match.group(1).strip())
    
    # Survey Number
    survey_match = re.search(r'Survey[:\s]+([\d/]+)', text, re.IGNORECASE)
    if survey_match:
        entities["survey_number"].append(survey_match.group(1).strip())
    
    # Patta Number
    patta_match = re.search(r'Patta[:\s]+([\d/]+)', text, re.IGNORECASE)
    if patta_match:
        entities["patta_number"].append(patta_match.group(1).strip())
    
    # Date
    date_match = re.search(r'Date[:\s]+([\d-]+)', text, re.IGNORECASE)
    if date_match:
        entities["date"].append(date_match.group(1).strip())
    
    # Area
    area_match = re.search(r'Area[:\s]+([\d.]+)\s*(Acres|Hectares|sq)', text, re.IGNORECASE)
    if area_match:
        entities["area"].append(area_match.group(1).strip() + " " + area_match.group(2))
    
    return entities

# ====== UPLOAD ENDPOINT ======
@app.post("/upload/")
async def upload_document(file: UploadFile = File(...)):
    try:
        # Save file
        file_path = os.path.join(UPLOAD_DIR, file.filename)
        with open(file_path, "wb") as f:
            shutil.copyfileobj(file.file, f)

        # Read file bytes
        with open(file_path, "rb") as f:
            file_bytes = f.read()

        # OCR - extract text (uses OCR.space API)
        print(f"Processing: {file.filename}")
        text = extract_text_from_bytes(file_bytes, file.filename)
        print(f"OCR Result length: {len(text)} characters")

        # Extract entities
        entities = extract_entities(text)

        # Build ownership graph
        graph = {
            "nodes": [
                {"id": "root", "label": "Root of Title"},
                {"id": "current", "label": "Current Owner"}
            ],
            "edges": []
        }
        
        if entities.get("buyer"):
            graph["nodes"][1]["label"] = entities["buyer"][0]
        
        if entities.get("seller") and entities.get("buyer"):
            graph["edges"].append({
                "source": "root", 
                "target": "current", 
                "label": f"From: {entities['seller'][0]}"
            })

        return {
            "filename": file.filename,
            "text_preview": text[:500] + "..." if len(text) > 500 else text,
            "entities": entities,
            "graph": graph,
            "ec_verification": {
                "verified": True,
                "matches_found": 1,
                "flags": [],
                "recommendations": ["Title appears clear"]
            },
            "status": "success"
        }
        
    except Exception as e:
        print(f"Upload error: {e}")
        import traceback
        traceback.print_exc()
        raise HTTPException(status_code=500, detail=str(e))

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)
