from fastapi import APIRouter
from fastapi.params import Body
from app.services import is_diagonalizable
from app.utils import create_response
import numpy as np

router = APIRouter()


#1. Diagonalize endpoint (/api/diagonalize)
@router.post("/diagonalize")
async def check_diagonalizability(matrix = Body()):
    try:
        matrix_np = np.array(matrix["matrix"])
        #Check if the matrix is square matrix
        if matrix_np.shape[0] != matrix_np.shape[1]:
            return create_response(data=None, message="Matrix must be square.", response_code=422)

        diagonalizable = is_diagonalizable(matrix_np)
        
        return create_response(data=[diagonalizable], response_code=200)
    except Exception as e:
        return create_response(data=None, message= str(e), response_code=500)