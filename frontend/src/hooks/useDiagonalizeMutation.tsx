import { useMutation } from "@tanstack/react-query";
import { API } from "../lib/API";
import { DiagonalizeResponse } from "../lib/types";

export default function useDiagonalizeMutation() {
  const diagonalizeMutation = useMutation({
    mutationFn: (matrix: number[][]) => {
      return API.post<DiagonalizeResponse>("/diagonalize", {matrix});
    },
  });
  
  return {diagonalizeMutation};
}