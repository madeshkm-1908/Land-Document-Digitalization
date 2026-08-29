def build_ownership_graph(entities):
    graph = {
        "nodes": [
            {"id": "root", "label": "Root of Title"},
            {"id": "current", "label": "Current Owner"}
        ],
        "edges": []
    }
    
    if entities.get("buyer"):
        graph["nodes"][1]["label"] = entities["buyer"][0]
    
    if entities.get("seller") and entities.get("buyer"):
        graph["edges"].append({
            "source": "root", 
            "target": "current", 
            "label": f"From: {entities['seller'][0]}"
        })
    
    return graph
