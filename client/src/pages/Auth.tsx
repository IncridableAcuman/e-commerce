import { useEffect, useState } from "react";
import AuthComponentsOne from "../components/AuthComponentsOne"
import AuthConponentSecond from "../components/AuthConponentSecond"
import Navbar from "../components/Navbar"
import AuthComponentsThird from "../components/AuthComponentsThird";
import AuthComponentFourth from "../components/AuthComponentFourth";
import AuthComponentFiveth from "../components/AuthComponentFiveth";
import Footer from "../components/Footer";
import { useNavigate } from "react-router-dom";

const Auth = () => {
  const [activeCategory,setActiveCategory] = useState('All');
  const navigate=useNavigate();
  const handleCategory = (category: string) => {
    setActiveCategory(category);
  }
  useEffect(()=>{
    if(!localStorage.getItem("token")){
      navigate("/home")
    }
  },[navigate]);
  return (
    <>
    <Navbar/>
    <div className="content-auth mt-20">
         <AuthComponentsOne/>
    </div>
    <div className="content-auth">
            <h1 className="text-center text-3xl font-semibold mb-3">Latest Collection</h1>
            <p className="text-gray-500 text-center mb-8">
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Similique quod
            </p>
      <div className="flex items-center justify-center gap-5">
              <button className={`cursor-pointer ${activeCategory==="All" ? "category":""}`}
              onClick={()=>handleCategory("All")}>All</button>
              <button className={`cursor-pointer ${activeCategory==="Men"? "category":""}`}
              onClick={()=>handleCategory("Men")}>Men</button>
              <button className={`cursor-pointer ${activeCategory==="Women" ? "category":""}`}
              onClick={()=>handleCategory("Women")}>Women</button>
              <button className={`cursor-pointer ${activeCategory==="Kids" ? "category":""}`}
              onClick={()=>handleCategory("Kids")}>Kids</button>
            </div>
            {activeCategory==="All"?<AuthConponentSecond/> : activeCategory==="Men" ? <AuthComponentsThird/> 
            :activeCategory==="Women" ? <AuthComponentFourth/> : <AuthComponentFiveth/>}
            <div className="container mx-auto px-4 py-8">
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                <div className="text-center">
                  <center>
                <img src="./support_img.png" alt="support" className="mb-4" />                    
                  </center>
                <h3 className="text-xl font-bold mb-1">Easy Exchange Policy</h3>
                <p className="text-gray-400">We offer hassle free exchange policy</p>
              </div>
              <div className="text-center">
                <center>
                <img src="./quality_icon.png" alt="quality" className="mb-4" />                  
                </center>
                <h3 className="text-xl font-bold mb-1">7 Days Return Policy</h3>
                <p className="text-gray-400">We provide 7 days free return policy</p>
              </div>
              <div className="text-center">
                <center>
                <img src="./exchange_icon.png" alt="exchange" className="mb-4" />                  
                </center>
                <h3 className="text-xl font-bold mb-1">Best customer support</h3>
                <p className="text-gray-400">we provide 24/7 customer support</p>
              </div>
              <div className="text-center">
                <center>
                 <img src="./exchange_icon.png" alt="exchange" className="mb-4" />                 
                </center>
                <h3 className="text-xl font-bold mb-1">Best customer support</h3>
                <p className="text-gray-400">we provide 24/7 customer support</p>
              </div>
              </div>         
            </div>
        </div>

              <div className="text-center">
                <h1 className="text-2xl font-bold mb-1.5">Subscribe now & get 20% off</h1>
                <p className="text-gray-400">Lorem Ipsum is simply dummy text of the printing and typesetting industry.</p>
              </div>

                {/* enter your email */}
                <div className="container mx-auto px-4 py-8">
                  <div className="flex items-center justify-center">
                    <input type="email" placeholder="Enter your email" className=" outline-none border border-gray-300 px-4 py-2 w-1/2" />
                    <button className="bg-black text-white px-4 py-2">Subscribe</button>
                  </div>
                </div>  
                <div className="container mx-auto px-4 py-8">
             <Footer/>                   
                </div>

    </>
  )
}

export default Auth