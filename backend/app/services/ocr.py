import requests
import base64
import os
from PIL import Image
import io

def extract_text_from_bytes(file_bytes, filename):
    """
    Send file to OCR.space API and return extracted text
    """
    try:
        api_key = os.getenv("OCR_API_KEY", "K84064978688957")  # Free demo key, replace with your own
        url = "https://api.ocr.space/parse/image"

        # Determine file type
        file_type = "PDF" if filename.lower().endswith('.pdf') else "JPG"

        # Encode file to base64
        base64_image = base64.b64encode(file_bytes).decode('utf-8')

        payload = {
            "apikey": api_key,
            "language": "eng",
            "isOverlayRequired": False,
            "filetype": file_type,
            "base64Image": f"data:image/jpeg;base64,{base64_image}"
        }

        print(f"Sending request to OCR.space for: {filename}")
        response = requests.post(url, data=payload, timeout=30)
        result = response.json()

        if result.get("IsErroredOnProcessing"):
            error_msg = result.get("ErrorMessage", "Unknown error")
            print(f"OCR Error: {error_msg}")
            return ""

        parsed_text = ""
        for page in result.get("ParsedResults", []):
            parsed_text += page.get("ParsedText", "") + "\n"

        return parsed_text.strip()

    except Exception as e:
        print(f"OCR API Error: {e}")
        return ""

def extract_text(file_path):
    """Fallback: read file and call extract_text_from_bytes"""
    try:
        with open(file_path, "rb") as f:
            file_bytes = f.read()
        return extract_text_from_bytes(file_bytes, os.path.basename(file_path))
    except Exception as e:
        print(f"Error reading file: {e}")
        return ""

def preprocess_image(image_path):
    """Placeholder for preprocessing"""
    return None
