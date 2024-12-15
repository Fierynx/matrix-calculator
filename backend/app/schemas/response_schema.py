from pydantic import BaseModel
from typing import Generic, Optional, TypeVar
import orjson

T = TypeVar('T')

class Response(Generic[T],BaseModel):
  success: Optional[bool] = True
  status: Optional[int] = 200
  message: Optional[str] = None
  data: Optional[T] = None
  class Config:
    json_dumps=lambda obj, *, default: orjson.dumps(
            obj, option=orjson.OPT_SERIALIZE_NUMPY | orjson.OPT_NON_STR_KEYS
        ).decode("utf-8"),
    json_loads=orjson.loads
