from pydantic import BaseModel
from typing import List, Optional

class DiagonalizableInput(BaseModel):
  matrix: List[List[float]]

class DiagonalizableResponse(BaseModel):
  eigenvalues: List[float | complex]
  eigenvectors: List[List[float | complex]]
  is_diagonalizable: bool
  P: Optional[List[List[float | complex]]] = None,
  D: Optional[List[List[float | complex]]] = None,
  reconstructed_matrix: Optional[List[List[float | complex]]] = None,
  is_diagonalizable: bool