import { Heart, Mail, ShoppingCartIcon } from "lucide-react"
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import axiosAPI from "../api/axiosAPI";
import { useNavigate } from "react-router-dom";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const navigate=useNavigate();
  const handleForgotPassword = async (e:React.FormEvent<HTMLFormElement>)=>{
    e.preventDefault();
    try {
      await axiosAPI.post("/auth/forgot-password",{email});
      toast.success("Password reset link sent to your email.");
    } catch (error) {
      toast.error("Something went wrong, please try again later.");
      console.error("Error forgot password:", error);
    }
  }
    useEffect(()=>{
  if(localStorage.getItem("token")){
    navigate("/");
  }
    },[navigate]);
  return (
    <>
    <div className="fixed top-0 left-0 w-full flex items-center justify-between px-10 py-4 border-b bg-gray-100 z-10">
      <img src="./logo.png" alt="logo" className="w-24" />
      <div className="flex items-center gap-5">
      <Heart/>
      <ShoppingCartIcon/>
      </div>
    </div>
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <div className="bg-white shadow-md rounded-lg p-8 w-96">
        <h1 className='text-2xl font-bold mb-3 text-center'>Forgot Password</h1>
        <p className="text-center text-gray-700 mb-3">Reset Password sent to your email</p>
      <form className='space-y-4' onSubmit={handleForgotPassword}>
        <div className="flex items-center gap-2 mb-4 border-2 border-gray-300 p-2 rounded">
          <Mail/>
          <input type="email" placeholder="Email" 
          className=" rounded px-2 py-1 outline-0"
          value={email} onChange={(e)=>setEmail(e.target.value)} />
        </div>
        <button className='w-full border px-5 py-2 text-sm cursor-pointer mt-2
         bg-slate-900 text-white hover:bg-slate-950 transition duration-300'>Forgot Password</button>
      </form>
      </div>
     
    </div>
    </>
  )
}

export default ForgotPassword