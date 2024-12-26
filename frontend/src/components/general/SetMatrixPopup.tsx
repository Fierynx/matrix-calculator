import { useRef, useState } from "react";

type SetMatrixPopupProps = {
  rows: number;
  cols: number;
  onClose: () => void;
  onSubmit: (matrix: number[][]) => void;
  error: string | undefined;
};

export default function SetMatrixPopup({
  rows,
  cols,
  onClose,
  onSubmit,
  error,
}: SetMatrixPopupProps) {
  const [matrix, setMatrix] = useState<number[][]>(
    Array.from({ length: rows }, () => Array(cols).fill(NaN))
  );
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const inputRefs = useRef<(HTMLInputElement | null)[][]>(
    Array.from({ length: rows }, () => Array(cols).fill(null))
  );

  function handleInputChange(row: number, col: number, value: number) {
    const updatedMatrix = [...matrix];
    updatedMatrix[row][col] = isNaN(value) ? NaN : +value;
    setMatrix(updatedMatrix);
    setErrorMessage(null);
  }

  function fillWithZeros() {
    setMatrix((prevMatrix) =>
      prevMatrix.map((row) => row.map((value) => (isNaN(value) ? 0 : value)))
    );
    setErrorMessage(null);
  }

  function clearMatrix() {
    setMatrix(Array.from({ length: rows }, () => Array(cols).fill(NaN)));
    setErrorMessage(null);
  }

  function handleSubmit(matrix: number[][]) {
    setErrorMessage(error ?? null);
    if (matrix.some((row) => row.some((cell) => isNaN(cell)))) {
      setErrorMessage("All cells must be filled with number.");
    } else if(errorMessage && error){
      setErrorMessage(error);
    } else {
      setErrorMessage(null);
      onSubmit(matrix);
    }
  }

  function handleArrowKey(row: number, col: number, e: React.KeyboardEvent) {
    if (!inputRefs.current[row][col]) return;
    switch (e.key) {
      case "ArrowUp":
        e.preventDefault();
        if (row > 0) inputRefs.current[row - 1][col]?.focus();
        break;
      case "ArrowDown":
        e.preventDefault();
        if (row < rows - 1) inputRefs.current[row + 1][col]?.focus();
        break;
      case "ArrowLeft":
        if (col > 0) inputRefs.current[row][col - 1]?.focus();
        break;
      case "ArrowRight":
        if (col < cols - 1) inputRefs.current[row][col + 1]?.focus();
        break;
    }
  }

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="bg-white p-6 rounded-lg shadow-lg w-11/12 max-w-md">
        <h2 className="text-lg font-bold mb-4">Matrix Input</h2>
        <div className="space-y-3">
          {matrix.map((row, rowIndex) => (
            <div key={rowIndex} className="flex gap-3">
              {row.map((value, colIndex) => (
                <input
                  key={colIndex}
                  type="number"
                  value={isNaN(value) ? "" : value}
                  onChange={(e) =>
                    handleInputChange(rowIndex, colIndex, parseFloat(e.target.value))
                  }
                  onKeyDown={(e) => handleArrowKey(rowIndex, colIndex, e)}
                  ref={(el) => (inputRefs.current[rowIndex][colIndex] = el)}
                  className="w-16 h-12 text-center border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              ))}
            </div>
          ))}
        </div>
        {errorMessage && (
          <div className="text-red-500 text-sm mt-2 text-center">{errorMessage}</div>
        )}
        <div className="flex justify-between mt-6 space-x-2">
          <button
            onClick={clearMatrix}
            className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600"
          >
            Clear
          </button>
          <button
            onClick={fillWithZeros}
            className="bg-gray-500 text-black px-4 py-2 rounded-md hover:bg-gray-600"
          >
            Fill empty cells with zero
          </button>
          <button
            onClick={() => handleSubmit(matrix)}
            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
          >
            Solve
          </button>
        </div>
      </div>
    </div>
  );
}
