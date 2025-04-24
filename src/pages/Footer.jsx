import { FaFacebook, FaInstagram, FaTwitter } from "react-icons/fa"
import { Link } from "react-router"

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-8">
       <div className="max-w-7xl mx-auto px-4">
       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {/* contact */}
       <div className="flex flex-col">
        <h2 text-lg font-semibold mb-4>compony</h2>
        <Link className="hover:underline text-gray-500" to="/about">about</Link>
        <Link className="hover:underline text-gray-500" to="/contact">contact</Link>
       </div>
       {/* link */}
       <div className="flex flex-col">
          <h3>links</h3>
          <Link className="hover:underline text-gray-500" to="/products">menu</Link>
          <Link className="hover:underline text-gray-500" to="/products">order noe</Link>
        </div>
        {/* social */}
        <div>
        <h3 className="text-lg font-semibold mb-4">Follow Us</h3>
        <div className="flex gap-2">
        <FaTwitter/>
        <FaFacebook/>
        <FaInstagram/>
        </div>
        </div>
        {/* join us */}
        <div>
          <h3>join us</h3>
          <Link className="text-green-500" to="signin">signin</Link>
        </div>
        </div>
        <p className="mt-8 text-center text-base text-gray-400">
          &copy;{new Date().getFullYear()} Blogify. All rights reserved.
        </p>
        </div>
    </footer>
  )
}

export default Footer