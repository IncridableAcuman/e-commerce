import {ShoppingCartIcon,Heart,Mail,Lock,} from 'lucide-react'
import {  useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify';
import axiosAPI from '../api/axiosAPI';
import { useAuth } from '../contexts/AuthProvider';
const Login = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const navigate=useNavigate();
  const {login}=useAuth();
  const handleSubmit= async (e:React.FormEvent<HTMLFormElement>)=>{
    e.preventDefault();
    try {
      const {data}=await axiosAPI.post("/auth/signIn",{email,password});
      login(data);
      localStorage.setItem("token",data.accessToken);
      toast.success("Login successful!");
      navigate("/");
    } catch (error) {
      toast.error("Something went wrong!");
      console.log(error);
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
        <h1 className='text-2xl font-bold mb-3 text-center'>Sign In</h1>
      <form className='space-y-4' onSubmit={handleSubmit}>
        <div className="flex items-center gap-2 mb-4 border-2 p-2 border-gray-300">
          <Mail/>
          <input type="email" placeholder="Email" 
          className=" rounded px-2 py-1 outline-0" 
          value={email} onChange={(e)=>setEmail(e.target.value)}/>
        </div>
        <div className="flex items-center gap-2 mb-4 border-2 p-2 border-gray-300"> 
          <Lock/>
          <input type="password" placeholder="Password" className="outline-0 rounded px-2 py-1"
          value={password} onChange={(e)=>setPassword(e.target.value)} />
        </div>
        <div className="flex items-center justify-between px-2">
        <p className='text-sm cursor-pointer hover:underline text-gray-600' onClick={()=>navigate("/forgot-password")}>Forgot Password</p>
        <p className='text-sm cursor-pointer text-gray-600 hover:text-gray-700 transition'></p>
        </div>
        <button className='w-full border px-5 py-2 text-sm cursor-pointer
         bg-black text-white'>Sign In</button>
                 <p className='text-sm cursor-pointer text-gray-600 hover:text-gray-700 transition'>
        Don't have an account? <span className='font-semibold cursor-pointer hover:underline' onClick={()=>navigate("/register")}>Sign Up</span>
                 </p>
      </form>
      </div>
     
    </div>
    </>
  )
}

export default Login