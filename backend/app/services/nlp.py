import re

def extract_entities(text):
    return extract_land_entities(text)

def extract_land_entities(text):
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
    
    if not text:
        return entities
    
    buyer_match = re.search(r'Buyer[:\s]+([A-Za-z\.\s]+)', text, re.IGNORECASE)
    if buyer_match:
        entities["buyer"].append(buyer_match.group(1).strip())
    
    seller_match = re.search(r'Seller[:\s]+([A-Za-z\.\s]+)', text, re.IGNORECASE)
    if seller_match:
        entities["seller"].append(seller_match.group(1).strip())
    
    survey_match = re.search(r'Survey[:\s]+([\d/]+)', text, re.IGNORECASE)
    if survey_match:
        entities["survey_number"].append(survey_match.group(1).strip())
    
    return entities
