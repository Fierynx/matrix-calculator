import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatMatrix(matrix: number[][]){
  return matrix.map((row) => {
    return `[ ${row.join(" ")} ]`; 
  }).join("\n"); 
};

export function formatArray(arr: number[]) {
  return arr.map((num) => `${num.toFixed(3)}`).join(" ");
}
