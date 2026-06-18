import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaTrashAlt } from "react-icons/fa";
import Navbar from "../assets/components/navbar/Navbar";
import Footer from "../components/Footer";
import { useAuth } from "../context/AuthContext";
import { useCart } from "../context/CartContext";
import cartService from "../utils/cartService";

function Cart() {
  const { userId } = useAuth();
  const { refreshCart } = useCart();
  const navigate = useNavigate();
  const [cart, setCart] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [removingId, setRemovingId] = useState("");

  const loadCart = async () => {
    if (!userId) {
      setError("You must be logged in to view your cart.");
      setLoading(false);
      return;
    }

    setLoading(true);
    setError("");

    try {
      const response = await cartService.getCart(userId);
      setCart(response.data);
    } catch (err) {
      console.error(err);
      setError("Failed to load cart. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadCart();
  }, [userId]);

  const handleRemoveItem = async (productId) => {
    if (!userId) {
      navigate("/login");
      return;
    }

    setRemovingId(productId);
    try {
      await cartService.removeFromCart({ userId, productId });
      await refreshCart();
      await loadCart();
    } catch (err) {
      console.error(err);
      alert("Failed to remove item. Please try again.");
    } finally {
      setRemovingId("");
    }
  };

  const productCount = cart?.products?.reduce((sum, item) => sum + item.quantity, 0) || 0;
  const grandTotal =
  cart?.totalPrice ??
  (cart?.products?.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  ) || 0);

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <main className="mx-auto max-w-7xl px-6 py-12">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold text-gray-900">Your Cart</h1>
            <p className="mt-2 text-gray-600">Review items and update your order before checkout.</p>
          </div>
          <Link
            to="/products"
            className="rounded-full border border-black px-5 py-3 text-sm font-semibold text-black transition hover:bg-black hover:text-white"
          >
            Continue Shopping
          </Link>
        </div>

        {loading ? (
          <div className="rounded-3xl bg-white p-12 shadow-md">
            <p className="text-center text-gray-600">Loading your cart...</p>
          </div>
        ) : error ? (
          <div className="rounded-3xl bg-white p-12 shadow-md">
            <p className="text-center text-red-600">{error}</p>
          </div>
        ) : !cart || productCount === 0 ? (
          <div className="rounded-3xl bg-white p-12 shadow-md text-center">
            <p className="text-xl font-semibold text-gray-900">Your cart is empty.</p>
            <p className="mt-3 text-gray-600">Add products from the store to see them here.</p>
            <Link
              to="/products"
              className="mt-6 inline-flex rounded-full bg-black px-6 py-3 text-white transition hover:bg-gray-900"
            >
              Browse Products
            </Link>
          </div>
        ) : (
          <div className="grid gap-8 lg:grid-cols-3">
            <section className="lg:col-span-2 space-y-6">
              {cart.products.map((item) => (
                <div key={item.productId} className="rounded-3xl bg-white p-6 shadow-md">
                  <div className="flex flex-col gap-6 sm:flex-row sm:items-center">
                    <div className="h-28 w-28 overflow-hidden rounded-3xl bg-gray-100">
                      <img
                        src={item.imageUrl || "/placeholder.png"}
                        alt={item.name}
                        className="h-full w-full object-cover"
                      />
                    </div>
                    <div className="flex-1">
                      <h2 className="text-xl font-semibold text-gray-900">{item.name}</h2>
                      <p className="mt-2 text-sm text-gray-600">Qty: {item.quantity}</p>
                      <p className="mt-2 text-lg font-semibold text-black">₹{(item.price * item.quantity).toLocaleString()}</p>
                    </div>
                    <button
                      type="button"
                      onClick={() => handleRemoveItem(item.productId)}
                      disabled={removingId === item.productId}
                      className="inline-flex items-center gap-2 rounded-full border border-red-300 bg-red-50 px-4 py-2 text-sm font-semibold text-red-700 transition hover:bg-red-100 disabled:cursor-not-allowed disabled:opacity-60"
                    >
                      <FaTrashAlt />
                      {removingId === item.productId ? "Removing..." : "Remove"}
                    </button>
                  </div>
                </div>
              ))}
            </section>

            <aside className="rounded-3xl bg-white p-8 shadow-md">
              <p className="text-sm uppercase tracking-[0.2em] text-gray-500">Order Summary</p>
              <div className="mt-6 space-y-4">
                <div className="flex items-center justify-between text-gray-600">
                  <span>Items</span>
                  <span>{productCount}</span>
                </div>
                <div className="flex items-center justify-between border-t border-gray-200 pt-4 text-gray-600">
                  <span>Subtotal</span>
                  <span>₹{grandTotal.toLocaleString()}</span>
                </div>
              </div>
              <button
                type="button"
                onClick={() => navigate("/checkout")}
                className="mt-8 w-full rounded-3xl bg-black px-6 py-4 text-lg font-semibold text-white transition hover:bg-gray-900"
              >
                Proceed to Checkout
              </button>
            </aside>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}

export default Cart;
 