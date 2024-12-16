import numpy as np
from ..schemas import SVDInput, SVDResult

def compute_svd(matrix: SVDInput) -> SVDResult:
    matrix = np.array(matrix)
    
    #melakukan SVD
    U, S, VT = np.linalg.svd(matrix, full_matrices=False)
    
    #mengonversi hasil SVD menjadi format list of lists agar sesuai dengan schema
    S_matrix = np.diag(S).tolist()  #matriks Σ adalah diagonal dari nilai singular
    
    result = SVDResult(
        U=U.tolist(),
        S=S_matrix,
        VT=VT.tolist()
    )
    
    return result
