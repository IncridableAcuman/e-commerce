import  React, { useEffect, useState } from "react"
import Navbar from "../components/Navbar"
import Footer from "../components/Footer";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axiosAPI from "../api/axiosAPI";
import { Product } from "../hooks/Product";
const Collection = () => {
    const [sortOption,setSortOption]=useState("relevant");
    const [activeCategory,setActiveCategory]=useState("Men");
    const [productData,setProductData]=useState<Product[]>([]);
    const [searchQuery,setSearchQuery]=useState("");
    const [products,setProducts]=useState<Product[]>([]);
    const navigate=useNavigate();
    const handleSortChange=(event)=>{
        setSortOption(event.target.value);
    }
    const handleCategory = (category: string) => {
        setActiveCategory(category);
      }

      const fetchProduct=async (event:React.FormEvent<HTMLFormElement>)=>{
        event.preventDefault();
        try {
          const {data}=await axiosAPI.get(`/product/search?keyword=${searchQuery}`);
          setProducts(data);
        } catch (error) {
          toast.error("Something went wrong");
          console.log(error);
        }
      }

      const handleProductData = async ()=>{
        try {
          const {data}:{data:Product[]} = await axiosAPI.get("/product/all-products");
          setProductData(data);
          setProducts(data);
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
    <div className="content-auth mt-20">
    <form onSubmit={fetchProduct}>
      <div className="">
        <input type="text" placeholder="search product"
         className="outline-none border border-gray-300 p-2 mb-2"
         value={searchQuery} onChange={(e)=>setSearchQuery(e.target.value)} />
        <button className="bg-gray-700 text-white cursor-pointer p-2 hover:bg-gray-900 transition"
        >Search</button>
      </div>
    </form>
        <div className="item grid grid-cols-1 lg:grid-cols-2 gap-5">
        <div className="left-item">
            <h1 className="text-2xl font-semibold text-gray-500 mb-3">Filter</h1>
            <div className="contents">
                <div className="border-2 border-gray-200 p-4 max-w-[200px]">
                    <h2 className="font-semibold">Categories</h2>
                    <div className="flex items-center gap-2 mt-2">
                    <input type="checkbox" className={`cursor-pointer ${activeCategory==="Men"?"category":""}`} 
                    onClick={()=>handleCategory("Men")} />
                    <p>Men</p>
                    </div>
                    <div className="flex items-center gap-2 mt-2">
                    <input type="checkbox" className={`cursor-pointer ${activeCategory==="Women"?"category":""}`}
                     onClick={()=>handleCategory("Women")} />
                    <p>Women</p>
                    </div>
                    <div className="flex items-center gap-2 mt-2">
                    <input type="checkbox" className={`cursor-pointer ${activeCategory==="Kids"?"category":""}`}
                    onClick={()=>handleCategory("Kids")} />
                    <p>Kids</p>
                    </div>
                </div>
                {/* dfbmdlfkbimflgkmbflgki */}
                <div className="border-2 border-gray-200 mt-3 p-4 max-w-[200px]">
                    <h2 className="font-semibold">Type</h2>
                    <div className="flex items-center gap-2 mt-2">
                    <input type="checkbox" className={`cursor-pointer ${activeCategory==="Topwear"?"category":""}`}
                    onClick={()=>handleCategory("Topwear")} />
                    <p>Topwear</p>
                    </div>
                    <div className="flex items-center gap-2 mt-2">
                    <input type="checkbox" className={`cursor-pointer ${activeCategory==="Bottomwear"?"category":""}`}
                    onClick={()=>handleCategory("Bottomwear")} />
                    <p>Bottomwear</p>
                    </div>
                    <div className="flex items-center gap-2 mt-2" >
                    <input type="checkbox" 
                    className={`cursor-pointer ${activeCategory==="Winterwear"?"category":""}`} onClick={()=>handleCategory("Winterwear")} />
                    <p>Winterwear</p>
                    </div>
                </div>
            </div>
        </div>
        <div className="right-item">
        <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold uppercase">All Category</h1>
        <select value={sortOption} onChange={handleSortChange} className="border-2 border-gray-200 p-2">
        <option value="relevant">Sort by: Relevant</option>
        <option value="low-to-high">Sort by: Low to High</option>
        <option value="high-to-low">Sort by: High to Low</option>
        </select>
        </div> 
        <div className="mt-12">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
                    {productData.filter((product)=>
                    (product.categoryRole===activeCategory || product.subCategoryRole===activeCategory)
                    && (product.name.toLocaleLowerCase().includes(searchQuery.toLocaleLowerCase()) ||
                      product.description.toLocaleLowerCase().includes(searchQuery.toLocaleLowerCase()))  
                  )
                    .map((product, index) => (  
                      product.categoryRole===activeCategory  || product.subCategoryRole===activeCategory ? (
                      <div
                        key={index}
                        className="product-card cursor-pointer bg-white shadow-md rounded-lg overflow-hidden hover:shadow-lg transition-shadow duration-300"
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
                      ):null   
                    ))}
                  </div>
        </div>   
        </div>            
        </div>
        </div>
        <Footer/>
    </>
  )
}

export default Collection