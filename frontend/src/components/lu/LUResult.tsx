import { LUResponse } from "../../lib/types";
import { formatMatrix } from "../../lib/utils";
import { useState } from "react";
import RecalculateWarningModal from "../general/RecalculateWarningModal";

type LUResultProps = {
  result: LUResponse;
  setResult: (result: LUResponse | undefined) => void;
};

export default function LUResult({ result, setResult }: LUResultProps) {
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
        <h3 className="font-bold">A (Input Matrix):</h3>
        <pre className="bg-gray-100 p-4 rounded-md">
          {result.data.A && formatMatrix(result.data.A)}
        </pre>
      </div>
      <div className="mb-4">
        <h3 className="font-bold">L (Lower Triangular Matrix):</h3>
        <pre className="bg-gray-100 p-4 rounded-md">
          {result.data.L && formatMatrix(result.data.L)}
        </pre>
      </div>
      <div className="mb-4">
        <h3 className="font-bold">U (Upper Triangular Matrix):</h3>
        <pre className="bg-gray-100 p-4 rounded-md">
          {result.data.U && formatMatrix(result.data.U)}
        </pre>
      </div>
      <div className="mb-4">
        <h3 className="font-bold">Crout's method possible:</h3>
        <pre className="bg-gray-100 p-4 rounded-md">
          {result.data.crout_possible ? "Yes" : "No"}
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
