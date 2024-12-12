from pydantic import BaseModel
from typing import List

class MatrixInput(BaseModel):
  matrix: List[List[float]]

class DiagonalizableResponse(BaseModel):
  eigenvalues: List[float]
  eigenvectors: List[List[float]]
  is_diagonalizable: bool