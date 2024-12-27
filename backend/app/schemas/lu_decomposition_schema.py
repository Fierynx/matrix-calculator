from pydantic import BaseModel
from typing import List

class LUDecompositionInput(BaseModel):
  A: List[List[float]]
  # b: List[float]

class LUDecompositionResponse(BaseModel):
  L: List[List[float]]
  U: List[List[float]]
  A: List[List[float]]
  crout_possible: bool
  # y: List[float]
  # x: List[float]