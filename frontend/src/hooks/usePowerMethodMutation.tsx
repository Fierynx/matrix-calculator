import { useMutation } from "@tanstack/react-query";
import { API } from "../lib/API";
import { PowerMethodResponse } from "../lib/types";

export default function usePowerMethodMutation() {
  const powerMethodMutation = useMutation({
    mutationFn: (payload: { A: number[][]; x0?: number[] }) => {
      return API.post<PowerMethodResponse>("/powermethod", payload);
    },
  });

  // const powerMethodData = powerMethodMutation.data?.data;

  return { powerMethodMutation };
}