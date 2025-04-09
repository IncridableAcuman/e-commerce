import { useNavigate } from "react-router-dom"
import Footer from "../components/Footer"
import Navbar from "../components/Navbar"
import { Trash2 } from "lucide-react";
const Cart = () => {
    const navigate=useNavigate();
    const data=localStorage.getItem("data");
    console.log(data?.length)
  return (
    <>
    <Navbar/>
    <div className="container mx-auto py-8 px-3 lg:py-12 lg:px-12">
      <div className="content-auth">
         
         <div className="flex items-center justify-between border-b border-t py-2">
           {/* content */}
           <div className="flex items-center gap-5">
           <img src="./p_img15.png" alt="name" className="w-24 h-24" />
            <div className="space-y-2">
               <h2 className=" text-sm lg:text-xl font-semibold">title</h2>
               <div className="flex items-center gap-3">
                  <p className="text-sm">10$</p>
                  <p className="bg-gray-100 p-2 py-1 outline text-sm">X</p>
               </div>
            </div>
           </div>
           {/* content */}
           <input type="number" className="w-12 border" />
           {/*  */}
           <Trash2 className="cursor-pointer"/>
           {/*  */}
         </div>
      </div>
      <div className="flex flex-col items-center justify-center h-screen max-w-md mx-auto">
        <div className="flex items-center gap-3">
        <h1 className="text-2xl font-semibold uppercase">your cart</h1>
        <p className="bg-black h-1 w-8"></p>
        </div>
     <div className="flex items-center border-b justify-between w-full p-2">
        <p>Subtotal</p>
        <p>${" "}0.00</p>
     </div>
     <div className="flex items-center border-b mt-3 justify-between w-full p-2">
        <p>Shipping Fee</p>
        <p>${" "}10.00</p>
     </div>
     <div className="flex items-center border-b mt-3 justify-between w-full p-2">
        <b>Total</b>
        <b>${" "}0.00</b>
     </div>
     <button className="border px-5 py-2.5 mt-3 cursor-pointer hover:bg-black
     hover:text-white transition duration-300" onClick={()=>navigate("/place-order")}>proceed to checkout</button>
    </div>
    </div>
    
    <Footer/>
    </>
  )
}

export default Cart