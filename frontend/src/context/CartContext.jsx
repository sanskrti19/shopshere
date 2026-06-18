import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import cartService from "../utils/cartService";
import { useAuth } from "./AuthContext";

const CartContext = createContext(null);

export function CartProvider({ children }) {
  const { userId, token, isAuthenticated } = useAuth();
  const [cartCount, setCartCount] = useState(0);
  const [cartLoading, setCartLoading] = useState(false);

  const refreshCart = useCallback(async () => {
    if (!isAuthenticated || !userId) {
      setCartCount(0);
      return;
    }

    setCartLoading(true);
    try {
      const response = await cartService.getCart(userId);
      const count = response.data.products?.reduce((sum, item) => sum + item.quantity, 0) ?? 0;
      setCartCount(count);
    } catch (err) {
      console.error("Failed to refresh cart", err);
      setCartCount(0);
    } finally {
      setCartLoading(false);
    }
  }, [isAuthenticated, userId]);

  useEffect(() => {
    refreshCart();
  }, [refreshCart, token]);

  const value = useMemo(
    () => ({ cartCount, cartLoading, refreshCart }),
    [cartCount, cartLoading, refreshCart]
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) {
    throw new Error("useCart must be used within CartProvider");
  }
  return ctx;
}
