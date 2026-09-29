function EmptyState() {
  return (
    <section className="state-container">
      <div className="state-icon">🔍</div>

      <h2>No products found</h2>

      <p>
        We couldn't find any products matching your search or filters.
      </p>

      <p>
        Try searching for a different product name or clearing the filters.
      </p>
    </section>
  );
}

export default EmptyState;