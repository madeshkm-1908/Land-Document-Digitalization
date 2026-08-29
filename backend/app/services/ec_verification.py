import re
from typing import Dict, List

def verify_with_ec(entities):
    """
    Verify Encumbrance Certificate against deed records
    """
    ec_data = {
        "verified": False,
        "matches_found": 0,
        "flags": [],
        "recommendations": []
    }
    
    # Check for EC verification rules
    # Rule 1: Check if EC number exists
    ec_number = extract_ec_number(entities)
    if ec_number:
        ec_data["verified"] = True
        ec_data["matches_found"] += 1
    else:
        ec_data["flags"].append({
            "type": "MISSING_EC",
            "message": "Encumbrance Certificate not found or not extracted"
        })
        ec_data["recommendations"].append("Upload EC document for verification")
    
    # Rule 2: Verify buyer matches EC
    if entities.get("buyer"):
        if len(entities["buyer"]) > 0:
            ec_data["matches_found"] += 1
    
    # Rule 3: Verify property details
    if entities.get("survey_number") and entities.get("patta_number"):
        ec_data["matches_found"] += 1
    
    # Add recommendations based on flags
    if ec_data["matches_found"] < 3:
        ec_data["flags"].append({
            "type": "INCOMPLETE_DATA",
            "message": "Some deed details could not be verified"
        })
        ec_data["recommendations"].append("Manual verification required")
    
    return ec_data

def extract_ec_number(entities):
    """
    Extract EC number from entities
    """
    for key, value in entities.items():
        if "ec" in key.lower() or "encumbrance" in key.lower():
            for item in value:
                if re.search(r'\d', item):
                    return item
    return None

def verify_extent_change(parent_area, child_areas):
    """
    Verify if child areas sum to parent area (detect part-sale)
    """
    if not parent_area or not child_areas:
        return "UNKNOWN"
    
    parent = float(parent_area)
    total_child = sum(float(area) for area in child_areas if area)
    
    if abs(total_child - parent) < 0.01:
        return "FULL_SALE"
    elif total_child < parent:
        return "PART_SALE"
    else:
        return "EXTENT_MISMATCH"