import { useState } from "react";
import SetMatrixPopup from "../components/general/SetMatrixPopup";
import { APIErrorResponse, LUResponse } from "../lib/types";
import LUResult from "../components/lu/LUResult";
import { useToast } from "../components/general/Toast";
import useLUMutation from "../hooks/useLUMutation";

export default function LUDecomposition() {
  const [showPopup, setShowPopup] = useState(false);
  const [matrixDimension, setMatrixDimension] = useState<number | null>(2);
  const [result, setResult] = useState<LUResponse>();
  const [error, setError] = useState<APIErrorResponse | undefined>();
  const { toast } = useToast();
  const { LUMutation } = useLUMutation();

  const handleMatrixSubmit = (matrix: number[][]) => {
    LUMutation.mutate(matrix, {
      onSuccess: (data) => {
        const LUData = data.data;
        if (LUData?.success) {
          setResult(LUData);
        } else {
          if (LUData.message) {
            toast.error(LUData.message);
          }
          setError(LUData as unknown as APIErrorResponse);
        }
      },
    });
    setShowPopup(false);
  };

  return (
    <>
      {result ? (
        <LUResult result={result} setResult={setResult} />
      ) : (
        <>
          <h1 className="text-2xl font-bold">LU Decomposition</h1>
          <p className="mt-7">
            In linear algebra, LU Decomposition, i.e., lower–upper (LU)
            decomposition or factorization of a matrix, can be defined as the
            product of a lower and an upper triangular matrices. This product
            sometimes comprises a permutation matrix as well. We can relate the
            LU decomposition method with the matrix form of the Gaussian
            elimination method of solving a system of linear equations.
          </p>
          <div className="w-full flex justify-center mt-20">
            <section className="w-[50%] bg-sky rounded-md flex flex-col items-center justify-center gap-3 py-5">
              <h1 className="text-lg font-bold">Matrix Dimension</h1>
              <input
                type="number"
                className="bg-white text-xs w-10 h-6 text-center"
                value={matrixDimension ? matrixDimension : ""}
                onChange={(e) =>
                  setMatrixDimension(
                    Number((e.target as HTMLInputElement).value)
                  )
                }
              />
              <button
                className="bg-dark text-white px-4 py-2 rounded-md hover:bg-slate-500 active:opacity-70"
                onClick={() => setShowPopup(true)}
              >
                Set Matrix
              </button>
            </section>
          </div>
        </>
      )}
      {showPopup && matrixDimension && (
        <SetMatrixPopup
          rows={matrixDimension}
          cols={matrixDimension}
          onClose={() => setShowPopup(false)}
          onSubmit={handleMatrixSubmit}
          error={error?.message}
        />
      )}
    </>
  );
}
