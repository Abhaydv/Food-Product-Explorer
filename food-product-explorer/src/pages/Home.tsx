import { useMemo, useState } from "react";

import { useProducts } from "../hooks/useProducts";
import ProductGrid from "../components/ProductGrid";
import SearchBar from "../components/SearchBar";
import FilterBar from "../components/FilterBar";
import Loading from "../components/Loading";
import ErrorMessage from "../components/ErrorMessage";
import EmptyState from "../components/EmptyState";
import Navbar from "../components/Navbar";

import type { ProductFilters } from "../types/product";

function Home() {
  const { products, loading, error, refetch } = useProducts();

  const [filters, setFilters] = useState<ProductFilters>({
    query: "",
    category: "all",
    minRating: 0,
  });

  const categories = useMemo(() => {
    return Array.from(
      new Set(products.map((product) => product.category))
    );
  }, [products]);

  const filteredProducts = useMemo(() => {
    const query = filters.query.trim().toLowerCase();

    return products.filter((product) => {
      const matchesSearch =
        !query ||
        product.title.toLowerCase().includes(query) ||
        product.description.toLowerCase().includes(query) ||
        product.category.toLowerCase().includes(query) ||
        product.brand?.toLowerCase().includes(query);

      const matchesCategory =
        filters.category === "all" ||
        product.category === filters.category;

      const matchesRating =
        product.rating >= filters.minRating;

      return (
        matchesSearch &&
        matchesCategory &&
        matchesRating
      );
    });
  }, [products, filters]);

  const handleSearchChange = (query: string) => {
    setFilters((previous) => ({
      ...previous,
      query,
    }));
  };

  const handleCategoryChange = (category: string) => {
    setFilters((previous) => ({
      ...previous,
      category,
    }));
  };

  const handleRatingChange = (minRating: number) => {
    setFilters((previous) => ({
      ...previous,
      minRating,
    }));
  };

  const clearFilters = () => {
    setFilters({
      query: "",
      category: "all",
      minRating: 0,
    });
  };

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return (
      <ErrorMessage
        message={error}
        onRetry={refetch}
      />
    );
  }

  return (
    <>
      <Navbar />

      <main>
        {/* Hero Section */}
        <header>
          <h1>Food Product Explorer</h1>

          <p>
            Explore our food and grocery products
          </p>
        </header>

        {/* Search */}
        <SearchBar
          value={filters.query}
          onChange={handleSearchChange}
        />

        {/* Filters */}
        <FilterBar
          filters={filters}
          categories={categories}
          onCategoryChange={handleCategoryChange}
          onRatingChange={handleRatingChange}
          onClear={clearFilters}
        />

        {/* Product Count */}
        <p className="product-count">
          Showing{" "}
          <strong>{filteredProducts.length}</strong>{" "}
          of{" "}
          <strong>{products.length}</strong>{" "}
          products
        </p>

        {/* Products */}
        {filteredProducts.length === 0 ? (
          <EmptyState />
        ) : (
          <ProductGrid products={filteredProducts} />
        )}
      </main>
    </>
  );
}

export default Home;