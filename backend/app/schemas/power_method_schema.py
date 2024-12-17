from pydantic import BaseModel
from typing import List, Optional

class PowerMethodInput(BaseModel):
  A: List[List[float]]
  Bk: Optional[List[float]] = None

class PowerMethodResponse(BaseModel):
  dominant_eigenvalue: float
  corresponding_eigenvector: List[float]
  convergent: bool