import { useQuery } from "@tanstack/react-query";
import { API } from "../lib/API";
import { DiagonalizeResponse } from "../lib/types";

export default function useDiagonalizeQuery(matrix: number[][]) {
  const diagonalizeQuery = useQuery({
    queryFn: () => {
      return API.post<DiagonalizeResponse>("/diagonalize", {matrix});
    },
    queryKey: ["diagonalize", matrix],
  });

  const diagonalizeData = diagonalizeQuery.data?.data;
  
  return {diagonalizeData, diagonalizeQuery};
}