import { Outlet } from "react-router-dom";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";

export default function AppLayout(){
  return (
    <>
      <Navbar/>
      <div className="pt-[10rem] flex justify-center">
        <Outlet/>
      </div>
      <Footer/>
    </>
  );
}