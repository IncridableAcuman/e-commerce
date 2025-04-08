import { LogOut, Search, ShoppingCart, User, Menu } from "lucide-react";
import {  useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axiosAPI from "../api/axiosAPI";
import { useAuth } from "../contexts/AuthProvider";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const {user}=useAuth();

  const navigate = useNavigate();
  if(user){
    localStorage.setItem("user",user.username);
   localStorage.setItem("id",user.id.toString()) 
  }

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const handleSignOut = async ()=>{
    try {
      await axiosAPI.post("/auth/signOut");
      toast.success("Successfully signed out.");
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      localStorage.removeItem("id");
      navigate("/home");
    } catch (error) {
      toast.error("Something went wrong, please try again later.");
      console.error("Error signing out:", error);
    }
  }

  return (
    <>
      <div className="fixed top-0 left-0 w-full flex justify-between items-center px-6 sm:px-10 py-4 border-b bg-gray-100 z-10">
        <img src="./logo.png" alt="logo" className="w-24" />
        
        {/* Desktop menu */}
        <div className="hidden sm:flex items-center gap-5">
          <Link to="/" className="font-semibold text-gray-700 hover:text-gray-950 transition hover:underline">
            Home
          </Link>
          <Link to="/collection" className="font-semibold text-gray-700 hover:text-gray-950 transition hover:underline">
            Collection
          </Link>
          <Link to="/about" className="font-semibold text-gray-700 hover:text-gray-950 transition hover:underline">
            About
          </Link>
          <Link to="/contact" className="font-semibold text-gray-700 hover:text-gray-950 transition hover:underline">
            Contact
          </Link>
        </div>
        
        {/* Icons */}
        <div className="flex items-center gap-5">
          <Search onClick={()=>navigate("/collection")} className="cursor-pointer" />
          <User className="cursor-pointer relative" onClick={handleToggle} />
          {isOpen && (
            <div className="absolute bg-gray-100 p-3 mt-57 right-5 border shadow-md rounded-lg">
              <div className="">
                <div className="flex items-center gap-3 cursor-pointer hover:bg-gray-200 p-2 rounded transition">
                  <User />
                  <p>{user?.username || localStorage.getItem("user")}</p>
                </div>
                <div className="flex items-center gap-3 mt-3 cursor-pointer hover:bg-gray-200 p-2 rounded transition"
                  onClick={handleSignOut}>
                  <LogOut />
                  <p>Sign Out</p>
                </div>
                <div className="flex items-center gap-3 mt-3 cursor-pointer hover:bg-gray-200 p-2 rounded transition">
                  <User />
                  <p onClick={() => navigate("/admin")} className="cursor-pointer">Admin</p>
                </div>
              </div>
            </div>
          )}
            <div className="relative cursor-pointer" onClick={() => navigate("/cart")}>
            <ShoppingCart />
            <span className="absolute top-0 right-0 bg-red-500 text-white rounded-full px-1 text-xs">3</span>
          </div>
          <Menu className="block sm:hidden cursor-pointer" onClick={toggleMenu} />
        </div>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="absolute top-14 left-0 w-full bg-gray-100 p-5 flex flex-col items-center shadow-md sm:hidden">
          <Link to="/" className="font-semibold text-gray-700 hover:text-gray-950 transition hover:underline py-2">
            Home
          </Link>
          <Link to="/collection" className="font-semibold text-gray-700 hover:text-gray-950 transition hover:underline py-2">
            Collection
          </Link>
          <Link to="/about" className="font-semibold text-gray-700 hover:text-gray-950 transition hover:underline py-2">
            About
          </Link>
          <Link to="/contact" className="font-semibold text-gray-700 hover:text-gray-950 transition hover:underline py-2">
            Contact
          </Link>
        </div>
      )}

      {/* Search bar */}
      
    </>
  );
};

export default Navbar;
