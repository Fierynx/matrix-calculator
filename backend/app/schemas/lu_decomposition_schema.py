from pydantic import BaseModel
from typing import List

class LUDecompositionInput(BaseModel):
  A: List[List[float | complex]]
  # b: List[float]

class LUDecompositionResponse(BaseModel):
  L: List[List[float | complex]]
  U: List[List[float | complex]]
  A: List[List[float | complex]]
  crout_possible: bool
  # y: List[float]
  # x: List[float]