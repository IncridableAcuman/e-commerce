import Footer from "../components/Footer"
import Navbar from "../components/Navbar"

const Contact = () => {
  return (
    <>
    <Navbar/>
    <div className="flex flex-col items-center justify-center min-h-screen px-4">
        <h1 className="text-4xl font-bold text-center">Contact Us</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mt-10">
            <img src="./contact_img.png" alt="contact" className="w-full max-w-[500px] mx-auto" />
            <div className="space-y-5">
                <h2 className="text-xl font-semibold mb-3">Our store</h2>
                <span>54709 Willms Station</span>
                <p>Suite 350, Washington, USA</p>
                <p>Tel: (415) 555-0132</p>
                <p>Email: admin@forever.com</p>
                <h2 className="text-xl font-semibold">Careers at Forever</h2>
                <p>Learn more about our teams and job openings.</p>
                <button className="border px-5 py-2.5 cursor-pointer hover:bg-black hover:text-white transition duration-300">Explore Job</button>
            </div>
        </div>
    </div>

    {/* Subscribe section */}
    <div className="text-center mt-10">
        <h1 className="text-2xl font-bold mb-1.5">Subscribe now & get 20% off</h1>
        <p className="text-gray-400">Lorem Ipsum is simply dummy text of the printing and typesetting industry.</p>
    </div>

    {/* Email input and subscribe button */}
    <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row items-center justify-center space-y-4 md:space-y-0">
            <input 
                type="email" 
                placeholder="Enter your email" 
                className="outline-none border border-gray-300 px-4 py-2 w-full md:w-1/2" 
            />
            <button className="bg-black text-white px-4 py-2 mt-4 md:mt-0 md:ml-4 w-full md:w-auto">Subscribe</button>
        </div>
    </div>
    <Footer/>
    </>
  )
}

export default Contact
