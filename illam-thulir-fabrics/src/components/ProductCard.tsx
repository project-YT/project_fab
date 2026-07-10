import React from 'react';
import { Product } from '../types';
import WhatsAppEnquiryButton from './WhatsAppEnquiryButton';

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { name, price, imageUrl, sizes } = product;

  return (
    <div className="product-card">
      <img src={imageUrl} alt={name} className="product-image" />
      <h3 className="product-name">{name}</h3>
      <p className="product-price">₹{price}</p>
      <div className="size-selection">
        <label htmlFor="size">Select Size:</label>
        <select id="size" name="size">
          {sizes.map((size) => (
            <option key={size} value={size}>
              {size}
            </option>
          ))}
        </select>
      </div>
      <WhatsAppEnquiryButton productName={name} price={price} />
    </div>
  );
};

export default ProductCard;