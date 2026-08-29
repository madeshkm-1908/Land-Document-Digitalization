from rapidfuzz import fuzz, process
import re

def normalize_name(name):
    """
    Normalize name for matching
    """
    if not name:
        return ""
    name = name.lower()
    # Remove common prefixes/suffixes
    name = re.sub(r'\b(mr|mrs|ms|dr|sri|smt|kumar|reddy)\b', '', name)
    name = re.sub(r'\s+', ' ', name)
    return name.strip()

def fuzzy_match_names(name1, name2, threshold=80):
    """
    Match two names with fuzzy logic
    """
    if not name1 or not name2:
        return False
    
    n1 = normalize_name(name1)
    n2 = normalize_name(name2)
    
    if not n1 or not n2:
        return False
    
    score = fuzz.token_set_ratio(n1, n2)
    return score >= threshold

def find_best_match(query, candidates, threshold=80):
    """
    Find best matching candidate from list
    """
    if not query or not candidates:
        return None, 0
    
    matches = process.extract(query, candidates, scorer=fuzz.token_set_ratio)
    if not matches:
        return None, 0
    
    best, score = matches[0]
    if score >= threshold:
        return best, score
    return None, score

def match_seller_to_parent_buyer(child_seller, parent_buyers):
    """
    Match child's seller to parent's buyer (for linking deeds)
    """
    if not child_seller or not parent_buyers:
        return None, 0
    
    best_match = None
    best_score = 0
    
    for parent_buyer in parent_buyers:
        score = fuzz.token_set_ratio(
            normalize_name(child_seller),
            normalize_name(parent_buyer)
        )
        if score > best_score:
            best_score = score
            best_match = parent_buyer
    
    if best_score >= 75:
        return best_match, best_score
    return None, best_score