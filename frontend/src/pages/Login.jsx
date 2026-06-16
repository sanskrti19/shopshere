import Navbar from "../assets/components/navbar/Navbar.jsx";

import AuthLayout from "../assets/components/common/AuthLayout";
import { FaEnvelope, FaLock } from "react-icons/fa";
import { Link } from "react-router-dom";

function Login() {
  return (
    <AuthLayout>

      <div className="bg-white p-10 rounded-2xl shadow-xl w-[400px]">

        <h2 className="text-4xl font-bold mb-2">
          Welcome Back 
        </h2>

  
        <p className="text-gray-500 mb-8">
          Login to continue shopping
        </p>

        {/* EMAIL */}
        <div className="mb-5">

          <label className="block mb-2 font-medium">
            Email
          </label>

          <div className="flex items-center border rounded-lg px-3">

            <FaEnvelope className="text-gray-400" />

            <input
              type="email"
              placeholder="Enter your email"
              className="w-full p-3 outline-none"
            />
          </div>

        </div>
 
        <div className="mb-6">

          <label className="block mb-2 font-medium">
            Password
          </label>

          <div className="flex items-center border rounded-lg px-3">

            <FaLock className="text-gray-400" />

            <input
              type="password"
              placeholder="Enter password"
              className="w-full p-3 outline-none"
            />
          </div>

        </div>

        {/* BUTTON */}
        <button
          className="
            w-full
            bg-black
            text-white
            p-3
            rounded-lg
            hover:bg-gray-800
            transition
          "
        >
          Login
        </button>

        {/* REGISTER */}
        <p className="text-center mt-6 text-gray-600">

          Don't have an account?

          <Link
            to="/register"
            className="text-black font-bold ml-2"
          >
            Register
          </Link>

        </p>

      </div>

    </AuthLayout>
  );
}

export default Login;