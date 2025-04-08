import Footer from "../components/Footer"
import Navbar from "../components/Navbar"

const PlaceOrder = () => {
  return (
    <>
    <Navbar/>
    <div className="container content-auth mt-20 min-h-screen">
        <div className="flex items-center gap-3">
            <h1 className="text-2xl font-semibold">
                <span className="text-gray-500">DELIVERY</span> INFORMATION
            </h1>
            <p className="h-1 w-8 bg-black"></p>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-28">
            <div className="mt-4">
                <form className="space-y-4">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
                    <input type="text" placeholder="First name" 
                    className="outline-none border border-gray-500 px-5 py-1.5" />
                    <input type="text" placeholder="Last name" 
                    className="outline-none border border-gray-500 px-5 py-1.5" />
                    </div>
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
                    <input type="email" placeholder="Email address"
                    className="outline-none border border-gray-500 px-5 py-1.5 w-full" />
                    <input type="text" placeholder="Street"
                    className="outline-none border border-gray-500 px-5 py-1.5 w-full" />                         
                    </div>
       
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
                        <input type="text" placeholder="City" 
                        className="outline-none border border-gray-500 px-5 py-1.5"/>
                        <input type="text" placeholder="State"
                        className="outline-none border border-gray-500 px-5 py-1.5" />
                    </div>
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
                        <input type="text" placeholder="Zipcode"
                        className="outline-none border border-gray-500 px-5 py-1.5" />
                        <input type="text" placeholder="Country"
                        className="outline-none border border-gray-500 px-5 py-1.5" />
                    </div>
                    <input type="text" placeholder="Phone number"
                    className="outline-none border border-gray-500 px-5 py-1.5 w-full" />
                </form>
            </div>
        <div className="max-w-md w-full">
            <h2 className="text-2xl font-semibold uppercase mb-3">
                <span className="text-gray-500">cart</span> totals
            </h2>
            <div className="flex items-center border-b justify-between w-full p-2 mb-3">
            <p>Subtotal</p>
            <p>${" "}0.00</p>
        </div>
        <div className="flex items-center border-b justify-between w-full p-2 mb-3">
        <p>Shipping Fee</p>
        <p>${" "}10.00</p>
        </div>
        <div className="flex items-center justify-between w-full p-2 mb-3">
        <b>Total</b>
        <b>${" "}0.00</b>
        </div>
        <div className="flex items-center gap-3 mt-3">
            <h2 className="text-xl font-semibold">
                <span className="text-gray-500">DELIVERY</span> INFORMATION
            </h2>
            <p className="h-1 w-8 bg-black"></p>
        </div>
        <div className="flex items-center gap-3">
            <div className="border px-5 py-2 flex items-center gap-3 mt-3">
                <input type="radio" />
                <img src="./stripe_logo.png" alt="stripe" className="w-8" />
            </div>
            <div className="border px-5 py-2 flex items-center gap-3 mt-3">
                <input type="radio" />
                <img src="./stripe_logo.png" alt="stripe" className="w-8" />
            </div>
            <div className="border px-5 py-2 flex items-center gap-3 mt-3">
                <input type="radio" />
                <img src="./stripe_logo.png" alt="stripe" className="w-8" />
            </div>
        </div>
        <button className="border border-gray-500 px-5 py-2 mt-4 cursor-pointer
         bg-black text-white shadow-md">place order</button>
        </div>
        </div>
    </div>
    <Footer/>
    </>
  )
}

export default PlaceOrder