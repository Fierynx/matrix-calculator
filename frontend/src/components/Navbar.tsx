import { Link } from "react-router-dom";

export default function Navbar(){
  return (
    <nav className="fixed gap-2 w-full h-[7rem] bg-sky pt-5 text-center">
      <div className="flex justify-between px-12">
        <h1 className="text-xl font-bold">Matrix Calculator</h1>
        <Link to="/instructions" className="py-1 px-4 bg-white rounded hover:bg-slate-100">Instructions</Link>
      </div>
      <div className="w-full flex justify-around pt-5">
        <Link to="/diagonalize" className="flex-1 hover:bg-blue-200 p-2">Diagonalize Matrix</Link>
        <Link to="/lu-decomposition" className="flex-1 hover:bg-blue-200 p-2">LU Decomposition</Link>
        <Link to="/power-method" className="flex-1 hover:bg-blue-200 p-2">Power Method</Link>
        <Link to="/singular-value-decomposition" className="flex-1 hover:bg-blue-200 p-2">Singular Value Decomposition</Link>
      </div>
    </nav>
  );
}