import { useState } from "react";
import SetMatrixPopup from "../components/general/SetMatrixPopup";
import { APIErrorResponse, SVDResponse } from "../lib/types";
import SVDResult from "../components/svd/SVDResult";
import { useToast } from "../components/general/Toast";
import useSVDMutation from "../hooks/useSVDMutation";

export default function SingularVaSVDeDecomposition() {
  const [showPopup, setShowPopup] = useState(false);
  const [matrixRows, setMatrixRows] = useState<number | null>(2);
  const [matrixCols, setMatrixCols] = useState<number | null>(3);
  const [result, setResult] = useState<SVDResponse>();
  const [error, setError] = useState<APIErrorResponse | undefined>();
  const { toast } = useToast();
  const { SVDMutation } = useSVDMutation();

  const handleMatrixSubmit = (matrix: number[][]) => {
    SVDMutation.mutate(matrix, {
      onSuccess: (data) => {
        const SVDData = data.data;
        if (SVDData?.success) {
          setResult(SVDData);
        } else {
          if (SVDData.message) {
            toast.error(SVDData.message);
          }
          setError(SVDData as unknown as APIErrorResponse);
        }
      },
    });
    setShowPopup(false);
  };

  return (
    <>
      {result ? (
        <SVDResult result={result} setResult={setResult} />
      ) : (
        <>
          <h1 className="text-2xl font-bold">Singular Value Decomposition</h1>
          <p className="mt-7">
            Singular Value Decomposition (SVD) is a method in linear algebra
            that decomposes a matrix into three simpler matrices:A = U Σ V
            <sup>T</sup>. Here, U contains the left singular vectors, Σ is a
            diagonal matrix with singular values (which are non-negative and
            ordered), and V<sup>T</sup> contains the right singular vectors.
            This decomposition reveals important properties of the original
            matrix, such as its rank, range, and null space. SVD is widely used
            in areas like data compression, noise reduction, and dimensionality
            reduction (e.g., Principal Component Analysis, or PCA), where it
            helps simplify complex data for better analysis and processing.
          </p>
          <div className="w-full flex justify-center mt-20">
            <section className="w-[50%] bg-sky rounded-md flex flex-col items-center justify-center gap-3 py-5">
              <h1 className="text-lg font-bold">Matrix Dimension</h1>
              <div className="flex gap-5">
                <input
                  type="number"
                  className="bg-white text-xs w-10 h-6 text-center"
                  value={matrixRows ? matrixRows : ""}
                  onChange={(e) =>
                    setMatrixRows(Number((e.target as HTMLInputElement).value))
                  }
                />
                <p>x</p>
                <input
                  type="number"
                  className="bg-white text-xs w-10 h-6 text-center"
                  value={matrixCols ? matrixCols : ""}
                  onChange={(e) =>
                    setMatrixCols(Number((e.target as HTMLInputElement).value))
                  }
                />
              </div>

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
      {showPopup && matrixRows && matrixCols && (
        <SetMatrixPopup
          rows={matrixRows}
          cols={matrixCols}
          onClose={() => setShowPopup(false)}
          onSubmit={handleMatrixSubmit}
          error={error?.message}
        />
      )}
    </>
  );
}
