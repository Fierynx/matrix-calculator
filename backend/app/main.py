from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from .routers import diagonalizableRouter, LUDecompositionRouter

app = FastAPI()

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

app.include_router(diagonalizableRouter, prefix="/diagonalizable", tags=["Diagonalizable Matrix"])
app.include_router(LUDecompositionRouter, prefix="/lu", tags=["LU Decomposition"])