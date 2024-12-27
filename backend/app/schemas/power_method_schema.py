from pydantic import BaseModel
from typing import List, Optional

class PowerMethodInput(BaseModel):
  A: List[List[float | complex]]
  X0: Optional[List[float | complex]] = None

class PowerMethodResponse(BaseModel):
  dominant_eigenvalue: float | complex
  corresponding_eigenvector: List[float | complex]
  convergent: bool