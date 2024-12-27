import { useQuery } from "@tanstack/react-query";
import { API } from "../lib/API";
import { LUResponse } from "../lib/types";

export default function useLUQuery(A: number[][]) {
  const LUQuery = useQuery({
    queryFn: () => {
      return API.post<LUResponse>("/lu", {A});
    },
    queryKey: ["lu", A],
  });

  const LUData = LUQuery.data?.data;
  
  return {LUData, LUQuery};
}