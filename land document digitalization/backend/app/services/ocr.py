import pytesseract
from PIL import Image
import cv2
import numpy as np
import os
from ..config import settings

def preprocess_image(image_path):
    """
    Preprocess image for better OCR accuracy
    - Convert to grayscale
    - Apply thresholding
    - Denoise
    """
    img = cv2.imread(image_path)
    gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)
    
    # Apply thresholding
    thresh = cv2.threshold(gray, 0, 255, cv2.THRESH_BINARY + cv2.THRESH_OTSU)[1]
    
    # Denoise
    denoised = cv2.fastNlMeansDenoising(thresh, None, 30, 7, 21)
    
    # Save processed image
    processed_path = image_path.replace(".", "_processed.")
    cv2.imwrite(processed_path, denoised)
    return processed_path

def extract_text(image_path, use_preprocessed=False):
    """
    Extract text from image using Tesseract OCR
    """
    try:
        if use_preprocessed:
            image = Image.open(image_path)
        else:
            image = Image.open(image_path)
        
        # Configure Tesseract for Indian English and Hindi
        custom_config = r'--oem 3 --psm 6 -l eng+hin'
        text = pytesseract.image_to_string(image, config=custom_config)
        return text.strip()
    
    except Exception as e:
        print(f"OCR Error: {e}")
        return ""

def extract_table_text(image_path):
    """
    Extract table-formatted text (for EC records, deed tables)
    """
    # Simplified - use pytesseract with table-specific config
    custom_config = r'--oem 3 --psm 11 -l eng'
    text = pytesseract.image_to_string(Image.open(image_path), config=custom_config)
    return text.strip()