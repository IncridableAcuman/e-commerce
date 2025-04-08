
const Footer = () => {
  return (
    <>
    <center>
<div className="container mx-auto px-4 py-8 border-b border-gray-300">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mx-a">
            <div className="a">
            <img src="./logo.png" alt="logo" className="w-24 mb-3" />
            <p className="max-w-[500px] text-sm">Lorem Ipsum is simply dummy text of the printing and 
                typesetting industry. Lorem Ipsum has been the industry's
                 standard dummy text ever since the 1500s, when an unknown
                  printer took a galley of type and scrambled it to make 
                  a type specimen book.</p>
            </div>
            <div className="b">
                <h2 className="text-2xl font-semibold mb-2">Company</h2>
                <ul className="space-y-2">
                    <li className="cursor-pointer hover:text-gray-400 transition">Home</li>
                    <li className="cursor-pointer hover:text-gray-400 transition">About us</li>
                    <li className="cursor-pointer hover:text-gray-400 transition">Delivery</li>
                    <li className="cursor-pointer hover:text-gray-400 transition">Privacy policy</li>
                </ul>
            </div>
            <div className="space-y-3">
                <h2 className="text-2xl font-semibold">GET IN TOUCH</h2>
                <p>+1-000-000-0000</p>
                <p>greatstackdev@gmail.com</p>
                <p>Instagram</p>
            </div>
        </div>
    </div>
    <p className="text-center font-semibold mt-2">Copyright 2025@ Izzatbek Abdusharipov -
         All Right Reserved.</p>
    </center>
    
    </>
  )
}

export default Footer