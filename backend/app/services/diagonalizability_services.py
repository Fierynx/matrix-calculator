import numpy as np
from numpy.linalg import eig, inv, matrix_rank

def is_diagonalizable(matrix):
    try:
        #Calculating eigenvalues and eigenvector using np.linalg.eig
        eigenvalues, eigenvectors = eig(matrix)
        
        #Round eigenvalues for better accuracy
        eigenvalues = np.round(eigenvalues, decimals=6)
        
        #Getting unique eigenvalues
        unique_eigenvalues = np.unique(eigenvalues)
        algebraic_multiplicities = {}
        geometric_multiplicities = {}

        for eigenvalue in unique_eigenvalues:
            #Algebraic multiplicity
            algebraic_multiplicities[eigenvalue] = np.sum(np.isclose(eigenvalues, eigenvalue))

            #Geometric multiplicity
            eigenspace = matrix - eigenvalue * np.eye(matrix.shape[0])
            null_space_dimension = eigenspace.shape[0] - matrix_rank(eigenspace)
            geometric_multiplicities[eigenvalue] = null_space_dimension

        #Check diagonalizability
        diagonalizable = all(
            algebraic_multiplicities[ev] == geometric_multiplicities[ev]
            for ev in unique_eigenvalues
        )

        #Sort eigenvalues and eigenvectors
        sort_arg = np.argsort(-np.abs(eigenvalues))
        
        
        eigenvalues = eigenvalues[sort_arg]
        #Format eigenvectors to communicate easier form to frontend
        eigenvectors = eigenvectors.transpose()
        eigenvectors = eigenvectors[sort_arg, :]
        eigenvectors = np.round(eigenvectors, decimals=6)
        
        if diagonalizable:
            #Format D, P, P_inv to communicate easier to frontend
            D = np.diag(eigenvalues)
            P = eigenvectors.transpose()
            P_inv = np.round(inv(P), decimals=6)
            PDP_Inv = np.dot(np.dot(P, D), inv(P))
            return {
                "diagonalizable": diagonalizable,
                "eigenvalues": eigenvalues.tolist(),
                "eigenvectors": eigenvectors.tolist(),
                "P": P.tolist(),
                "D": D.tolist(),
                "P_inv": P_inv.tolist(),
                "PDP_inv": PDP_Inv.tolist(),
                "valid": np.array_equal(PDP_Inv, matrix)
            }
        else:
            return {
                "diagonalizable": diagonalizable,
                "eigenvalues": eigenvalues.tolist(),
                "eigenvectors": eigenvectors.tolist()
            }
    except Exception as e:
        raise