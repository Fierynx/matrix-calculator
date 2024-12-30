import { Link } from "react-router-dom";

export default function Navbar(){
  return (
    <nav className="fixed gap-2 w-full h-[7rem] bg-sky pt-3 text-center border-t-[1px] border-gray grid grid-rows-2 z-10">
      <div className="flex justify-between items-center px-12">
        <h1 className="text-xl font-bold">Matrix Calculator</h1>
        <Link to="/instructions" className="py-1 px-4 bg-white rounded hover:bg-slate-100">Instructions</Link>
      </div>
      <div className="w-full flex justify-around [&_a]:border [&_a]:border-l-gray [&_a]:flex-1 text-[clamp(0.7rem,1.5vw,1rem)] [&_a]:h-full [&_a]:flex [&_a]:flex-col [&_a]:justify-center">
        <Link to="/diagonalize" className="hover:bg-blue-200">Diagonalize Matrix</Link>
        <Link to="/lu-decomposition" className="hover:bg-blue-200">LU Decomposition</Link>
        <Link to="/power-method" className="hover:bg-blue-200">Power Method</Link>
        <Link to="/singular-value-decomposition" className="hover:bg-blue-200">Singular Value Decomposition</Link>
      </div>
    </nav>
  );
}