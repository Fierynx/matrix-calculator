from pydantic import BaseModel
from typing import List, Optional

class DiagonalizableInput(BaseModel):
  matrix: List[List[float]]

class DiagonalizableResponse(BaseModel):
  eigenvalues: List[complex]
  eigenvectors: List[List[complex]]
  is_diagonalizable: bool
  P: Optional[List[List[complex]]] = None,
  D: Optional[List[List[complex]]] = None,
  reconstructed_matrix: Optional[List[List[complex]]] = None,
  is_diagonalizable: bool