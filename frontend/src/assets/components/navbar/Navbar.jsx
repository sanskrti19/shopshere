import { useState } from "react";
import { Link } from "react-router-dom";
import { FaShoppingCart, FaUser, FaBars, FaTimes } from "react-icons/fa";
import { useAuth } from "../../../context/AuthContext";

function Navbar() {
  const { isAuthenticated, logout } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [cartCount, setCartCount] = useState(2); // Dummy cart count

  return (
    <nav className="sticky top-0 z-50 bg-white shadow-md">
      <div className="mx-auto max-w-7xl px-6">
        <div className="flex items-center justify-between py-4">
          {/* Logo */}
          <Link to={isAuthenticated ? "/home" : "/"} className="text-2xl font-bold tracking-tight text-black">
            ShopSphere
          </Link>

          {/* Desktop Menu */}
          <div className="hidden items-center gap-8 lg:flex">
            {isAuthenticated ? (
              <>
                <Link to="/home" className="font-medium text-gray-700 transition hover:text-black">
                  Home
                </Link>
                <Link to="/products" className="font-medium text-gray-700 transition hover:text-black">
                  Products
                </Link>
                <Link to="/orders" className="font-medium text-gray-700 transition hover:text-black">
                  Orders
                </Link>
              </>
            ) : (
              <>
                <Link to="/" className="font-medium text-gray-700 transition hover:text-black">
                  Home
                </Link>
                <a href="#features" className="font-medium text-gray-700 transition hover:text-black">
                  Features
                </a>
              </>
            )}
          </div>

          {/* Right Side Actions */}
          <div className="flex items-center gap-4">
            {/* Search Icon */}
            <button className="hidden text-2xl text-gray-700 transition hover:text-black md:inline-block">
              🔍
            </button>

            {/* Cart Icon */}
            <Link
              to="/cart"
              className="relative text-2xl text-gray-700 transition hover:text-black"
            >
              <FaShoppingCart />
              {isAuthenticated && cartCount > 0 && (
                <span className="absolute -right-2 -top-2 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-xs font-bold text-white">
                  {cartCount}
                </span>
              )}
            </Link>

            {/* Auth Actions */}
            <div className="hidden items-center gap-4 lg:flex">
              {isAuthenticated ? (
                <>
                  <button className="flex items-center gap-2 text-gray-700 transition hover:text-black">
                    <FaUser />
                    <span className="font-medium">Profile</span>
                  </button>
                  <button
                    onClick={logout}
                    className="rounded-full border border-gray-300 bg-white px-4 py-2 font-medium text-black transition hover:bg-gray-100"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <Link
                    to="/login"
                    className="font-medium text-gray-700 transition hover:text-black"
                  >
                    Login
                  </Link>
                  <Link
                    to="/register"
                    className="rounded-full bg-black px-4 py-2 font-medium text-white transition hover:bg-gray-800"
                  >
                    Register
                  </Link>
                </>
              )}
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-2xl text-gray-700 transition hover:text-black lg:hidden"
            >
              {isMenuOpen ? <FaTimes /> : <FaBars />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="border-t border-gray-200 pb-4 lg:hidden">
            {isAuthenticated ? (
              <>
                <Link to="/home" className="block px-4 py-2 font-medium text-gray-700 transition hover:text-black">
                  Home
                </Link>
                <Link to="/products" className="block px-4 py-2 font-medium text-gray-700 transition hover:text-black">
                  Products
                </Link>
                <Link to="/orders" className="block px-4 py-2 font-medium text-gray-700 transition hover:text-black">
                  Orders
                </Link>
              </>
            ) : (
              <>
                <Link to="/" className="block px-4 py-2 font-medium text-gray-700 transition hover:text-black">
                  Home
                </Link>
                <a href="#features" className="block px-4 py-2 font-medium text-gray-700 transition hover:text-black">
                  Features
                </a>
              </>
            )}
            <div className="border-t border-gray-200 px-4 py-4">
              {isAuthenticated ? (
                <>
                  <button className="block w-full text-left font-medium text-gray-700 transition hover:text-black">
                    Profile
                  </button>
                  <button
                    onClick={logout}
                    className="mt-3 w-full rounded-full border border-gray-300 bg-white px-4 py-2 font-medium text-black transition hover:bg-gray-100"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <Link
                    to="/login"
                    className="block font-medium text-gray-700 transition hover:text-black"
                  >
                    Login
                  </Link>
                  <Link
                    to="/register"
                    className="mt-3 block w-full rounded-full bg-black py-2 text-center font-medium text-white transition hover:bg-gray-800"
                  >
                    Register
                  </Link>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
