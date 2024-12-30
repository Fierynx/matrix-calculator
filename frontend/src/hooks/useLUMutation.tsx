import { useMutation } from "@tanstack/react-query";
import { API } from "../lib/API";
import { LUResponse } from "../lib/types";

export default function useLUMutation() {
  const LUMutation = useMutation({
    mutationFn: (A: number[][]) => {
      return API.post<LUResponse>("/lu", { A });
    },
  });

  return { LUMutation };
}