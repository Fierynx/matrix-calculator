from fastapi import APIRouter
from ..services import check_diagonalizable
from ..schemas import DiagonalizableInput, Response

router = APIRouter()

@router.post("/", response_model=Response)
def diagonalizable_check(matrix: DiagonalizableInput):
  try:
    result = check_diagonalizable(matrix.matrix)
    return Response(
      data = result
    )
  except Exception as e:
    return Response(
      success = False,
      status = 422,
      message = str(e)
    )