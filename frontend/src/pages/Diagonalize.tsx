import { useEffect, useState } from "react";
import SetMatrixPopup from "../components/general/SetMatrixPopup";
import { APIErrorResponse, DiagonalizeResponse } from "../lib/types";
import useDiagonalizeQuery from "../hooks/useDiagonalizeQuery";
import DiagonalizeResult from "../components/diagonalize/DiagonalizeResult";

export default function Diagonalize() {
  const [showPopup, setShowPopup] = useState(false);
  const [matrixDimension, setMatrixDimension] = useState<number | null>(2);
  const [matrix, setMatrix] = useState<number[][]>([]);
  const [result, setResult] = useState<DiagonalizeResponse>();
  const [error, setError] = useState<APIErrorResponse | undefined>(); 

  const { diagonalizeData } = useDiagonalizeQuery(matrix);

  useEffect(() => {
    if (diagonalizeData?.success) {
      setResult(diagonalizeData);
    } else {
      setError(diagonalizeData as unknown as APIErrorResponse);
    }
  }, [diagonalizeData, error]);

  const handleMatrixSubmit = (matrix: number[][]) => {
    setMatrix(matrix);
    setShowPopup(false);
  };

  return (
    <>
      {result ? (
        <DiagonalizeResult result={result} setResult={setResult}/>
      ) : (
        <>
          <h1 className="text-2xl font-bold">Diagonalizable Matrix</h1>
          <p className="mt-7">
            A diagonalizable matrix is a square matrix that can be expressed as A = PDP<sup>-1</sup>, where P is an invertible matrix and D is a diagonal matrix containing the eigenvalues of A. A matrix is diagonalizable if it has a full set of linearly independent eigenvectors.
          </p>
          <div className="w-full flex justify-center mt-20">
            <section className="w-[50%] bg-sky rounded-md flex flex-col items-center justify-center gap-3 py-5">
              <h1 className="text-lg font-bold">Matrix Dimension</h1>
              <input
                type="number"
                className="bg-white text-xs w-10 h-6 text-center"
                value={matrixDimension ? matrixDimension : ""}
                onChange={(e) => setMatrixDimension(Number((e.target as HTMLInputElement).value))}
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
