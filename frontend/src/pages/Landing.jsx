import { Link } from "react-router-dom";
import { FaCheckCircle, FaTruck, FaShieldAlt, FaHeadset } from "react-icons/fa";
import { FaArrowRight } from "react-icons/fa";

function Landing() {
  return (
    <div className="min-h-screen bg-white">
      {/* Navbar */}
      <nav className="sticky top-0 z-50 bg-white shadow-md">
        <div className="mx-auto max-w-7xl px-6">
          <div className="flex items-center justify-between py-4">
            <Link to="/" className="text-2xl font-bold tracking-tight text-black">
              ShopSphere
            </Link>

            <div className="hidden items-center gap-8 lg:flex">
              <Link to="/" className="font-medium text-gray-700 transition hover:text-black">
                Home
              </Link>
              <a href="#features" className="font-medium text-gray-700 transition hover:text-black">
                Features
              </a>
              <a href="#about" className="font-medium text-gray-700 transition hover:text-black">
                About
              </a>
            </div>

            <div className="flex items-center gap-4">
              <Link to="/login" className="font-medium text-gray-700 transition hover:text-black">
                Login
              </Link>
              <Link
                to="/register"
                className="rounded-full bg-black px-4 py-2 font-medium text-white transition hover:bg-gray-800"
              >
                Register
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-r from-black via-gray-900 to-black py-20 text-white">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute right-0 top-0 h-96 w-96 rounded-full bg-blue-500 blur-3xl"></div>
        </div>

        <div className="relative mx-auto max-w-7xl px-6 py-12 text-center sm:py-16 lg:py-20">
          <span className="inline-flex rounded-full bg-blue-500/20 px-4 py-2 text-sm font-semibold text-blue-300">
            ✨ Welcome to ShopSphere
          </span>

          <h1 className="mt-8 text-5xl font-bold leading-tight tracking-tight sm:text-6xl lg:text-7xl">
            Smart Shopping, Better Deals
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-gray-300 sm:text-xl">
            Discover thousands of premium products curated just for you. Fast shipping, secure checkout, and 100% satisfaction guaranteed.
          </p>

          <div className="mt-10 flex flex-col justify-center gap-4 sm:flex-row">
            <Link
              to="/register"
              className="inline-flex items-center justify-center gap-2 rounded-lg bg-white px-8 py-4 text-center font-semibold text-black transition hover:bg-gray-100"
            >
              Get Started
              <FaArrowRight className="text-lg" />
            </Link>

            <Link
              to="/login"
              className="inline-flex items-center justify-center gap-2 rounded-lg border border-gray-300 bg-transparent px-8 py-4 font-semibold text-white transition hover:bg-gray-900"
            >
              Already a Member
            </Link>
          </div>

          <p className="mt-8 text-sm text-gray-400">✅ Free shipping on orders above ₹5000 • Secure payments • 30-day returns</p>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="bg-gray-50 py-16">
        <div className="mx-auto max-w-7xl px-6">
          <div className="mb-12 text-center">
            <h2 className="text-4xl font-bold text-gray-900">Why Choose ShopSphere?</h2>
            <p className="mt-4 text-gray-600">Everything you need for a seamless shopping experience</p>
          </div>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
            {[
              {
                icon: <FaCheckCircle className="text-3xl text-blue-600" />,
                title: "Curated Selection",
                description: "Handpicked products across all categories",
              },
              {
                icon: <FaTruck className="text-3xl text-green-600" />,
                title: "Fast Delivery",
                description: "Same-day and next-day delivery available",
              },
              {
                icon: <FaShieldAlt className="text-3xl text-red-600" />,
                title: "Secure Payment",
                description: "100% safe transactions with encryption",
              },
              {
                icon: <FaHeadset className="text-3xl text-purple-600" />,
                title: "24/7 Support",
                description: "Dedicated customer service team always ready",
              },
            ].map((feature, idx) => (
              <div key={idx} className="rounded-xl bg-white p-8 text-center shadow-sm transition hover:shadow-lg">
                <div className="mb-4 flex justify-center">{feature.icon}</div>
                <h3 className="font-semibold text-gray-900">{feature.title}</h3>
                <p className="mt-2 text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-black py-16 text-white">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { number: "10K+", label: "Products" },
              { number: "50K+", label: "Happy Customers" },
              { number: "100%", label: "Satisfaction" },
              { number: "24/7", label: "Support" },
            ].map((stat, idx) => (
              <div key={idx} className="text-center">
                <div className="text-4xl font-bold text-blue-400">{stat.number}</div>
                <div className="mt-2 text-gray-400">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-white py-16">
        <div className="mx-auto max-w-7xl px-6 text-center">
          <h2 className="text-4xl font-bold text-gray-900">Ready to Start Shopping?</h2>
          <p className="mt-4 text-gray-600">Join thousands of satisfied customers shopping on ShopSphere</p>

          <div className="mt-10 flex flex-col justify-center gap-4 sm:flex-row">
            <Link
              to="/register"
              className="inline-flex items-center justify-center rounded-lg bg-black px-8 py-3 font-semibold text-white transition hover:bg-gray-800"
            >
              Create Account
            </Link>
            <Link
              to="/login"
              className="inline-flex items-center justify-center rounded-lg border border-gray-300 px-8 py-3 font-semibold text-black transition hover:bg-gray-50"
            >
              Sign In
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-100">
        <div className="mx-auto max-w-7xl px-6 py-12 text-center">
          <h2 className="text-2xl font-bold text-white">ShopSphere</h2>
          <p className="mt-2 text-gray-400">Your one-stop destination for premium products</p>

          <div className="mt-6 flex justify-center gap-6 text-sm text-gray-400">
            <a href="#" className="transition hover:text-white">
              Privacy Policy
            </a>
            <a href="#" className="transition hover:text-white">
              Terms of Service
            </a>
            <a href="#" className="transition hover:text-white">
              Contact Us
            </a>
          </div>

          <div className="mt-8 border-t border-gray-800 pt-8">
            <p>&copy; 2024 ShopSphere. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default Landing;
