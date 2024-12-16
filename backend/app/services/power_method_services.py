import numpy as np
from ..schemas import PowerMethodInput, PowerMethodResponse

def power_methods(A, Bk: PowerMethodInput, num_iterations= 1000, tolerance= 1e-9) -> PowerMethodResponse:

    convergent=False
    A = np.array(A)
    n, m = A.shape
    
    #jika tebakan awal tidak diberi oleh user, maka menggunakan np.ones sebagai tebakan awal
    if Bk is None:
        Bk = np.ones(n)
    
    for _ in range(num_iterations):
        #dot matriks dengan vektor
        Bk1 = np.dot(A, Bk)

        #normalisasi vektor
        Bk1_norm = np.linalg.norm(Bk1)
        if Bk1_norm == 0:
            raise
        Bk1 = Bk1 / Bk1_norm

        #memeriksa apakah sudah konvergen
        if np.linalg.norm(Bk1 - Bk) < tolerance:
            convergent = True
            break

        #update vektor
        Bk = Bk1

    #menghitung eigenvalue dominan menggunakan Rayleigh Quotient untuk mendapatkan hasil yang lebih akurat
    eigenvalue = np.dot(Bk.T, np.dot(A, Bk)) / np.dot(Bk.T, Bk)
    
    return PowerMethodResponse(
        dominant_eigenvalue= eigenvalue,
        corresponding_eigenvector = Bk,
        convergent = convergent
    )
        