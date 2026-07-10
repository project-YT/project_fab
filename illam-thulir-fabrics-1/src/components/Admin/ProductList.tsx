import React from 'react';
import { Product } from '../../../types';
import { Link } from 'react-router-dom';

interface ProductListProps {
  products: Product[];
}

const ProductList: React.FC<ProductListProps> = ({ products }) => {
  return (
    <div className="product-list">
      <h2>Product List</h2>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Category</th>
            <th>Price</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product.id}>
              <td>{product.name}</td>
              <td>{product.category}</td>
              <td>{product.price}</td>
              <td>
                <Link to={`/admin/products/edit/${product.id}`}>Edit</Link>
                <a
                  href={`https://wa.me/919629226235?text=Product%20Name:%20${encodeURIComponent(product.name)}%0ASelected%20Size:%20${encodeURIComponent(product.size)}%0APrice:%20${encodeURIComponent(product.price)}%0AProduct%20Link:%20${encodeURIComponent(window.location.origin + '/products/' + product.id)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Enquire on WhatsApp
                </a>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProductList;