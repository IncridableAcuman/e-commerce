import { Route, Routes } from "react-router-dom"
import Auth from "./pages/Auth"
import Login from "./pages/Login"
import Register from "./pages/Register"
import ForgotPassword from "./pages/ForgotPassword"
import ResetPassword from "./pages/ResetPassword"
import Home from "./pages/Home"
import About from "./pages/About"
import Contact from "./pages/Contact"
import Collection from "./pages/Collection"
import UserProducts from "./pages/UserProducts"
import AdminPanel from "./pages/AdminPanel"
import Cart from "./pages/Cart"
import PlaceOrder from "./pages/PlaceOrder"
import { ToastContainer } from "react-toastify"

const App = () => {
  return (
    <>
    <ToastContainer />
    <Routes>
      <Route path="/home" element={<Home/>} />
      <Route path="/" element={<Auth/>} />
      <Route path="/login" element={<Login/>} />
      <Route path="/register" element={<Register/>} />
      <Route path="/forgot-password" element={<ForgotPassword/>} />
      <Route path="/reset-password" element={<ResetPassword/>} />
      <Route path="/about" element={<About/>} />
      <Route path="/contact" element={<Contact/>} />
      <Route path="/collection" element={<Collection/>} />
      <Route path="/product/:id" element={<UserProducts/>} />
      <Route path="/admin" element={<AdminPanel/>} />
      <Route path="/cart" element={<Cart/>} />
      <Route path="/place-order" element={<PlaceOrder/>} />
    </Routes>
    </>
  )
}

export default App