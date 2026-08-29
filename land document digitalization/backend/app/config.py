import os
from dotenv import load_dotenv

load_dotenv()

class Settings:
    # Database
    DATABASE_URL = os.getenv("DATABASE_URL", "postgresql://user:pass@localhost:5432/land_db")
    
    # Neo4j
    NEO4J_URI = os.getenv("NEO4J_URI", "bolt://localhost:7687")
    NEO4J_USER = os.getenv("NEO4J_USER", "neo4j")
    NEO4J_PASSWORD = os.getenv("NEO4J_PASSWORD", "password")
    
    # OCR
    TESSERACT_CMD = os.getenv("TESSERACT_CMD", "tesseract")
    
    # Upload settings
    UPLOAD_DIR = "uploads"
    MAX_FILE_SIZE = 10485760  # 10MB
    
    # Demo mode
    DEMO_MODE = True

settings = Settings()