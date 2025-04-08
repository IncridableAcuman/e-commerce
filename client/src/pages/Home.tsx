import { useEffect } from "react";
import { useNavigate } from "react-router-dom"

const Home = () => {
  const navigate=useNavigate();
  useEffect(()=>{
    const token = localStorage.getItem("token");
    if(token){
      navigate("/");
    }
  }
  ,[navigate]);
  return (
    <>
    <div className="fixed top-0 left-0 w-full flex items-center justify-between px-10 py-4 border-b bg-white">
      <img src="./logo.png" alt="logo" className="w-20" />
      <button className="border px-5 py-2 rounded cursor-pointer shadow-md bg-slate-700 text-white hover:bg-slate-900 transition duration-300"
      onClick={()=>navigate("/login")}>Sign In</button>
    </div>
    <div className="flex flex-col items-center justify-center h-screen w-full">
      <img src="./p_img1.png" alt="aaaaa" className="w-full" />    
    </div>
    </>
  )
}

export default Home