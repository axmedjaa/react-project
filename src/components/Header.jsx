import { useState } from "react";
import { Link, NavLink } from "react-router";
import { CiMenuBurger } from "react-icons/ci";
import { IoIosClose } from "react-icons/io";
import { useAuth } from "../context/Context";
const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDropDownOpen, setIsDropDownOpen] = useState(false);
  const { isLoggedIn, profile, logout,isAdmin } = useAuth();
  return (
    <div className="max-h-screen h-full px-4 py-2 bg-gradient-to-r from-white to-gray-100">
      <div className="max-w-7xl w-full mx-auto bg-gradient-to-r from-amber-900 via-red-800 to-orange-700 flex justify-between items-center p-4 rounded-lg shadow-sm text-white">
        <h1 className="">soomow</h1>
        <nav className="hidden sm:flex ">
          <NavLink className="px-4 py-2 capitalize" to="/">
            home
          </NavLink>
          <NavLink className="px-4 py-2 capitalize" to="/products">
            product
          </NavLink>
          <NavLink className="px-4 py-2 capitalize" to="/about">
            about
          </NavLink>
          <NavLink className="px-4 py-2 capitalize" to="/contact">
            contact
          </NavLink>
        </nav>
        <div className="flex">
          {!isLoggedIn && (
            <div className="space-x-2">
              <NavLink
                className="inline-flex items-center justify-center text-white rounded-lg bg-amber-600 px-4 py-2"
                to="/signin"
              >
                signin
              </NavLink>
              <NavLink
                className="hidden sm:inline-flex items-center justify-center text-white rounded-lg bg-amber-600 px-4 py-2"
                to="/signup"
              >
                signup
              </NavLink>
            </div>
          )}
          {isLoggedIn && (
            <div className="relative flex items-center gap-2 px-2 mt-2">
              <span className="hidden sm:block">{profile?.username}</span>

              <button
                className="w-10 h-10 flex items-center justify-center rounded-full bg-gradient-to-r from-yellow-500 to-red-500 text-white font-semibold shadow-md uppercase"
                onMouseEnter={() => setIsDropDownOpen(true)}
                onClick={() => setIsDropDownOpen(!isDropDownOpen)}
              >
                {profile?.username?.charAt(0) || "?"}
              </button>

              {isDropDownOpen && (
                <div
                  className="absolute top-full right-0 mt-2 w-40 bg-white text-black rounded-lg shadow-lg z-50 py-2"
                  onMouseLeave={() => setIsDropDownOpen(false)}
                >
                 {!isAdmin&& <Link
                    to="/added"
                    className="block px-4 py-2 hover:bg-gray-100 transition duration-150"
                  >
                    Add
                  </Link>}
                  {isAdmin && (
                    <Link className="px-4 py-2 capitalize" to="/dashboard">
                      Admin Dashboard
                    </Link>
                  )}
                  <button
                    onClick={()=>{
                      logout()
                      setIsDropDownOpen(false)
                    }}
                    className="block w-full text-left px-4 py-2 hover:bg-gray-100 transition duration-150"
                  >
                    Log out
                  </button>
                </div>
              )}
            </div>
          )}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="sm:hidden text-3xl"
          >
            {isMenuOpen ? <IoIosClose /> : <CiMenuBurger />}
          </button>
        </div>
      </div>
      {isMenuOpen && (
        <nav className="sm:hidden bg-red-800 text-white flex flex-col text-center py-4 space-y-3">
          <NavLink className="px-4 py-2 capitalize" to="/">
            home
          </NavLink>
          <NavLink className="px-4 py-2 capitalize" to="/about">
            about
          </NavLink>
          <NavLink className="px-4 py-2 capitalize" to="/contact">
            contact
          </NavLink>
          {isLoggedIn && (
            <>
              <NavLink className="px-4 py-2 capitalize" to="/products">
                product
              </NavLink>
              <button className="bg-amber-600 text-white px-4 py-2 rounded-lg w-full">
                log out
              </button>
            </>
          )}
          {!isLoggedIn && (
            <>
              <NavLink
                className="block text-lg font-semibold bg-white text-red-800 px-6 py-2 rounded-full shadow-md transition duration-300 hover:bg-gray-200"
                to="/signin"
              >
                Sign In
              </NavLink>
              <NavLink
                className="block text-lg font-semibold bg-amber-600 text-white px-6 py-2 rounded-full shadow-md transition duration-300 hover:bg-amber-700"
                to="signup"
              >
                Sign Up
              </NavLink>
            </>
          )}
        </nav>
      )}
    </div>
  );
};

export default Header;
