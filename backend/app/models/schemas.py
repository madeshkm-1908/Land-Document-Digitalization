from pydantic import BaseModel
from typing import List, Optional, Dict, Any

class Entity(BaseModel):
    type: str
    value: str
    confidence: float
    start_char: int
    end_char: int

class Entities(BaseModel):
    buyer: List[str]
    seller: List[str]
    survey_number: List[str]
    patta_number: List[str]
    registration_number: List[str]
    date: List[str]
    area: List[str]
    boundaries: List[str]
    other: List[str]

class Node(BaseModel):
    id: str
    label: str
    type: Optional[str] = "unknown"
    metadata: Optional[Dict] = {}

class Edge(BaseModel):
    id: Optional[str] = None
    source: str
    target: str
    label: str

class GraphResponse(BaseModel):
    nodes: List[Node]
    edges: List[Edge]

class DocumentResponse(BaseModel):
    filename: str
    text_preview: str
    entities: Entities
    graph: GraphResponse
    ec_verification: Dict
    status: str