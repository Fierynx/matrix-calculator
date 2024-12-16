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
