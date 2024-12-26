export default function Instructions(){
  return (
    <>
      <h1 className="text-xl font-bold">Instructions</h1>
      <p className="mt-7">To use the matrix calculator, follow these steps:</p>
      <ol className="list-decimal ml-5">
        <li>Select Parameters: Choose the desired parameters and click the "Set matrix" button.</li>
        <li>Set Matrix: A window will open allowing you to define yout matrix. There are two modes for input:
          <p>Fractional Mode: Use common fractions (e.g., 3/7) and integers.</p>
          <p>Decimal Mode: Use decimal fractions (e.g., 0.38) and integers.</p>
        </li>
        <li>Complex Numbers: If you want to use complex numbers, check the "Complex" checkbox.Enter complex numbers in the form a+bi (e.g., 1+3i or 3i+1). For fractions involving complex numbers, simply write them without parentheses (e.g., 2+5i/8-i for a fraction).</li>
        <li>
        Complex Numbers: If you want to use complex numbers, check the "Complex" checkbox.Enter complex numbers in the form a+bi (e.g., 1+3i or 3i+1). For fractions involving complex numbers, simply write them without parentheses (e.g., 2+5i/8-i for a fraction).
        </li>
        <li>
        Fill Matrix: You can input nonzero coefficients first and then fill in the remaining cells with zeros by pressing the relevant button. The matrix must be fully filled.
        </li>
        <li>
        Restore Matrix: If you've previously calculated a matrix, you can restore it to make corrections and recalculate.
        </li>
        <li>
        Detailed Solution: If you want a more detailed solution showing every step, check the corresponding checkbox. Be aware that this might slightly increase computation time for larger matrices.
        </li>
        <li>
        Solve: Press the "Solve" or "Calculate" button to get the result.
        </li>
      </ol>
      <div className="mt-10">
        <p>Continue Calculation & Recalculate</p>
        <p>After obtaining a solution, you can either continue the calculation or recalculate using different method. Simply click the appropriate button and select a new method to apply.</p>
        <ul className="list-disc ml-5">
          <li>Continue Calculation: The chosen method will be applied to the result matrix from the previous calculation.</li>
          <li>Recalculate: The chosen method will be applied to the original matrix.</li>
        </ul>
        <p>If a method is not available in the menu, it means that the matrix is not compatible with that method (e.g., it might not be square when the method requires a square matrix).</p>
      </div>
      <div className="mt-10">
        <p>Notice</p>
        <ul className="list-disc ml-5">
          <li>For full accuracy use fractional mode, because imprecision can take place in case of decimal mode.</li>
          <li>All the methods presented on this website have passed a lot of tests. Anyway 
          author is not responsible for your solutions.</li>
          <li>If you found a mistake in calculation, please writenabout it. Together we can 
          make the website even better.</li>
        </ul>
      </div>
    </>
  );
}