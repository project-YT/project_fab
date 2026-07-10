import { firestore } from '../services/firebase';

export interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  sizeOptions: string[];
  imageUrl: string;
  description: string;
}

export const getProducts = async (): Promise<Product[]> => {
  const productsSnapshot = await firestore.collection('products').get();
  return productsSnapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data(),
  })) as Product[];
};

export const getProductById = async (id: string): Promise<Product | null> => {
  const productDoc = await firestore.collection('products').doc(id).get();
  return productDoc.exists ? { id: productDoc.id, ...productDoc.data() } as Product : null;
};

export const addProduct = async (product: Product): Promise<void> => {
  await firestore.collection('products').add(product);
};

export const updateProduct = async (id: string, product: Partial<Product>): Promise<void> => {
  await firestore.collection('products').doc(id).update(product);
};

export const deleteProduct = async (id: string): Promise<void> => {
  await firestore.collection('products').doc(id).delete();
};