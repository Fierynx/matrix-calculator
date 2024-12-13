from fastapi import APIRouter
from ..services import check_diagonalizable
from ..schemas import DiagonalizableInput, DiagonalizableResponse

router = APIRouter()

@router.post("/", response_model=DiagonalizableResponse)
def diagonalizable_check(matrix: DiagonalizableInput):
  return check_diagonalizable(matrix.matrix)