import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ProductCard from "./ProductCard";
import productService from "../utils/productService";

function ProductGrid({ title }) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let isMounted = true;

    const loadProducts = async () => {
      setLoading(true);
      setError("");

      try {
        const response = await productService.getAllProducts();
        if (isMounted) {
          setProducts(response.data || []);
        }
      } catch (err) {
        if (isMounted) {
          setError("Unable to load products. Please try again later.");
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    loadProducts();

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <section className="bg-white py-16">
      <div className="mx-auto max-w-7xl px-6">
        {title && (
          <div className="mb-12">
            <h2 className="text-4xl font-bold text-gray-900">{title}</h2>
            <p className="mt-4 text-gray-600">Handpicked products just for you</p>
          </div>
        )}

        {loading ? (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {Array.from({ length: 4 }).map((_, index) => (
              <div key={index} className="h-96 rounded-2xl bg-gray-100 animate-pulse" />
            ))}
          </div>
        ) : error ? (
          <p className="text-center text-red-600">{error}</p>
        ) : products.length === 0 ? (
          <p className="text-center text-gray-600">No products available.</p>
        ) : (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}

        <div className="mt-12 text-center">
          <Link
            to="/products"
            className="inline-flex rounded-lg border border-black px-8 py-3 font-semibold text-black transition hover:bg-black hover:text-white"
          >
            View All Products
          </Link>
        </div>
      </div>
    </section>
  );
}

export default ProductGrid;
