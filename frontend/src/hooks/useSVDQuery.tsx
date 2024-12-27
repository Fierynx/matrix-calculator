import { useQuery } from "@tanstack/react-query";
import { API } from "../lib/API";
import { SVDResponse } from "../lib/types";

export default function useSVDQuery(matrix: number[][]) {
  const SVDQuery = useQuery({
    queryFn: () => {
      return API.post<SVDResponse>("/svd", {matrix});
    },
    queryKey: ["SingularValueDecomposition", matrix],
  });

  const SVDData = SVDQuery.data?.data;
  
  return {SVDData, SVDQuery};
}