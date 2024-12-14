from pydantic import AllowInfNan, BaseModel
from typing import Annotated, List
import orjson


class LUDecompositionInput(BaseModel):
  A: List[List[float]]
  b: List[float]
  class Config:
    json_dumps = orjson.dumps
    json_loads = orjson.loads

class LUDecompositionResponse(BaseModel):
  L: List[List[float]]
  U: List[List[float]]
  A: List[List[float]]
  y: List[float]
  x: List[float]
  class Config:
    json_dumps=lambda obj, *, default: orjson.dumps(
            obj, option=orjson.OPT_SERIALIZE_NUMPY | orjson.OPT_NON_STR_KEYS
        ).decode("utf-8"),
    json_loads=orjson.loads