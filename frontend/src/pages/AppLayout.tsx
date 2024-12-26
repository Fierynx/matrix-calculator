import { Outlet } from "react-router-dom";
import Footer from "../components/general/Footer";
import Navbar from "../components/general/Navbar";

export default function AppLayout(){
  return (
    <>
      <Navbar/>
      <div className="flex justify-center">
        <div className="text-sm py-[10rem] max-w-full w-[50%] md:w-full px-9 bg-white min-h-screen border-x">
          <Outlet/>
        </div>
      </div>
      <Footer/>
    </>
  );
}