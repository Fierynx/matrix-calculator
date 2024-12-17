from fastapi import APIRouter
from ..services import power_methods
from ..schemas import PowerMethodInput, Response

router = APIRouter()

@router.post("/", response_model=Response)
def power_method(matrix: PowerMethodInput):
    try:
        result = power_methods(matrix.A, matrix.X0)
        return Response(
            data=result
        )
    except Exception as e:
        return Response(
            success=False,
            status=422,
            message=str(e)
        )