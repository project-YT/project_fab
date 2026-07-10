import React from 'react';
import { useParams } from 'react-router-dom';
import { useProducts } from '../hooks/useProducts';
import WhatsAppEnquiryButton from '../components/WhatsAppEnquiryButton';

const ProductDetail: React.FC = () => {
    const { productId } = useParams<{ productId: string }>();
    const { products } = useProducts();
    const product = products.find((item) => item.id === productId);

    if (!product) {
        return <div>Product not found</div>;
    }

    const handleWhatsAppEnquiry = () => {
        const message = `Product Name: ${product.name}\nSelected Size: ${product.selectedSize}\nPrice: ${product.price}\nProduct Link: ${window.location.href}`;
        return message;
    };

    return (
        <div className="product-detail">
            <h1>{product.name}</h1>
            <img src={product.imageUrl} alt={product.name} />
            <p>{product.description}</p>
            <p>Price: ₹{product.price}</p>
            <WhatsAppEnquiryButton message={handleWhatsAppEnquiry()} />
        </div>
    );
};

export default ProductDetail;