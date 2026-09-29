import { useCallback, useEffect, useState } from "react";
import {
  getProducts,
  searchProducts,
} from "../services/productApi";
import type { Product } from "../types/product";

interface UseProductsReturn {
  products: Product[];
  loading: boolean;
  error: string | null;
  search: (query: string) => Promise<void>;
  refetch: () => Promise<void>;
}

export const useProducts = (): UseProductsReturn => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchProducts = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const data = await getProducts();

      setProducts(data);
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Something went wrong"
      );
    } finally {
      setLoading(false);
    }
  }, []);

  const search = useCallback(async (query: string) => {
    if (!query.trim()) {
      await fetchProducts();
      return;
    }

    try {
      setLoading(true);
      setError(null);

      const data = await searchProducts(query);

      setProducts(data);
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Something went wrong"
      );
    } finally {
      setLoading(false);
    }
  }, [fetchProducts]);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  return {
    products,
    loading,
    error,
    search,
    refetch: fetchProducts,
  };
};