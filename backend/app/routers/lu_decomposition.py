from fastapi import APIRouter
from ..services import crout_decomposition
from ..schemas import LUDecompositionInput, Response

router = APIRouter()

@router.post("/", response_model=Response)
def lu_decomposition(matrix: LUDecompositionInput):
  try: 
    result = crout_decomposition(matrix.A)
    return Response(
      data=result
    )
  except Exception as e:
    return Response(
      success=False,
      status=422,
      message=str(e)
    )