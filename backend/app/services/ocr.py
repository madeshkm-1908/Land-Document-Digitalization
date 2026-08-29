import pytesseract
from PIL import Image
import cv2
import numpy as np
import os
import io
from pdf2image import convert_from_bytes
from ..config import settings

def preprocess_image(image_path):
    """
    Preprocess image for better OCR accuracy
    """
    try:
        img = cv2.imread(image_path)
        if img is None:
            print(f"Warning: Could not read image at {image_path}")
            return None
        
        gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)
        thresh = cv2.threshold(gray, 0, 255, cv2.THRESH_BINARY + cv2.THRESH_OTSU)[1]
        denoised = cv2.fastNlMeansDenoising(thresh, None, 30, 7, 21)
        
        processed_path = image_path.replace(".", "_processed.")
        cv2.imwrite(processed_path, denoised)
        return processed_path
    except Exception as e:
        print(f"Preprocessing error: {e}")
        return None

def extract_text_from_image(image):
    """
    Extract text from PIL Image using Tesseract OCR
    """
    try:
        custom_config = r'--oem 3 --psm 6 -l eng+hin'
        text = pytesseract.image_to_string(image, config=custom_config)
        return text.strip()
    except Exception as e:
        print(f"OCR Error: {e}")
        return ""

def extract_text_from_pdf(pdf_bytes):
    """
    Convert PDF to images and extract text from all pages
    """
    try:
        images = convert_from_bytes(pdf_bytes, dpi=200)
        all_text = ""
        for i, image in enumerate(images):
            text = extract_text_from_image(image)
            all_text += f"\n--- Page {i+1} ---\n{text}"
        return all_text.strip()
    except Exception as e:
        print(f"PDF OCR Error: {e}")
        return ""

def extract_text(file_path):
    """
    Extract text from file (supports images and PDFs)
    """
    try:
        # Check if it's a PDF
        if file_path.lower().endswith('.pdf'):
            with open(file_path, 'rb') as f:
                pdf_bytes = f.read()
            return extract_text_from_pdf(pdf_bytes)
        
        # Handle images
        image = Image.open(file_path)
        return extract_text_from_image(image)
    
    except Exception as e:
        print(f"Extract text error: {e}")
        return ""

def extract_text_from_bytes(file_bytes, filename):
    """
    Extract text from bytes (for direct upload processing)
    """
    try:
        # Handle PDF
        if filename.lower().endswith('.pdf'):
            return extract_text_from_pdf(file_bytes)
        
        # Handle images
        image = Image.open(io.BytesIO(file_bytes))
        return extract_text_from_image(image)
    
    except Exception as e:
        print(f"Bytes OCR Error: {e}")
        return ""

def extract_table_text(image_path):
    """
    Extract table-formatted text
    """
    try:
        custom_config = r'--oem 3 --psm 11 -l eng'
        text = pytesseract.image_to_string(Image.open(image_path), config=custom_config)
        return text.strip()
    except Exception as e:
        print(f"Table OCR Error: {e}")
        return ""
