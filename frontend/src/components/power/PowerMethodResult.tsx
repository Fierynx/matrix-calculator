import { PowerMethodResponse } from "../../lib/types";
import { useState } from "react";
import RecalculateWarningModal from "../general/RecalculateWarningModal";
import { formatArray } from "../../lib/utils";

type PowerMethodResultProps = {
  result: PowerMethodResponse;
  setResult: (result: PowerMethodResponse | undefined) => void;
};

export default function PowerMethodResult({ result, setResult }: PowerMethodResultProps) {
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
        <h3 className="font-bold">Dominant Eigenvalue:</h3>
        <pre className="bg-gray-100 p-4 rounded-md">
          {result.data.dominant_eigenvalue}
        </pre>
      </div>
      <div className="mb-4">
        <h3 className="font-bold">Corresponding Eigenvector:</h3>
        <pre className="bg-gray-100 p-4 rounded-md">
          [{result.data.corresponding_eigenvector && formatArray(result.data.corresponding_eigenvector)}]
        </pre>
      </div>
      <div className="mb-4">
        <h3 className="font-bold">Convergent:</h3>
        <pre className="bg-gray-100 p-4 rounded-md">
          {result.data.convergent ? "Yes" : "No"}
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
