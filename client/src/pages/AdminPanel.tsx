import { PlusCircle } from "lucide-react"
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axiosAPI from "../api/axiosAPI";

const AdminPanel = () => {
  const navigate=useNavigate();
  const [name,setName]=useState("");
  const [description,setDescription]=useState("");
  const [image,setImage]=useState("");
  const [price,setPrice]=useState(0);
  const [categoryRole,setCategoryRole]=useState("");
  const [subCategoryRole,setSubCategoryRole]=useState("");
  const [size,setSize]=useState("");
  const [bestseller,setBestseller]=useState("false");
  const [formData,setFormData]=useState([]);

  const handleSignOut = async ()=>{
      localStorage.removeItem("token");
      toast.success("Sign out successfully");
      navigate("/home");
    }
    const handleSubmit=async (e:React.FormEvent<HTMLFormElement>)=>{
      e.preventDefault();
      try {
        const {data} = await axiosAPI.post("/product/create",{name,image,description,categoryRole,subCategoryRole,price,size,bestseller});
        setFormData(data);
        toast.success("Product created successfully");
      } catch (error) {
        toast.error("Something went wrong!");
        console.log(error);
      }
    }
  return (
    <>
    <div className="flex justify-between items-center bg-gray-100 p-4 border-b-2 border-gray-300">
      <img src="./logo.png" alt="name" className="w-24" />
      <button className="bg-gray-700 text-white border-none outline-none px-5 py-2 text-sm rounded-full shadow-md cursor-pointer hover:bg-gray-900 transition duration-300"
      onClick={handleSignOut}>Signout</button>
    </div>
  <div className="flex">
 <div className="w-64 h-screen border-r-2 border-gray-300 bg-gray-100">
      <div className="flex items-center gap-5 px-2 border border-gray-300 bg-gray-100 py-2.5 cursor-pointer">
        <PlusCircle className="w-5 h-5 text-gray-700 hover:text-gray-900 cursor-pointer transition duration-300" />
        <h1 className=" font-bold text-gray-700">Add</h1>
      </div>    
    </div>
    {/* content */}
    <div className="">
      <form className="flex flex-col gap-5 p-5" onSubmit={handleSubmit}>
        <input type="text" placeholder="Product name" 
        className="outline-none border border-gray-300 p-3" 
        value={name} onChange={(e)=>setName(e.target.value)} />
        <input type="text" placeholder="Product image" 
        className="outline-none border border-gray-300 p-3"
         value={image} onChange={(e)=>setImage(e.target.value)} />
        <textarea placeholder="Product description"
         className="outline-none border border-gray-300"
          value={description} onChange={(e)=>setDescription(e.target.value)}></textarea>
        <div className="flex items-center gap-5">
        <input type="text" placeholder="Category" 
        className="border border-gray-300 outline-none p-2 w-22"
         value={categoryRole} onChange={(e)=>setCategoryRole(e.target.value)}  />
        <input type="text" placeholder="Subcategory"
         className="border border-gray-300 outline-none p-2 w-28"
          value={subCategoryRole}  onChange={(e)=>setSubCategoryRole(e.target.value)} />
        <input type="number" placeholder="Price" 
        className="border border-gray-300 outline-none p-2 w-22" 
        value={price} onChange={(e)=>setPrice(e.target.value)}  />
        </div>
        <div className="flex items-center gap-3">
        <input type="text" placeholder="Size"
         className="outline-none border border-gray-300 p-3 w-22"
          value={size} onChange={(e)=>setSize(e.target.value)}/>
        <input type="text" placeholder="Best" 
        className="outline-none border border-gray-300 p-3 w-22"
         value={bestseller} onChange={(e)=>setBestseller(e.target.value)} />
        </div>
          <button className="bg-gray-700 border-none outline-none shadow-md p-2 cursor-pointer text-white hover:bg-gray-900 transition duration-300">Add Product</button>
      </form>
    </div>
    </div>
   
    </>
  )
}

export default AdminPanel;