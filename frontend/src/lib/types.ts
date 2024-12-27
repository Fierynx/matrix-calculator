export type APIErrorResponse = {
  success: false;
  status: number;
  message?: string;
};

export type APISuccessResponse<T> = {
  success: true;
  status: number;
  message?: string;
  data: T;
};

type DiagonalizeData = {
  eigenvalues: number[];
  eigenvectors: number[][];
  is_diagonalizable: boolean;
  P?: number[][];
  D?: number[][];
  reconstructed_matrix?: number[][];
};

type LUData = {
  L: number[][];
  U: number[][];
  A: number[][];
  crout_possible: boolean;
};

type PowerMethodData = {
  dominant_eigenvalue: number[][];
  corresponding_eigenvector: number[];
  convergent: number[][];
};

type SVDData = {
  U: number[][];
  S: number[][];
  VT: number[][];
};

export type DiagonalizeResponse = APISuccessResponse<DiagonalizeData>;
export type LUResponse = APISuccessResponse<LUData>;
export type PowerMethodResponse = APISuccessResponse<PowerMethodData>
export type SVDResponse = APISuccessResponse<SVDData>