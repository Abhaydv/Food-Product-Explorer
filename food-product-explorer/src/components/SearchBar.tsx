interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
}

function SearchBar({ value, onChange }: SearchBarProps) {
  return (
    <div className="search-bar">
      <label htmlFor="product-search">
        Search products
      </label>

      <div className="search-input-wrapper">
        <span className="search-icon">🔍</span>

        <input
          id="product-search"
          type="search"
          className="search-input"
          placeholder="Search food products..."
          value={value}
          onChange={(event) => onChange(event.target.value)}
        />
      </div>
    </div>
  );
}

export default SearchBar;