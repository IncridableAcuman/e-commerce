import { Heart, Mail, ShoppingCartIcon } from "lucide-react"
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import axiosAPI from "../api/axiosAPI";
import { useNavigate } from "react-router-dom";

const ResetPassword = () => {
  const [password,setPassword] = useState("");
  const [confirmPassword,setConfirmPassword] = useState("");
  const navigate=useNavigate();
  const handleResetPassword = async (e:React.FormEvent<HTMLFormElement>)=>{
    e.preventDefault();
    try {
      await axiosAPI.put("/auth/reset-password",{password,confirmPassword});
      toast.success("Password reset successfully.");
      navigate("/login");
    } catch (error) {
      toast.error("Something went wrong, please try again later.");
      console.error("Error resetting password:", error);
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
        <h1 className='text-2xl font-bold mb-5 text-center'>Reset Password</h1>
      <form className='space-y-4' onSubmit={handleResetPassword}>
        <div className="flex items-center gap-2 mb-4 border-2 border-gray-300 p-2 rounded">
          <Mail/>
          <input type="password" placeholder="Password" 
          className=" rounded px-2 py-1 outline-0"
          value={password} onChange={(e)=>setPassword(e.target.value)} />
        </div>
        <div className="flex items-center gap-2 mb-4 border-2 border-gray-300 p-2 rounded">
          <Mail/>
          <input type="password" placeholder="Confirm Password" 
          className=" rounded px-2 py-1 outline-0"
          value={confirmPassword} onChange={(e)=>setConfirmPassword(e.target.value)} />
        </div>
        <button className='w-full border px-5 py-2 text-sm cursor-pointer mt-2
         bg-slate-900 text-white hover:bg-slate-950 transition duration-300'>Reset Password</button>
      </form>
      </div>
     
    </div>
    </>
  )
}

export default ResetPassword