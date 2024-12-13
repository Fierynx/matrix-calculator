import numpy as np
from ..schemas import DiagonalizableResponse, DiagonalizableInput

def check_diagonalizable(matrix: DiagonalizableInput) -> DiagonalizableResponse:
  matrix = np.array(matrix)
  eigenvalues, eigenvectors = np.linalg.eig(matrix)

  tolerance = 1e-10

  #hilangkan bagian imajiner jika sangat kecil
  eigenvalues = [val.real if abs(val.imag) < tolerance else val for val in eigenvalues]
  eigenvectors = [[val.real if abs(val.imag) < tolerance else val for val in row] for row in eigenvectors]
  
  #algebraic multiplicity adalah jumlah kemunculan suatu eigenvalue dalam matrix
  algebraic_multiplicity = {val: eigenvalues.count(val) for val in set(eigenvalues)} #maksud set untuk ngilangin duplikat
  
  #geometric multiplicity adalah rank dari matrix yang sudah diubah ke basis eigenvalue
  geometric_multiplicity = {}
  for val in set(eigenvalues):
    eigenspace_matrix = matrix - val * np.eye(matrix.shape[0])
    rank = np.linalg.matrix_rank(eigenspace_matrix)
    geometric_multiplicity[val] = matrix.shape[0] - rank
  
  #akan diagonalizable jika algebraic multiplicity = geometric multiplicity
  is_diagonalizable = all(
    algebraic_multiplicity[val] == geometric_multiplicity[val]
    for val in set(eigenvalues)
  )

  return DiagonalizableResponse(
      eigenvalues=eigenvalues,
      eigenvectors=eigenvectors,
      is_diagonalizable=is_diagonalizable
  )
