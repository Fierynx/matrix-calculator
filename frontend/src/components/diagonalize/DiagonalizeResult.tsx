import { DiagonalizeResponse } from "../../lib/types";
import { formatMatrix } from "../../lib/utils";
import { useState } from "react";
import RecalculateWarningModal from "../general/RecalculateWarningModal";

type DiagonalizeResultProps = {
  result: DiagonalizeResponse;
  setResult: (result: DiagonalizeResponse | undefined) => void;
};

export default function DiagonalizeResult({
  result,
  setResult,
}: DiagonalizeResultProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleRecalculate = () => {
    setIsModalOpen(true);
  };

  const handleConfirmRecalculate = () => {
    setResult(undefined);
    setIsModalOpen(false);
  };

  const handleCancelRecalculate = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <h2 className="text-lg font-bold mb-2">Matrix Result:</h2>
      <div className="mb-4">
        <h3 className="font-bold">Eigenvalues:</h3>
        <pre className="bg-gray-100 p-4 rounded-md">
          {result.data.eigenvalues.join(" ")}
        </pre>
      </div>
      <div className="mb-4">
        <h3 className="font-bold">Eigenvectors:</h3>
        {result.data.eigenvectors.map((vector, index) => (
          <pre key={index} className="bg-gray-100 p-4 rounded-md">{`[${
            vector.join(" ")
          }]`}</pre>
        ))}
      </div>
      <div className="mb-4">
        <h3 className="font-bold">P (Matrix of Eigenvectors):</h3>
        <pre className="bg-gray-100 p-4 rounded-md">
          {result.data.P && formatMatrix(result.data.P)}
        </pre>
      </div>
      <div className="mb-4">
        <h3 className="font-bold">D (Diagonal Matrix of Eigenvalues):</h3>
        <pre className="bg-gray-100 p-4 rounded-md">
          {result.data.D && formatMatrix(result.data.D)}
        </pre>
      </div>
      <div className="mb-4">
        <h3 className="font-bold">Reconstructed Matrix (P * D * P^-1):</h3>
        <pre className="bg-gray-100 p-4 rounded-md">
          {result.data.reconstructed_matrix &&
            formatMatrix(result.data.reconstructed_matrix)}
        </pre>
      </div>
      <div className="mb-4">
        <h3 className="font-bold">Diagonalizable:</h3>
        <pre className="bg-gray-100 p-4 rounded-md">
          {result.data.is_diagonalizable ? "Yes" : "No"}
        </pre>
      </div>
      <button
        onClick={handleRecalculate}
        className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
      >
        Recalculate
      </button>

      <RecalculateWarningModal
        isOpen={isModalOpen}
        onClose={handleCancelRecalculate}
        onConfirm={handleConfirmRecalculate}
      />
    </>
  );
}
