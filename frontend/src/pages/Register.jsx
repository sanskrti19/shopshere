import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import AuthLayout from "../assets/components/common/AuthLayout";
import { FaUser, FaEnvelope, FaLock } from "react-icons/fa";
import authService from "../utils/authService";

function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");
    setSuccess("");

    try {
      await authService.register({ name, email, password });
      setSuccess("Account created successfully. Redirecting to login...");
      navigate("/login", { replace: true });
    } catch (err) {
      setError(err.response?.data?.message || "Registration failed. Please try again.");
    }
  };

  return (
    <AuthLayout>
      <div className="bg-white p-10 rounded-2xl shadow-xl w-[400px]">
        <h2 className="text-4xl font-bold mb-2">Create Account</h2>
        <p className="text-gray-500 mb-8">Join ShopSphere today</p>

        {error && <p className="mb-4 rounded-lg bg-red-100 px-4 py-3 text-sm text-red-700">{error}</p>}
        {success && <p className="mb-4 rounded-lg bg-green-100 px-4 py-3 text-sm text-green-700">{success}</p>}

        <form onSubmit={handleSubmit}>
          <div className="mb-5">
            <label className="block mb-2 font-medium">Name</label>
            <div className="flex items-center border rounded-lg px-3">
              <FaUser className="text-gray-400" />
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter your name"
                className="w-full p-3 outline-none"
                required
              />
            </div>
          </div>

          <div className="mb-5">
            <label className="block mb-2 font-medium">Email</label>
            <div className="flex items-center border rounded-lg px-3">
              <FaEnvelope className="text-gray-400" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="w-full p-3 outline-none"
                required
              />
            </div>
          </div>

          <div className="mb-6">
            <label className="block mb-2 font-medium">Password</label>
            <div className="flex items-center border rounded-lg px-3">
              <FaLock className="text-gray-400" />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter password"
                className="w-full p-3 outline-none"
                required
              />
            </div>
          </div>

          <button type="submit" className="w-full bg-black text-white p-3 rounded-lg hover:bg-gray-800 transition">
            Register
          </button>
        </form>

        <p className="text-center mt-6 text-gray-600">
          Already have an account?
          <Link to="/login" className="text-black font-bold ml-2">
            Login
          </Link>
        </p>
      </div>
    </AuthLayout>
  );
}

export default Register;
