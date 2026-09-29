import type { ProductFilters } from "../types/product";

interface FilterBarProps {
  filters: ProductFilters;
  categories: string[];
  onCategoryChange: (category: string) => void;
  onRatingChange: (rating: number) => void;
  onClear: () => void;
}

function FilterBar({
  filters,
  categories,
  onCategoryChange,
  onRatingChange,
  onClear,
}: FilterBarProps) {
  return (
    <section className="filter-bar">
      <div className="filter-group">
        <label htmlFor="category-filter">
          Category
        </label>

        <select
          id="category-filter"
          value={filters.category}
          onChange={(event) =>
            onCategoryChange(event.target.value)
          }
        >
          <option value="all">All Categories</option>

          {categories.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
      </div>

      <div className="filter-group">
        <label htmlFor="rating-filter">
          Minimum Rating
        </label>

        <select
          id="rating-filter"
          value={filters.minRating}
          onChange={(event) =>
            onRatingChange(Number(event.target.value))
          }
        >
          <option value={0}>All Ratings</option>
          <option value={4}>4+ Stars</option>
          <option value={4.5}>4.5+ Stars</option>
        </select>
      </div>

      <button
        type="button"
        className="clear-filters"
        onClick={onClear}
      >
        Clear Filters
      </button>
    </section>
  );
}

export default FilterBar;