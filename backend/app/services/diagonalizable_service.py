import numpy as np
from ..schemas import DiagonalizableInput, DiagonalizableResponse

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
    for row in eigenvectors.T  #eigenvector harus ditranspose
  ]

  #matriks P dan D
  P = np.array(eigenvectors, dtype=complex).T
  D = np.diag(eigenvalues)

  #rekonstruksi matriks
  reconstructed_matrix = P @ D @ np.linalg.inv(P)

  #hitung algebraic dan geometric multiplicity
  algebraic_multiplicity = {val: eigenvalues.count(val) for val in set(eigenvalues)} #menghitung jumlah kemunculan setiap eigenvalue
  geometric_multiplicity = {} #menghitung rank dari matriks (A - λI)

  for val in set(eigenvalues):
    #matriks (A - λI)
    eigenspace_matrix = matrix - val.real * np.eye(matrix.shape[0])
    rank = np.linalg.matrix_rank(eigenspace_matrix)
    geometric_multiplicity[val] = matrix.shape[0] - rank

  #cek diagonalizable (AM = GM untuk semua eigenvalue)
  is_diagonalizable = all(
    algebraic_multiplicity[val] == geometric_multiplicity[val]
    for val in set(eigenvalues)
  )

  return DiagonalizableResponse(
    eigenvalues = np.round(eigenvalues, 5),
    eigenvectors = np.round(eigenvectors, 5),
    is_diagonalizable = is_diagonalizable,
    P = np.round(P, 5).tolist() if is_diagonalizable else None,
    D = np.round(D, 5).tolist() if is_diagonalizable else None,
    reconstructed_matrix = np.round(reconstructed_matrix, 5).tolist()
    if is_diagonalizable
    else None,
  )
