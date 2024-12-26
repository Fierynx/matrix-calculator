import numpy as np
from ..schemas import DiagonalizableInput, DiagonalizableResponse
from .formatting_service import format_complex_number

def check_diagonalizable(matrix: DiagonalizableInput) -> DiagonalizableResponse:
  matrix = np.array(matrix, dtype=float)
  eigenvalues, eigenvectors = np.linalg.eig(matrix)
  
  tolerance = 1e-10
  
  #menghilangkan bagian imajiner yang sangat kecil
  eigenvalues = [
    complex(val.real, val.imag if abs(val.imag) >= tolerance else 0)
    for val in eigenvalues
  ]
  eigenvectors = [
    [complex(val.real, val.imag if abs(val.imag) >= tolerance else 0) for val in row]
    for row in eigenvectors.T
  ]

  #mtrix P dan D
  P = np.array(eigenvectors, dtype=complex).T
  D = np.diag(eigenvalues)

  #hasil rekonstruksi matrix
  reconstructed_matrix = P @ D @ np.linalg.inv(P)

  #hitung algebraic dan geometric multiplicity
  algebraic_multiplicity = {val: eigenvalues.count(val) for val in set(eigenvalues)}
  geometric_multiplicity = {}

  for val in set(eigenvalues):
    #matriks (A - λI)
    eigenspace_matrix = matrix - complex(val) * np.eye(matrix.shape[0])
    rank = np.linalg.matrix_rank(eigenspace_matrix)
    geometric_multiplicity[val] = matrix.shape[0] - rank

  #cek diagonalizable (AM = GM untuk semua eigenvalue)
  is_diagonalizable = all(
    algebraic_multiplicity[val] == geometric_multiplicity[val]
    for val in set(eigenvalues)
  )

  return DiagonalizableResponse(
    eigenvalues=[format_complex_number(val) for val in eigenvalues],
    eigenvectors=[[format_complex_number(val) for val in row] for row in eigenvectors],
    is_diagonalizable=is_diagonalizable,
    P=([format_complex_number(complex(val.real, val.imag)) for val in row]
    for row in P) if is_diagonalizable else None,
    D=([format_complex_number(complex(val.real, val.imag)) for val in row]
    for row in D) if is_diagonalizable else None,
    reconstructed_matrix=([format_complex_number(complex(val.real, val.imag)) for val in row]
    for row in reconstructed_matrix) if is_diagonalizable else None,
  )
