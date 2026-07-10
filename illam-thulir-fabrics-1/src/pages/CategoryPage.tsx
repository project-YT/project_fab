import React from 'react';
import { useParams } from 'react-router-dom';
import { useProducts } from '../hooks/useProducts';
import ProductCard from '../components/ProductCard';
import './CategoryPage.css';

const CategoryPage: React.FC = () => {
    const { category } = useParams<{ category: string }>();
    const { products } = useProducts(category);

    return (
        <div className="category-page">
            <h1>{category.replace('-', ' ')}</h1>
            <div className="product-list">
                {products.length > 0 ? (
                    products.map(product => (
                        <ProductCard key={product.id} product={product} />
                    ))
                ) : (
                    <p>No products available in this category.</p>
                )}
            </div>
        </div>
    );
};

export default CategoryPage;