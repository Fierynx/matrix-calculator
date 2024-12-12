from fastapi import APIRouter
from ..services import check_diagonalizable
from ..schemas import MatrixInput, DiagonalizableResponse

router = APIRouter()

@router.post("/", response_model=DiagonalizableResponse)
def diagonalizable_check(matrix: MatrixInput):
  return check_diagonalizable(matrix.matrix)