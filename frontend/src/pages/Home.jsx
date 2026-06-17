import { Link } from "react-router-dom";
import Navbar from "../assets/components/navbar/Navbar";

const featuredProducts = [
  {
    name: "Smart Watch",
    description: "Track your day with style and smart alerts.",
    price: "$129",
  },
  {
    name: "Noise Cancelling Headphones",
    description: "Immersive sound for work, travel, and play.",
    price: "$179",
  },
  {
    name: "Eco Sneakers",
    description: "Comfortable, sustainable shoes for every step.",
    price: "$89",
  },
];

function Home() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <Navbar />

      <main className="mx-auto max-w-7xl px-6 py-10 lg:py-16">
        <section className="grid gap-12 lg:grid-cols-2 lg:items-center">
          <div>
            <span className="inline-flex rounded-full bg-indigo-100 px-4 py-2 text-sm font-semibold uppercase tracking-[0.24em] text-indigo-700">
              ShopSphere
            </span>

            <h1 className="mt-8 text-5xl font-bold leading-tight tracking-tight lg:text-6xl">
              Find amazing products, fast.
            </h1>

            <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-600">
              Shop smarter with a secure storefront built for modern buyers. Browse curated collections, manage your cart, and checkout faster.
            </p>

            <div className="mt-10 flex flex-col gap-4 sm:flex-row">
              <Link
                to="/login"
                className="inline-flex items-center justify-center rounded-full bg-black px-8 py-4 text-sm font-semibold text-white transition hover:bg-slate-800"
              >
                Start shopping
              </Link>

              <Link
                to="/register"
                className="inline-flex items-center justify-center rounded-full border border-slate-300 bg-white px-8 py-4 text-sm font-semibold text-slate-900 transition hover:bg-slate-100"
              >
                Create account
              </Link>
            </div>
          </div>

          <div className="rounded-[40px] bg-gradient-to-br from-indigo-600 via-slate-900 to-slate-800 p-1 shadow-2xl">
            <div className="rounded-[36px] bg-white p-8">
              <div className="flex items-center justify-between text-sm uppercase tracking-[0.24em] text-slate-500">
                <span>Featured</span>
                <span>New arrivals</span>
              </div>

              <div className="mt-8 space-y-5">
                {featuredProducts.map((product) => (
                  <div key={product.name} className="rounded-3xl border border-slate-200 p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-lg">
                    <div className="flex items-center justify-between gap-4">
                      <div>
                        <h2 className="text-xl font-semibold text-slate-900">{product.name}</h2>
                        <p className="mt-2 text-sm text-slate-600">{product.description}</p>
                      </div>
                      <span className="rounded-full bg-slate-100 px-4 py-2 text-sm font-semibold text-slate-900">
                        {product.price}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="mt-20">
          <div className="grid gap-6 md:grid-cols-3">
            <div className="rounded-3xl bg-white p-8 shadow-sm">
              <h3 className="text-xl font-semibold text-slate-900">Fast checkout</h3>
              <p className="mt-4 text-slate-600">Secure checkout flow with cart, authentication, and order tracking.</p>
            </div>
            <div className="rounded-3xl bg-white p-8 shadow-sm">
              <h3 className="text-xl font-semibold text-slate-900">Live inventory</h3>
              <p className="mt-4 text-slate-600">Browse products with real-time availability and smart filters.</p>
            </div>
            <div className="rounded-3xl bg-white p-8 shadow-sm">
              <h3 className="text-xl font-semibold text-slate-900">Responsive design</h3>
              <p className="mt-4 text-slate-600">Optimized for desktop and mobile so customers can shop anywhere.</p>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

export default Home;