from fastapi import APIRouter
from ..schemas import Response, SVDInput
from ..services import compute_svd

router = APIRouter()

@router.post("/", response_model=Response)
def singular_value_decomposition(matrix: SVDInput):
  try:
    result = compute_svd(matrix.matrix)
    return Response(
      data = result
    )
  except Exception as e:
    return Response(
      success=False,
      status=422,
      message=str(e)
    )