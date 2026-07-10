export interface Product {
  id: string;
  name: string;
  category: 'Cotton Sarees' | 'Silk Sarees' | 'Dress Materials' | 'Chudithars' | 'Kurtis' | 'Men\'s Wear' | 'Kids Wear' | 'Blouse Materials' | 'Dhotis';
  price: number;
  size?: string;
  imageUrl: string;
  description: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Category {
  id: string;
  name: 'Cotton Sarees' | 'Silk Sarees' | 'Dress Materials' | 'Chudithars' | 'Kurtis' | 'Men\'s Wear' | 'Kids Wear' | 'Blouse Materials' | 'Dhotis';
}

export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
}

export interface Enquiry {
  productName: string;
  selectedSize: string;
  price: number;
  productLink?: string;
}