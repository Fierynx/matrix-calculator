from pydantic import AllowInfNan, BaseModel
from typing import Annotated, List


class LUDecompositionInput(BaseModel):
  A: List[List[float]]
  b: List[float]

class LUDecompositionResponse(BaseModel):
  L: List[List[float]]
  U: List[List[float]]
  A: List[List[float]]
  y: List[float]
  x: List[float]