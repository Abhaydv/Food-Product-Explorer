import { Link } from "react-router-dom";
import type { Product } from "../types/product";

interface ProductCardProps {
  product: Product;
}

function ProductCard({ product }: ProductCardProps) {
  return (
    <article className="product-card">
      <div className="product-image-container">
        <img
          src={product.thumbnail}
          alt={product.title}
          className="product-image"
          loading="lazy"
        />
      </div>

      <div className="product-content">
        <span className="product-category">
          {product.category}
        </span>

        <h2 className="product-title">
          {product.title}
        </h2>

        <p className="product-description">
          {product.description}
        </p>

        <div className="product-info">
          <span className="product-price">
            ${product.price.toFixed(2)}
          </span>

          <span className="product-rating">
            ⭐ {product.rating.toFixed(1)}
          </span>
        </div>

        <div className="product-footer">
          <span
            className={
              product.stock > 0
                ? "stock available"
                : "stock unavailable"
            }
          >
            {product.stock > 0
              ? `${product.stock} in stock`
              : "Out of stock"}
          </span>

          <Link
            to={`/product/${product.id}`}
            className="details-button"
          >
            View Details
          </Link>
        </div>
      </div>
    </article>
  );
}

export default ProductCard;