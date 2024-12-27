import numpy as np

from .formatting_service import format_complex_number
from ..schemas import LUDecompositionInput, LUDecompositionResponse


#forward substitution untuk menyelesaikan L * y = b pada Crout's method
# def forward_substitution_crout(L, b):
#     L_rows, _ = L.shape
#     y = b.copy()
#     for row in range(L_rows):
#         #menghindari pembagian dengan nol (mengatasi singular matrix)
#         if L[row, row] == 0:
#             y[row] = np.nan
#         else:
#             y[row] = (b[row] - np.sum(L[row, :row] * y[:row])) / L[row, row]
#     return y


#backward substitution untuk menyelesaikan U * x = y pada Crout's method
# def backward_substitution_crout(U, y):
#     _, U_cols = U.shape
#     x = np.zeros_like(y)
#     for row in range (U_cols - 1, -1, -1):
#         #menghindari pembagian dengan nol (mengatasi singular matrix)
#         if U[row, row] == 0:
#             x[row] = np.nan
#         else:
#             x[row] = (y[row] - np.dot(U[row, row + 1:], x[row + 1:])) / U[row, row]
#     return x


#fungsi untuk menyelesaikan Crout's method
def crout_decomposition(A: LUDecompositionInput) -> LUDecompositionResponse:
    try:
        crout_possible = True
        #convert input ke numpy array
        A = np.array(A, dtype=complex)
        # b = np.array(b)
        
        A_rows, A_cols = A.shape
        if A_rows != A_cols:
            raise ValueError("Matrix input harus square matrix!")
        #membuat lower triangular matrix (L) dan upper triangular matrix (U)
        L = np.zeros_like(A, dtype=complex)
        U = np.eye(A_cols, dtype=complex) 

        #decompose matrix menjadi L dan U
        for row in range(A_rows):
            for cols in range(A_cols):
                #menghitung L
                if row >= cols:
                    L[row, cols] = A[row, cols] - np.sum(L[row, :cols] * U[:cols, cols])
                #menghitung U
                else:
                    #menghindari pembagian dengan nol (mengatasi singular matrix)
                    if L[row, row] == 0:
                        U[row, cols] = np.nan
                        crout_possible = False
                    else:
                        U[row, cols] = (A[row, cols] - np.sum(L[row, :row] * U[:row, cols])) / L[row, row]

        
        #forward substitution untuk menyelesaikan L * y = b dan mendapatkan y
        # y = forward_substitution_crout(L, b)

        # #backward substitution untuk menyelesaikan U * x = y dan mendapatkan x
        # x = backward_substitution_crout(U, y)
        
        return LUDecompositionResponse(
            L=[[format_complex_number(val) for val in row] for row in L],
            U=[[format_complex_number(val) for val in row] for row in U],
            A=[[format_complex_number(val) for val in row] for row in A],
            crout_possible = crout_possible
            # y=y.tolist(),
            # x=x.tolist()
        )
    except Exception as e:
        raise
