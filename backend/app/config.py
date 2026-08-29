import os
from dotenv import load_dotenv

load_dotenv()

class Settings:
    DATABASE_URL = os.getenv("DATABASE_URL")
    OCR_API_KEY = os.getenv("OCR_API_KEY", "K84064978688957")
    UPLOAD_DIR = "uploads"
    MAX_FILE_SIZE = 10485760
    DEMO_MODE = True

settings = Settings()
