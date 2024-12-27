import { useQuery } from "@tanstack/react-query";
import { API } from "../lib/API";
import { PowerMethodResponse } from "../lib/types";

export default function usePowerMethodQuery(A: number[][], x0?: number[]) {
  const PowerMethodQuery = useQuery({
    queryFn: () => {
      const payload = x0 ? { A, x0 } : { A };
      return API.post<PowerMethodResponse>("/powermethod", payload);
    },
    queryKey: ["PowerMethod", A, x0],
  });

  const PowerMethodData = PowerMethodQuery.data?.data;

  return { PowerMethodData, PowerMethodQuery };
}