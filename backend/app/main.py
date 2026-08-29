from fastapi import FastAPI, File, UploadFile, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
import uvicorn
import os
import shutil

# ====== CREATE APP FIRST (NO HEAVY IMPORTS) ======
app = FastAPI(title="Land Document System", version="1.0.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

UPLOAD_DIR = "uploads"
os.makedirs(UPLOAD_DIR, exist_ok=True)

# ====== HEALTH CHECK - FASTEST RESPONSE ======
@app.get("/health")
async def health():
    return {"status": "ok"}

@app.get("/")
async def root():
    return {"message": "API running"}

# ====== UPLOAD ENDPOINT (LAZY LOAD HEAVY STUFF) ======
@app.post("/upload/")
async def upload_document(file: UploadFile = File(...)):
    try:
        # Save file
        file_path = os.path.join(UPLOAD_DIR, file.filename)
        with open(file_path, "wb") as f:
            shutil.copyfileobj(file.file, f)

        # === LAZY IMPORT HEAVY MODULES HERE ===
        from .services.ocr import extract_text_from_bytes
        from .services.nlp import extract_land_entities
        from .services.graph import build_ownership_graph
        from .services.ec_verification import verify_with_ec

        # Read file
        with open(file_path, "rb") as f:
            file_bytes = f.read()

        # OCR
        text = extract_text_from_bytes(file_bytes, file.filename)

        # NLP
        entities = extract_land_entities(text)

        # Graph
        graph = build_ownership_graph(entities)

        # EC
        ec = verify_with_ec(entities)

        return {
            "filename": file.filename,
            "text_preview": text[:300],
            "entities": entities,
            "graph": graph,
            "ec_verification": ec,
            "status": "success"
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)
