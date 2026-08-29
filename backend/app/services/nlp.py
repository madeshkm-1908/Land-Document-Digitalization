import re
import spacy
from typing import List, Dict
import numpy as np

# Try loading spaCy model, fallback to pattern matching
try:
    nlp = spacy.load("en_core_web_sm")
except:
    # If model not installed, download it
    import subprocess
    subprocess.run(["python", "-m", "spacy", "download", "en_core_web_sm"])
    nlp = spacy.load("en_core_web_sm")

def extract_entities(text):
    """
    Extract general entities using spaCy
    """
    doc = nlp(text)
    entities = {
        "persons": [],
        "dates": [],
        "organizations": [],
        "locations": []
    }
    
    for ent in doc.ents:
        if ent.label_ == "PERSON":
            entities["persons"].append(ent.text)
        elif ent.label_ == "DATE":
            entities["dates"].append(ent.text)
        elif ent.label_ == "ORG":
            entities["organizations"].append(ent.text)
        elif ent.label_ in ["GPE", "LOC"]:
            entities["locations"].append(ent.text)
    
    return entities

def extract_land_entities(text):
    """
    Extract land-specific entities from deed text
    """
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
    
    # Patterns for land document extraction
    patterns = {
        "buyer": [
            r"(?:buyer|purchaser|transferee|in favour of)[\s:]+([A-Z][a-z]+(?:\s[A-Z][a-z]+)*)",
            r"([A-Z][a-z]+(?:\s[A-Z][a-z]+)*)\s*(?:purchased|bought|acquired)"
        ],
        "seller": [
            r"(?:seller|vendor|transferor)[\s:]+([A-Z][a-z]+(?:\s[A-Z][a-z]+)*)",
            r"([A-Z][a-z]+(?:\s[A-Z][a-z]+)*)\s*(?:sold|transferred|conveyed)"
        ],
        "survey_number": [
            r"(?:Survey|Sy\.?|S\.?No\.?)[\s:]*([\d/]+)",
            r"Survey\s*Number[\s:]*([\d/]+)"
        ],
        "patta_number": [
            r"(?:Patta|P\.?No\.?)[\s:]*([\d/]+)",
            r"Patta\s*Number[\s:]*([\d/]+)"
        ],
        "registration_number": [
            r"(?:Registration|Reg\.?|Doc\.?No\.?)[\s:]*([\d/]+)",
            r"Document\s*Number[\s:]*([\d/]+)"
        ],
        "date": [
            r"\b(\d{1,2}[/-]\d{1,2}[/-]\d{2,4})\b",
            r"\b(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)[a-z]*\s+\d{1,2},?\s+\d{4}\b"
        ],
        "area": [
            r"(\d+\.?\d*)\s*(?:acres|hectares|sq\.?\s*ft|sq\.?\s*meters|cents)",
            r"(?:area|extent)[\s:]*(\d+\.?\d*)\s*(?:acres|hectares)"
        ]
    }
    
    for entity_type, pattern_list in patterns.items():
        for pattern in pattern_list:
            matches = re.findall(pattern, text, re.IGNORECASE)
            for match in matches:
                if isinstance(match, tuple):
                    match = match[0]
                if match and match not in entities[entity_type]:
                    entities[entity_type].append(match)
    
    return entities

def normalize_text(text):
    """
    Normalize text for better matching
    """
    text = re.sub(r'\s+', ' ', text)
    text = re.sub(r'[^\w\s]', '', text)
    return text.strip()

def extract_names(text):
    """
    Extract names using both spaCy and regex
    """
    doc = nlp(text)
    names = []
    for ent in doc.ents:
        if ent.label_ == "PERSON":
            names.append(ent.text)
    
    # Additional pattern for Indian names
    indian_pattern = r'\b([A-Z][a-z]+(?:\s[A-Z][a-z]+)*)\b'
    matches = re.findall(indian_pattern, text)
    names.extend(matches)
    
    return list(set(names))