import httpClient from "./httpClient";

const productService = {
  getAllProducts: () => httpClient.get("/api/products"),
  getProductById: (id) => httpClient.get(`/api/products/${id}`),
};

export default productService;
