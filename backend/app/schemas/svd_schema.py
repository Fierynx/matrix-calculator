from pydantic import BaseModel
from typing import List
 
class SVDInput(BaseModel):
  matrix: List[List[float]]
    
class SVDResult(BaseModel):
  U: List[List[float]]  #matrix U hasil dekomposisi
  S: List[List[float]]  #matrix Σ (singular values)
  VT: List[List[float]] #matrix V^T hasil dekomposisi