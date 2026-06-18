import { useEffect, useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import { FaStar, FaArrowLeft } from "react-icons/fa";
import Navbar from "../assets/components/navbar/Navbar";
import Footer from "../components/Footer";
import productService from "../utils/productService";
import cartService from "../utils/cartService";
import { useAuth } from "../context/AuthContext";
import { useCart } from "../context/CartContext";

function ProductDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const { refreshCart } = useCart();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [adding, setAdding] = useState(false);

  useEffect(() => {
    const loadProduct = async () => {
      setLoading(true);
      setError("");

      try {
        const response = await productService.getProductById(id);
        setProduct(response.data);
      } catch (err) {
        console.error(err);
        setError("Unable to load product details.");
      } finally {
        setLoading(false);
      }
    };

    loadProduct();
  }, [id]);

  const handleAddToCart = async () => {
    if (!isAuthenticated) {
      navigate("/login");
      return;
    }

    const userId = localStorage.getItem("userId");
    if (!userId) {
      alert("Your session expired. Please login again.");
      return;
    }

    setAdding(true);
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
      setAdding(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <main className="mx-auto max-w-7xl px-6 py-12">
        <div className="mb-6 flex items-center gap-3 text-sm text-gray-600">
          <Link to="/products" className="font-medium text-black hover:underline">
            <FaArrowLeft className="mr-2 inline-block" /> Back to products
          </Link>
        </div>

        {loading ? (
          <div className="rounded-3xl bg-white p-12 shadow-md">
            <p className="text-center text-gray-600">Loading product details...</p>
          </div>
        ) : error ? (
          <div className="rounded-3xl bg-white p-12 shadow-md">
            <p className="text-center text-red-600">{error}</p>
          </div>
        ) : product ? (
          <div className="grid gap-10 lg:grid-cols-2">
            <div className="rounded-3xl bg-white p-8 shadow-md">
              <img
                src={product.imageUrl || "/placeholder.png"}
                alt={product.name}
                className="h-full w-full rounded-3xl object-cover"
              />
            </div>

            <div className="space-y-6">
              <div className="rounded-3xl bg-white p-8 shadow-md">
                <div className="flex flex-col gap-4">
                  <div>
                    <p className="text-sm font-semibold uppercase tracking-[0.2em] text-gray-500">
                      {product.category || "Category"}
                    </p>
                    <h1 className="mt-3 text-4xl font-bold text-gray-900">{product.name}</h1>
                    <p className="mt-2 text-sm text-gray-600">{product.brand || "Brand unavailable"}</p>
                  </div>

                  <div className="flex flex-wrap items-center gap-4">
                    <div className="flex items-center gap-1 text-yellow-400">
                      {[...Array(5)].map((_, index) => (
                        <FaStar
                          key={index}
                          className={index < Math.round(Number(product.rating || 0)) ? "" : "opacity-30"}
                        />
                      ))}
                    </div>
                    <span className="text-sm text-gray-600">
                      {product.rating ? Number(product.rating).toFixed(1) : "New"}
                    </span>
                  </div>

                  <div className="text-3xl font-bold text-black">₹{Number(product.price || 0).toLocaleString()}</div>

                  <div className="rounded-3xl border border-gray-200 bg-gray-50 p-4">
                    <p className="text-sm text-gray-600">{product.description}</p>
                  </div>

                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="rounded-3xl border border-gray-200 bg-white p-4">
                      <p className="text-sm text-gray-500">Stock</p>
                      <p className="mt-2 font-semibold text-gray-900">
                        {product.stock > 0 ? `${product.stock} available` : "Out of stock"}
                      </p>
                    </div>
                    <div className="rounded-3xl border border-gray-200 bg-white p-4">
                      <p className="text-sm text-gray-500">Brand</p>
                      <p className="mt-2 font-semibold text-gray-900">{product.brand || "Unknown"}</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="rounded-3xl bg-white p-8 shadow-md">
                <button
                  type="button"
                  onClick={handleAddToCart}
                  disabled={adding || product.stock === 0}
                  className="w-full rounded-3xl bg-black px-6 py-4 text-lg font-semibold text-white transition hover:bg-gray-900 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {adding ? "Adding..." : product.stock === 0 ? "Out of Stock" : "Add to Cart"}
                </button>
              </div>
            </div>
          </div>
        ) : (
          <div className="rounded-3xl bg-white p-12 shadow-md">
            <p className="text-center text-gray-600">Product not found.</p>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}

export default ProductDetails;
 