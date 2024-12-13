from fastapi import APIRouter
from ..services import crout_decomposition
from ..schemas import LUDecompositionInput, LUDecompositionResponse

router = APIRouter()

@router.post("/", response_model=LUDecompositionResponse)
def lu_decomposition(matrix: LUDecompositionInput):
  return crout_decomposition(matrix.A, matrix.b)