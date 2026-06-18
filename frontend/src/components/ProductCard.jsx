import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaShoppingCart, FaStar, FaEye } from "react-icons/fa";
import { useAuth } from "../context/AuthContext";
import { useCart } from "../context/CartContext";
import cartService from "../utils/cartService";

function ProductCard({ product }) {
  const [isHovered, setIsHovered] = useState(false);
  const [isAdding, setIsAdding] = useState(false);
  const { isAuthenticated } = useAuth();
  const { refreshCart } = useCart();
  const navigate = useNavigate();
  const rating = Number(product.rating) || 0;

  const handleAddToCart = async () => {
    if (!isAuthenticated) {
      navigate("/login");
      return;
    }

    const userId = localStorage.getItem("userId");
    if (!userId) {
      alert("Unable to add product to cart. Please login again.");
      return;
    }

    setIsAdding(true);
    try {
      await cartService.addToCart({
        userId,
        productId: product.id,
        quantity: 1,
      });
      await refreshCart();
      alert("Product added to cart.");
    } catch (err) {
      console.error(err);
      alert("Failed to add product to cart. Please try again.");
    } finally {
      setIsAdding(false);
    }
  };

  return (
    <div
      className="group relative rounded-2xl bg-white shadow-md transition hover:shadow-xl"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Product Image */}
      <div className="relative h-48 overflow-hidden rounded-t-2xl bg-gray-100">
        {product.imageUrl ? (
          <img
            src={product.imageUrl}
            alt={product.name}
            className="h-full w-full object-cover"
          />
        ) : (
          <div className="flex h-full items-center justify-center text-6xl text-gray-300">
            <FaShoppingCart />
          </div>
        )}

        <span className="absolute left-4 top-4 rounded-full bg-black px-3 py-1 text-xs font-semibold text-white">
          {product.category || "Product"}
        </span>

        {product.discount && (
          <span className="absolute right-4 top-4 rounded-full bg-red-500 px-3 py-1 text-xs font-semibold text-white">
            -{product.discount}%
          </span>
        )}

        {isHovered && (
          <div className="absolute inset-0 flex items-center justify-center gap-3 bg-black/50 backdrop-blur-sm">
            <button
              onClick={handleAddToCart}
              disabled={isAdding}
              className="inline-flex items-center gap-2 rounded-lg bg-white px-4 py-2 font-semibold text-black transition hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-60"
            >
              <FaShoppingCart />
              {isAdding ? "Adding..." : "Add"}
            </button>
            <Link
              to={`/products/${product.id}`}
              className="inline-flex items-center gap-2 rounded-lg bg-black px-4 py-2 font-semibold text-white transition hover:bg-gray-800"
            >
              <FaEye />
              View
            </Link>
          </div>
        )}
      </div>

      <div className="p-5">
        <h3 className="font-semibold text-gray-900 line-clamp-2">{product.name}</h3>
        <p className="mt-2 text-sm text-gray-500">{product.brand || "Brand unavailable"}</p>

        <div className="mt-3 flex items-center gap-2">
          <div className="flex text-yellow-400">
            {[...Array(5)].map((_, i) => (
              <FaStar key={i} className={i < Math.round(rating) ? "" : "opacity-30"} />
            ))}
          </div>
          <span className="text-sm text-gray-600">{rating ? rating.toFixed(1) : "New"}</span>
        </div>

        <div className="mt-4 flex items-end gap-2">
          <span className="text-2xl font-bold text-black">₹{Number(product.price || 0).toLocaleString()}</span>
          {product.originalPrice && (
            <span className="line-through text-gray-500">₹{Number(product.originalPrice).toLocaleString()}</span>
          )}
        </div>

        <div className="mt-5 flex gap-2">
          <button
            type="button"
            onClick={handleAddToCart}
            disabled={isAdding}
            className="flex-1 rounded-lg bg-black py-2 font-semibold text-white transition hover:bg-gray-800 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isAdding ? "Adding..." : "Add to Cart"}
          </button>
          <Link
            to={`/products/${product.id}`}
            className="flex-1 rounded-lg border border-gray-300 py-2 text-center font-semibold text-gray-900 transition hover:bg-gray-50"
          >
            Details
          </Link>
        </div>
      </div>
    </div>
  );
}

export default ProductCard;
