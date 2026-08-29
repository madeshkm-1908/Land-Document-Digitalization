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
        # Use the bytes version for PDF support
        text = extract_text_from_bytes(file_bytes, file.filename)
        
        if not text or len(text.strip()) < 50:
            # Try with preprocessing for better OCR
            print("Low text extraction, trying preprocessing...")
            processed_path = preprocess_image(file_path)
            if processed_path:
                text = extract_text(processed_path)
        
        # Step 2: NLP - Extract entities from text
        entities = extract_land_entities(text)
        
        # Step 3: Build ownership graph
        graph_data = build_ownership_graph(entities)
        
        # Step 4: EC Verification (if applicable)
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
