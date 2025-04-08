import Footer from "../components/Footer"
import Navbar from "../components/Navbar"

const About = () => {
  return (
    <>
    <Navbar/>
    <div className="container mx-auto px-4 py-8">
        <h1 className="text-center mt-18 text-3xl font-semibold uppercase mb-6">About Us</h1>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 p-6 mx-12">
            <img src="./about_img.png" alt="about" className="w-[500px] rounded" />
            <div className="a">
                <p>Forever was born out of a passion for innovation and a desire to revolutionize the way people shop online. Our journey began with a simple idea: to provide a platform where customers can easily discover,
                 explore, and purchase a wide range of products from the comfort of their homes.</p> <br />
                 <p>Since our inception, we've worked tirelessly to curate a diverse selection of high-quality products that cater to every taste and preference. From fashion and beauty to electronics and home essentials,
                     we offer an extensive collection sourced from trusted brands and suppliers.</p> <br />
                     <h2 className="font-bold">Our Mission</h2> <br />
                     <p>Our mission at Forever is to empower customers with choice, convenience, and confidence. We're dedicated to providing a seamless shopping experience that exceeds expectations,
                         from browsing and ordering to delivery and beyond.</p>
            </div>     
        </div>
        <div className="">
        <h1 className="text-2xl font-semibold uppercase text-center">Why choose us</h1>
        <div className="cards grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-6 mx-12 text-center">
        <div className="card-1 border-2 border-gray-200 p-4">
            <h2 className="font-bold p-3">Quality Assurance:</h2>
            <p className="text-sm p-3">We meticulously select and vet each product to ensure it meets our stringent quality standards.</p>
        </div>
        {/* 2 */}
        <div className="card-1 border-2 border-gray-200 p-4">
            <h2 className="font-bold p-3">Convenience:</h2>
            <p className="text-sm p-3">With our user-friendly interface and hassle-free ordering process, shopping has never been easier.</p>
        </div>
        {/* 3 */}
        <div className="card-1 border-2 border-gray-200 p-4">
            <h2 className="font-bold p-3">Exceptional Customer Service:</h2>
            <p className="text-sm p-3">Our team of dedicated professionals is here to assist you the way, ensuring your satisfaction is our top priority.</p>
        </div>
        </div>            
        </div>
    </div>
    <div className="text-center">
                <h1 className="text-2xl font-bold mb-1.5">Subscribe now & get 20% off</h1>
                <p className="text-gray-400">Lorem Ipsum is simply dummy text of the printing and typesetting industry.</p>
              </div>
    <div className="container mx-auto px-4 py-8">
                  <div className="flex items-center justify-center">
                    <input type="email" placeholder="Enter your email" className=" outline-none border border-gray-300 px-4 py-2 w-1/2" />
                    <button className="bg-black text-white px-4 py-2">Subscribe</button>
                  </div>
                </div>  
    <Footer/>
    </>
  )
}

export default About