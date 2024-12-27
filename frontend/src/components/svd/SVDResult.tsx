import { SVDResponse } from "../../lib/types";
import { formatMatrix } from "../../lib/utils";
import { useState } from "react";
import RecalculateWarningModal from "../general/RecalculateWarningModal";

type SVDResultProps = {
  result: SVDResponse;
  setResult: (result: SVDResponse | undefined) => void;
};

export default function SVDResult({ result, setResult }: SVDResultProps) {
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
        <h3 className="font-bold">𝑈 (Left Singular Vectors):</h3>
        <pre className="bg-gray-100 p-4 rounded-md">
          {result.data.U && formatMatrix(result.data.U)}
        </pre>
      </div>
      <div className="mb-4">
        <h3 className="font-bold">Σ (Singular Values):</h3>
        <pre className="bg-gray-100 p-4 rounded-md">
          {result.data.S && formatMatrix(result.data.S)}
        </pre>
      </div>
      <div className="mb-4">
        <h3 className="font-bold">V<sup>T</sup> (Right Singular Vectors):</h3>
        <pre className="bg-gray-100 p-4 rounded-md">
          {result.data.VT && formatMatrix(result.data.VT)}
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
