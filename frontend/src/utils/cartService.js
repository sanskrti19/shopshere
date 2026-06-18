import httpClient from "./httpClient";

const cartService = {
  getCart: (userId) => httpClient.get(`/api/cart/${userId}`),
  addToCart: ({ userId, productId, quantity = 1 }) =>
    httpClient.post("/api/cart/add", null, {
      params: { userId, productId, quantity },
    }),
  removeFromCart: ({ userId, productId }) =>
    httpClient.delete("/api/cart/remove", {
      params: { userId, productId },
    }),
};

export default cartService;
