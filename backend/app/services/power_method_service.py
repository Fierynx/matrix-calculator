import numpy as np

from ..services import format_complex_number
from ..schemas import PowerMethodInput, PowerMethodResponse

def check_dominant(A):
    A = np.array(A, dtype=complex)
    eigenvalues, _ = np.linalg.eig(A)
    max_abs = np.max(np.abs(eigenvalues))
    is_unique = np.sum(np.abs(eigenvalues) == max_abs) == 1
    return is_unique

def power_methods(A, X0: PowerMethodInput, num_iterations= 1000, tolerance= 1e-9) -> PowerMethodResponse:
    if not check_dominant(A):
        raise ValueError("Eigenvalue not dominant")
    convergent=False
    A = np.array(A, dtype=complex)
    n, m = A.shape
    
    #jika tebakan awal tidak diberi oleh user, maka menggunakan np.ones sebagai tebakan awal
    if X0 is None:
        X0 = np.ones(n, dtype=complex)
    else:
        X0 = np.array(X0, dtype=complex)
    for _ in range(num_iterations):
        #dot matriks dengan vektor
        X1 = np.dot(A, X0)

        #normalisasi vektor
        X1_norm = np.linalg.norm(X1)
        if X1_norm == 0:
            raise
        X1 = X1 / X1_norm

        #memeriksa apakah sudah konvergen
        if np.linalg.norm(X1 - X0) < tolerance:
            convergent = True
            break

        #update vektor
        X0 = X1

    #menghitung eigenvalue dominan menggunakan Rayleigh Quotient untuk mendapatkan hasil yang lebih akurat
    eigenvalue = np.dot(X0.T, np.dot(A, X0)) / np.dot(X0.T, X0)
    
    return PowerMethodResponse(
        dominant_eigenvalue= format_complex_number(eigenvalue),
        corresponding_eigenvector = [format_complex_number(val) for val in X0],
        convergent = convergent
    )
        