from pydantic import BaseModel
from typing import Generic, Optional, TypeVar

T = TypeVar('T')

class Response(BaseModel, Generic[T]):
  success: Optional[bool] = True
  status: Optional[int] = 200
  message: Optional[str] = None
  data: Optional[T] = None
