import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

function Navbar() {
  const { isAuthenticated, logout } = useAuth();

  return (
    <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-6 lg:px-8">
      <Link to="/" className="text-2xl font-bold tracking-tight text-slate-900">
        ShopSphere
      </Link>

      <div className="flex items-center gap-4 text-sm font-medium text-slate-600">
        <Link to="/" className="hover:text-slate-900 transition">
          Home
        </Link>
        <Link to="/products" className="hover:text-slate-900 transition">
          Products
        </Link>
        {isAuthenticated ? (
          <>
            <Link to="/cart" className="hover:text-slate-900 transition">
              Cart
            </Link>
            <Link to="/orders" className="hover:text-slate-900 transition">
              Orders
            </Link>
            <button
              type="button"
              onClick={logout}
              className="rounded-full border border-slate-300 bg-white px-4 py-2 text-slate-900 transition hover:bg-slate-100"
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/login" className="hover:text-slate-900 transition">
              Login
            </Link>
            <Link
              to="/register"
              className="rounded-full border border-slate-300 bg-white px-4 py-2 text-slate-900 transition hover:bg-slate-100"
            >
              Register
            </Link>
          </>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
