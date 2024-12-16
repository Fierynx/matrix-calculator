from pydantic import BaseModel
from typing import List
import orjson

class DiagonalizableInput(BaseModel):
  matrix: List[List[complex]]
  class Config:
    json_dumps = orjson.dumps
    json_loads = orjson.loads

class DiagonalizableResponse(BaseModel):
  eigenvalues: List[complex]
  eigenvectors: List[List[complex]]
  is_diagonalizable: bool
  class Config:
    json_dumps=lambda obj, *, default: orjson.dumps(
        obj, option=orjson.OPT_SERIALIZE_NUMPY | orjson.OPT_NON_STR_KEYS
      ).decode("utf-8"),
    json_loads=orjson.loads