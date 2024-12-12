import numpy as np
from ..schemas import DiagonalizableResponse, MatrixInput

def check_diagonalizable(matrix: MatrixInput) -> DiagonalizableResponse:
  matrix = np.array(matrix)
  eigenvalues, eigenvectors = np.linalg.eig(matrix)

  #algebraic multiplicity adalah jumlah kemunculan suatu eigenvalue dalam matrix
  algebraic_multiplicity = {val: list(eigenvalues).count(val) for val in set(eigenvalues)} #maksud set untuk ngilangin duplikat
  
  #geometric multiplicity adalah rank dari matrix yang sudah diubah ke basis eigenvalue
  geometric_multiplicity = {
    val: np.linalg.matrix_rank(eigenvectors[:, list(eigenvalues).index(val)])
    for val in set(eigenvalues)
  }
  
  #akan diagonalizable jika algebraic multiplicity = geometric multiplicity
  is_diagonalizable = np.all(
    algebraic_multiplicity[val] == geometric_multiplicity[val]
    for val in set(eigenvalues)
  )

  return DiagonalizableResponse(
    eigenvalues=eigenvalues,
    eigenvectors=eigenvectors,
    is_diagonalizable=is_diagonalizable
  )
