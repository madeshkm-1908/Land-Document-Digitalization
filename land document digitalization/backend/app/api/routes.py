from fastapi import APIRouter, File, UploadFile, HTTPException
from fastapi.responses import JSONResponse
import shutil
import os
from ..services.ocr import extract_text, preprocess_image
from ..services.nlp import extract_land_entities
from ..services.graph import build_ownership_graph
from ..services.ec_verification import verify_with_ec
from ..services.matching import fuzzy_match_names

router = APIRouter(prefix="/api/v1", tags=["api"])

@router.post("/process-document/")
async def process_document(file: UploadFile = File(...)):
    try:
        # Save file
        file_path = f"uploads/{file.filename}"
        os.makedirs("uploads", exist_ok=True)
        with open(file_path, "wb") as f:
            shutil.copyfileobj(file.file, f)
        
        # Process
        text = extract_text(file_path)
        entities = extract_land_entities(text)
        graph = build_ownership_graph(entities)
        ec = verify_with_ec(entities)
        
        return {
            "success": True,
            "filename": file.filename,
            "entities": entities,
            "graph": graph,
            "ec_verification": ec
        }
    except Exception as e:
        return JSONResponse(
            status_code=500,
            content={"success": False, "error": str(e)}
        )