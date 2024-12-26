from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import ORJSONResponse
from .routers import diagonalizableRouter, luDecompositionRouter, svdRouter, powerMethodRouter

#init app
app = FastAPI(default_response_class=ORJSONResponse)

origins = [
  "http://localhost:5173",
]

app.add_middleware(
  CORSMiddleware,
  allow_origins=origins,
  allow_credentials=True,
  allow_methods=["*"],
  allow_headers=["*"],
)

#routers
app.include_router(diagonalizableRouter, prefix="/diagonalize", tags=["Diagonalizable Matrix"])
app.include_router(luDecompositionRouter, prefix="/lu", tags=["LU Decomposition"])
app.include_router(svdRouter, prefix="/svd", tags=["Singular Value Decomposition"])
app.include_router(powerMethodRouter, prefix="/powermethod", tags=["Power Method"])