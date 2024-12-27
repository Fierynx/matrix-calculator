import { useEffect, useState } from "react";
import SetMatrixPopup from "../components/general/SetMatrixPopup";
import { APIErrorResponse, PowerMethodResponse } from "../lib/types";
import usePowerMethodQuery from "../hooks/usePowerMethodQuery";
import PowerMethodResult from "../components/power/PowerMethodResult";

export default function PowerMethod() {
  const [showPopup, setShowPopup] = useState(false);
  const [matrixDimension, setMatrixDimension] = useState<number | null>(2);
  const [matrix, setMatrix] = useState<number[][]>([]);
  const [initialGuess, setInitialGuess] = useState<number[]>();
  const [result, setResult] = useState<PowerMethodResponse>();
  const [error, setError] = useState<APIErrorResponse | undefined>();

  const { PowerMethodData } = usePowerMethodQuery(matrix, initialGuess);

  useEffect(() => {
    if (PowerMethodData?.success) {
      setMatrix([]);
      setInitialGuess([]);
      setResult(PowerMethodData);
    } else {
      setError(PowerMethodData as unknown as APIErrorResponse);
    }
  }, [PowerMethodData, error]);

  const handleMatrixSubmit = (matrix: number[][], initialGuess?: number[]) => {
    setMatrix(matrix);
    setInitialGuess(initialGuess);
    setShowPopup(false);
  };

  return (
    <>
      {result ? (
        <PowerMethodResult result={result} setResult={setResult} />
      ) : (
        <>
          <h1 className="text-2xl font-bold">Power Method</h1>
          <p className="mt-7">
            The power method is an iterative technique used to find the largest
            eigenvalue of a square matrix. It begins with a randomly chosen
            initial vector and repeatedly applies the matrix to this vector,
            normalizing the outcome each time. This process generates a sequence
            of progressively refined approximations for the eigenvector
            corresponding to the largest eigenvalue.
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
          x0={true}
        />
      )}
    </>
  );
}
