import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import AuthLayout from "../assets/components/common/AuthLayout";
import { FaEnvelope, FaLock } from "react-icons/fa";
import authService from "../utils/authService";
import { useAuth } from "../context/AuthContext";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");

    try {
      const response = await authService.login({ email, password });
      const token = response.data.token;
      login(token);
      navigate("/home", { replace: true });
    } catch (err) {
      setError(err.response?.data?.message || "Login failed. Please check your credentials.");
    }
  };

  return (
    <AuthLayout>
      <div className="bg-white p-10 rounded-2xl shadow-xl w-[400px]">
        <h2 className="text-4xl font-bold mb-2">Welcome Back</h2>
        <p className="text-gray-500 mb-8">Login to continue shopping</p>

        {error && <p className="mb-4 rounded-lg bg-red-100 px-4 py-3 text-sm text-red-700">{error}</p>}

        <form onSubmit={handleSubmit}>
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
            Login
          </button>
        </form>

        <p className="text-center mt-6 text-gray-600">
          Don't have an account?
          <Link to="/register" className="text-black font-bold ml-2">
            Register
          </Link>
        </p>
      </div>
    </AuthLayout>
  );
}

export default Login;
