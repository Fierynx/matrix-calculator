from fastapi import APIRouter

router = APIRouter()

@router.post("/")
def singular_value_decomposition():
  return {"message": "Hello World"}