from pydantic import BaseModel
from typing import List
import orjson
 
class SVDInput(BaseModel):
  matrix: List[List[float]]
  class Config:
    json_dumps = orjson.dumps
    json_loads = orjson.loads
    
class SVDResult(BaseModel):
  U: List[List[float]]  #matrix U hasil dekomposisi
  S: List[List[float]]  #matrix Σ (singular values)
  VT: List[List[float]] #matrix V^T hasil dekomposisi
  class Config:
    json_dumps=lambda obj, *, default: orjson.dumps(
        obj, option=orjson.OPT_SERIALIZE_NUMPY | orjson.OPT_NON_STR_KEYS
      ).decode("utf-8"),
    json_loads=orjson.loads