import { useMutation } from "@tanstack/react-query";
import { API } from "../lib/API";
import { SVDResponse } from "../lib/types";

export default function useSVDMutation() {
  const SVDMutation = useMutation({
    mutationFn: (matrix: number[][]) => {
      return API.post<SVDResponse>("/svd", { matrix });
    },
  });

  return { SVDMutation };
}