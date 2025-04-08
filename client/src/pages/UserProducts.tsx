import { useNavigate, useParams } from "react-router-dom";
import Navbar from '../components/Navbar';
import  { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import axiosAPI from '../api/axiosAPI';
import { Product } from '../hooks/Product';
const UserProducts = () => {
  const {id}=useParams();
  const navigate=useNavigate();
  const [productData,setProductData]=useState<Product[]>([]);
  
  const handleProductData = async ()=>{
      try {
        const {data}:{data:Product[]} = await axiosAPI.get("/product/all-products");
        setProductData(data);
      } catch (error) {
        toast.error("Something went wrong");
        console.log(error);
      }
    }
    useEffect(()=>{
      handleProductData();
    },[]);



  return (
    <>
    <Navbar/>
   <div className="container mx-auto px-12 py-12">
    {productData.map((product,index)=>(
      product.id===Number(id) ? (
        <div className="content-auth grid grid-cols-1 lg:grid-cols-2 gap-5" key={index}>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
          <img src={product.image} alt={product.name} />
          <img src={product.image} alt={product.name} className='w-28' />
          </div>
          <div className="">
            <h1 className='text-2xl font-semibold mb-3'>{product.name}</h1>
           <div className="flex items-center gap-3 mb-3">
            <p>⭐️⭐️⭐️⭐️⭐️</p>
            <p>(122)</p>
           </div>
           <h2 className='text-xl font-semibold mb-3'>{product.price}{" "}$</h2>
           <p className='mb-3'>{product.description}</p>
           <p className='mb-3'>Select Size</p>
           <div className="flex items-center gap-4 mb-3">
              <button className={`bg-gray-200 py-2 px-4 cursor-pointer text-black`}
              >{product.size}</button>
           </div>
           <button className='bg-gray-700 mb-3 text-white px-5 py-2 cursor-pointer uppercase
            hover:bg-gray-900 transition duration-300'>Add to Cart</button>
           <hr />
           <div className="text-sm text-gray-500 mt-5">
            <p>100% Original product.</p>
           <p>Cash on delivery is available on this product.</p>
           <p>Easy return and exchange policy within 7 days.</p>
           </div>      
          </div>

        </div>
      ) : null
    ))}
    <div className="content-auth">
      <div className="flex items-center">
        <p className='border border-gray-300 px-5 py-2'>Description</p>
        <p className='border border-gray-300 px-5 py-2'>Reviews(122)</p>
      </div>
      <div className="border border-gray-300 px-5 py-3 text-sm text-gray-400">
        <p>An e-commerce website is an online platform that facilitates the buying and selling
           of products or services over the internet. It serves as a virtual marketplace where 
           businesses and individuals can showcase their products, interact with customers, and 
           conduct transactions without the need for a physical presence. E-commerce websites have
            gained immense popularity due to their convenience, accessibility, and the global reach
             they offer.</p> <br />
        <p>E-commerce websites typically display products or services along with detailed descriptions,
           images, prices, and any available variations (e.g., sizes, colors). Each product usually has
            its own dedicated page with relevant information.</p>
      </div>
    </div>
    <div className="content-auth">
        <h1 className=' text-center text-3xl font-semibold mb-5'>RELATED PRODUCTS</h1>  
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        {productData.slice(0,3).map((product, index) => (        
          <div
            key={index}
            className="product-card bg-white shadow-md rounded-lg overflow-hidden hover:shadow-lg transition-shadow duration-300"
            onClick={()=>navigate(`/product/${product.id}`)}
          >
            {/* Rasm qismi */}
            <div className="product-card-image">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-56 object-cover hover:scale-105 transition-transform duration-300"
              />
            </div>
            {/* Kontent qismi */}
            <div className="product-card-content p-4">
              <h2 className="text-lg font-medium text-gray-800 mb-2">
                {product.name.slice(0, 27)}
              </h2>
              <p className="text-gray-500 text-lg font-semibold">${product.price}</p>
            </div>
          </div>  
        ))}
        </div>    
    </div>
   </div>
    </>
  )
}

export default UserProducts