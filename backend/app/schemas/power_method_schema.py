from pydantic import BaseModel
from typing import List, Optional
import orjson


class PowerMethodInput(BaseModel):
  A: List[List[float]]
  X0: Optional[List[float]] = None
  class Config:
    json_dumps = orjson.dumps
    json_loads = orjson.loads

class PowerMethodResponse(BaseModel):
  dominant_eigenvalue: float
  corresponding_eigenvector: List[float]
  convergent: bool
  class Config:
    json_dumps=lambda obj, *, default: orjson.dumps(
            obj, option=orjson.OPT_SERIALIZE_NUMPY | orjson.OPT_NON_STR_KEYS
        ).decode("utf-8"),
    json_loads=orjson.loads