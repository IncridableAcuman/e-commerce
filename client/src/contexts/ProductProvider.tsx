// src/context/CartContext.tsx
import React, { createContext, useContext, useState, ReactNode } from 'react';
import axiosAPI from '../api/axiosAPI';

// Define types for Product and Cart item
// interface Product {
//   id: number;
//   name: string;
//   price: number;
//   description: string;
//   image: string;
//   size: string;
// }

interface CartItem {
  productId: number;
  quantity: number;
}

interface CartContextType {
  cart: CartItem[];
  addToCart: (productId: number, userId: string, count: number) => Promise<void>;
}

// Create the context
const CartContext = createContext<CartContextType | undefined>(undefined);

// Create a custom hook to use the Cart context
export const useCart = (): CartContextType => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

// Create a provider component
interface CartProviderProps {
  children: ReactNode;
}

export const CartProvider: React.FC<CartProviderProps> = ({ children }) => {
  const [cart, setCart] = useState<CartItem[]>([]);

  const addToCart = async (productId: number, userId: string, count: number) => {
    try {
      await axiosAPI.post(`/cart/add?userId=${userId}&productId=${productId}&quantity=${count}`);
      setCart((prevCart) => [
        ...prevCart,
        { productId, quantity: count },
      ]);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <CartContext.Provider value={{ cart, addToCart }}>
      {children}
    </CartContext.Provider>
  );
};
