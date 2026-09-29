import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

import { getProductById } from "../services/productApi";
import type { Product } from "../types/product";

import Loading from "../components/Loading";
import ErrorMessage from "../components/ErrorMessage";

function ProductDetails() {
  const { id } = useParams<{ id: string }>();

  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProduct = async () => {
      if (!id) {
        setError("Product ID is missing.");
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        setError(null);

        const data = await getProductById(Number(id));

        setProduct(data);
      } catch (err) {
        setError(
          err instanceof Error
            ? err.message
            : "Failed to load product details."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return (
      <ErrorMessage
        message={error}
        onRetry={() => window.location.reload()}
      />
    );
  }

  if (!product) {
    return (
      <div className="empty-state">
        <h2>Product Not Found</h2>
        <p>The requested product could not be found.</p>
        <Link to="/" className="details-button">
          Back to Products
        </Link>
      </div>
    );
  }

  return (
    <main className="details-page">
      {/* Back */}
      <Link to="/" className="back-link">
        ← Back to Products
      </Link>

      {/* Main Product */}
      <section className="details-card">
        {/* Image */}
        <div className="details-image-section">
          <div className="details-image-wrapper">
            <img
              src={product.thumbnail}
              alt={product.title}
              className="details-image"
            />
          </div>

          {product.images.length > 1 && (
            <div className="details-thumbnails">
              {product.images.slice(0, 4).map((image, index) => (
                <img
                  key={index}
                  src={image}
                  alt={`${product.title} ${index + 1}`}
                />
              ))}
            </div>
          )}
        </div>

        {/* Product Info */}
        <div className="details-content">
          <span className="details-category">
            {product.category}
          </span>

          <h1>{product.title}</h1>

          <div className="details-rating">
            ⭐ <strong>{product.rating}</strong>
            <span>Customer rating</span>
          </div>

          <p className="details-description">
            {product.description}
          </p>

          <div className="details-price">
            ${product.price.toFixed(2)}
          </div>

          {product.discountPercentage > 0 && (
            <div className="discount">
              {product.discountPercentage.toFixed(0)}% OFF
            </div>
          )}

          <div className="details-stock">
            <span
              className={
                product.stock > 0
                  ? "stock available"
                  : "stock unavailable"
              }
            >
              ● {product.stock > 0 ? "In Stock" : "Out of Stock"}
            </span>

            <span>
              {product.stock} units available
            </span>
          </div>

          <div className="details-actions">
            <Link to="/" className="details-primary-button">
              Continue Exploring
            </Link>
          </div>
        </div>
      </section>

      {/* Product Information */}
      <section className="information-section">
        <div className="section-heading">
          <h2>Product Information</h2>
          <p>Additional information about this product</p>
        </div>

        <div className="information-grid">
          <div className="info-item">
            <span>Brand</span>
            <strong>{product.brand || "Not specified"}</strong>
          </div>

          <div className="info-item">
            <span>Category</span>
            <strong>{product.category}</strong>
          </div>

          <div className="info-item">
            <span>SKU</span>
            <strong>{product.sku}</strong>
          </div>

          <div className="info-item">
            <span>Weight</span>
            <strong>{product.weight}</strong>
          </div>

          <div className="info-item">
            <span>Minimum Order</span>
            <strong>{product.minimumOrderQuantity}</strong>
          </div>

          <div className="info-item">
            <span>Availability</span>
            <strong>{product.availabilityStatus}</strong>
          </div>
        </div>
      </section>

      {/* Shipping */}
      <section className="information-section">
        <div className="section-heading">
          <h2>Shipping & Returns</h2>
        </div>

        <div className="shipping-grid">
          <div className="shipping-item">
            <span>🚚</span>
            <div>
              <strong>Shipping</strong>
              <p>{product.shippingInformation}</p>
            </div>
          </div>

          <div className="shipping-item">
            <span>↩️</span>
            <div>
              <strong>Return Policy</strong>
              <p>{product.returnPolicy}</p>
            </div>
          </div>

          <div className="shipping-item">
            <span>🛡️</span>
            <div>
              <strong>Warranty</strong>
              <p>{product.warrantyInformation}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Reviews */}
      {product.reviews.length > 0 && (
        <section className="information-section">
          <div className="section-heading">
            <h2>Customer Reviews</h2>
            <p>{product.reviews.length} reviews</p>
          </div>

          <div className="reviews-grid">
            {product.reviews.map((review, index) => (
              <article className="review-card" key={index}>
                <div className="review-header">
                  <strong>{review.reviewerName}</strong>
                  <span>⭐ {review.rating}</span>
                </div>

                <p>{review.comment}</p>

                <small>{review.date}</small>
              </article>
            ))}
          </div>
        </section>
      )}
    </main>
  );
}

export default ProductDetails;