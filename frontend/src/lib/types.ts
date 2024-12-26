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

export type DiagonalizeResponse = APISuccessResponse<DiagonalizeData>;
