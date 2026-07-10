import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { createProduct, updateProduct } from '../../../services/products';
import { Product } from '../../../types';
import './ProductForm.css';

const ProductForm: React.FC<{ product?: Product }> = ({ product }) => {
    const [name, setName] = useState<string>(product ? product.name : '');
    const [category, setCategory] = useState<string>(product ? product.category : '');
    const [price, setPrice] = useState<number>(product ? product.price : 0);
    const [size, setSize] = useState<string>(product ? product.size : '');
    const [image, setImage] = useState<string>(product ? product.image : '');
    const history = useHistory();

    const categories = [
        'Cotton Sarees',
        'Silk Sarees',
        'Dress Materials',
        'Chudithars',
        'Kurtis',
        'Men\'s Wear',
        'Kids Wear',
        'Blouse Materials',
        'Dhotis'
    ];

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const productData = { name, category, price, size, image };
        if (product) {
            await updateProduct(product.id, productData);
        } else {
            await createProduct(productData);
        }
        history.push('/admin/products');
    };

    return (
        <form onSubmit={handleSubmit} className="product-form">
            <h2>{product ? 'Edit Product' : 'Add Product'}</h2>
            <div>
                <label>Product Name:</label>
                <input type="text" value={name} onChange={(e) => setName(e.target.value)} required />
            </div>
            <div>
                <label>Category:</label>
                <select value={category} onChange={(e) => setCategory(e.target.value)} required>
                    <option value="">Select Category</option>
                    {categories.map((cat) => (
                        <option key={cat} value={cat}>{cat}</option>
                    ))}
                </select>
            </div>
            <div>
                <label>Price:</label>
                <input type="number" value={price} onChange={(e) => setPrice(Number(e.target.value))} required />
            </div>
            <div>
                <label>Size:</label>
                <input type="text" value={size} onChange={(e) => setSize(e.target.value)} required />
            </div>
            <div>
                <label>Image URL:</label>
                <input type="text" value={image} onChange={(e) => setImage(e.target.value)} required />
            </div>
            <button type="submit">{product ? 'Update Product' : 'Add Product'}</button>
        </form>
    );
};

export default ProductForm;