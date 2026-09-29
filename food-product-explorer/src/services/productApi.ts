import type { Product, ProductsResponse } from "../types/product";

const API_BASE_URL = "https://dummyjson.com";

/**
 * Fetch all food/grocery products
 */
export const getProducts = async (): Promise<Product[]> => {
  const response = await fetch(
    `${API_BASE_URL}/products/category/groceries`
  );

  if (!response.ok) {
    throw new Error("Failed to fetch products");
  }

  const data: ProductsResponse = await response.json();

  return data.products;
};

/**
 * Fetch a single product by ID
 */
export const getProductById = async (
  id: number
): Promise<Product> => {
  const response = await fetch(`${API_BASE_URL}/products/${id}`);

  if (!response.ok) {
    throw new Error("Failed to fetch product details");
  }

  const data: Product = await response.json();

  return data;
};

/**
 * Search food products
 */
export const searchProducts = async (
  query: string
): Promise<Product[]> => {
  const response = await fetch(
    `${API_BASE_URL}/products/search?q=${encodeURIComponent(query)}`
  );

  if (!response.ok) {
    throw new Error("Failed to search products");
  }

  const data: ProductsResponse = await response.json();

  // Keep only grocery/food products
  return data.products.filter(
    (product) => product.category === "groceries"
  );
};