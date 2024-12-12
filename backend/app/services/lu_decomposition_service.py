import numpy as np
from ..schemas import LUDecompositionInput, LUDecompositionResponse


#forward substitution untuk menyelesaikan L * y = b pada Crout's method
def forward_substitution_crout(L, b):
    L_rows, _ = L.shape
    y = b.copy()
    for row in range(L_rows):
        #menghindari pembagian dengan nol (mengatasi singular matrix)
        if L[row, row] == 0:
            y[row] = -999999999  
        else:
            y[row] = (b[row] - np.sum(L[row, :row] * y[:row])) / L[row, row]
    return y


#backward substitution untuk menyelesaikan U * x = y pada Crout's method
def backward_substitution_crout(U, y):
    _, U_cols = U.shape
    x = np.zeros_like(y)
    for row in range (U_cols - 1, -1, -1):
        #menghindari pembagian dengan nol (mengatasi singular matrix)
        if U[row, row] == 0:
            x[row] = -999999999
        else:
            x[row] = (y[row] - np.dot(U[row, row + 1:], x[row + 1:])) / U[row, row]
    return x


#fungsi untuk menyelesaikan Crout's method
def crout_decomposition(A, b: LUDecompositionInput) -> LUDecompositionResponse:
    try:
        #convert input ke numpy array
        A = np.array(A)
        b = np.array(b)
        
        A_rows, A_cols = A.shape
        
        #membuat lower triangular matrix (L) dan upper triangular matrix (U)
        L = np.zeros_like(A)
        U = np.eye(A_cols) 

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
                        U[row, cols] = -999999999
                    else:
                        U[row, cols] = (A[row, cols] - np.sum(L[row, :row] * U[:row, cols])) / L[row, row]

        #forward substitution untuk menyelesaikan L * y = b dan mendapatkan y
        y = forward_substitution_crout(L, b)

        #backward substitution untuk menyelesaikan U * x = y dan mendapatkan x
        x = backward_substitution_crout(U, y)
        
        return LUDecompositionResponse(
            L=L,
            U=U,
            A=A,
            y=y,
            x=x
        )
    except Exception as e:
        raise
