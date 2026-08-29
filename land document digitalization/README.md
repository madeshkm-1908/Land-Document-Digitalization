# Land Document Intelligence System

AI-powered system for land record digitization, ownership verification, and fraud detection.

## Features
- OCR-based text extraction from scanned deeds
- NLP for entity extraction (buyer, seller, survey number, etc.)
- Ownership graph visualization
- EC (Encumbrance Certificate) verification
- Fraud detection and flagging

## Tech Stack
- **Frontend:** React, TypeScript, Tailwind CSS, Cytoscape.js
- **Backend:** Python, FastAPI
- **OCR:** Tesseract, EasyOCR
- **NLP:** spaCy, Transformers
- **Database:** PostgreSQL, Neo4j

## Run Locally

```bash
# With Docker Compose
docker-compose up

# Or manually
cd backend && uvicorn app.main:app --reload
cd frontend && npm start