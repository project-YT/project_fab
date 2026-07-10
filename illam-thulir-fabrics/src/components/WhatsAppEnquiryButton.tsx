import React from 'react';

interface WhatsAppEnquiryButtonProps {
  productName: string;
  selectedSize: string;
  price: string;
  productLink?: string;
}

const WhatsAppEnquiryButton: React.FC<WhatsAppEnquiryButtonProps> = ({ productName, selectedSize, price, productLink }) => {
  const handleWhatsAppClick = () => {
    const message = `Product Name: ${productName}\nSelected Size: ${selectedSize}\nPrice: ${price}\nProduct Link: ${productLink || 'N/A'}`;
    const whatsappUrl = `https://wa.me/919629226235?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <button onClick={handleWhatsAppClick} className="whatsapp-enquiry-button">
      Enquire on WhatsApp
    </button>
  );
};

export default WhatsAppEnquiryButton;