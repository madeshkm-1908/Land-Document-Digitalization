import uuid
from typing import List, Dict, Any

def create_node(node_id, label, node_type="unknown", metadata=None):
    """
    Create a graph node
    """
    return {
        "id": node_id,
        "label": label,
        "type": node_type,
        "metadata": metadata or {}
    }

def create_edge(source, target, label, edge_id=None):
    """
    Create a graph edge
    """
    return {
        "id": edge_id or str(uuid.uuid4()),
        "source": source,
        "target": target,
        "label": label
    }

def build_ownership_graph(entities):
    """
    Build ownership graph from extracted entities
    """
    nodes = []
    edges = []
    
    # Create root node
    nodes.append(create_node("root", "Root of Title", "root"))
    
    # Add buyer and seller nodes
    buyer_nodes = []
    seller_nodes = []
    
    for buyer in entities.get("buyer", [])[:5]:
        node_id = f"buyer_{uuid.uuid4().hex[:8]}"
        nodes.append(create_node(node_id, buyer, "buyer"))
        buyer_nodes.append(node_id)
        
        # Link to root
        edges.append(create_edge("root", node_id, "First Transfer"))
    
    for seller in entities.get("seller", [])[:5]:
        node_id = f"seller_{uuid.uuid4().hex[:8]}"
        nodes.append(create_node(node_id, seller, "seller"))
        seller_nodes.append(node_id)
    
    # Link buyer to seller (simplified chain)
    for i, buyer_node in enumerate(buyer_nodes):
        if i < len(seller_nodes):
            edges.append(create_edge(buyer_node, seller_nodes[i], "Transfer"))
    
    # Add current owner node
    if entities.get("buyer"):
        current_owner = entities["buyer"][-1]
        current_id = f"current_{uuid.uuid4().hex[:8]}"
        nodes.append(create_node(current_id, current_owner, "current_owner"))
        
        if seller_nodes:
            edges.append(create_edge(seller_nodes[-1], current_id, "Final Transfer"))
        elif buyer_nodes:
            edges.append(create_edge(buyer_nodes[-1], current_id, "Transfer"))
    
    # Add survey number as node
    for survey in entities.get("survey_number", [])[:3]:
        node_id = f"survey_{uuid.uuid4().hex[:8]}"
        nodes.append(create_node(node_id, f"Survey No: {survey}", "property"))
        edges.append(create_edge("root", node_id, "Property"))
    
    return {
        "nodes": nodes,
        "edges": edges
    }

def add_ownership_relationship(parent_id, child_id, relationship_type):
    """
    Add relationship between parent and child deed
    """
    return {
        "source": parent_id,
        "target": child_id,
        "label": relationship_type
    }