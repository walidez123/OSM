import { create } from 'zustand';
import { StoreState, Product, User } from '../types/store';

// Dummy products data
const dummyProducts: Product[] = [
  {
    id: crypto.randomUUID(),
    name: "MacBook Pro",
    price: 1299.99,
    stock: 10,
    category: "Electronics",
    image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=500"
  },
  {
    id: crypto.randomUUID(),
    name: "Wireless Headphones",
    price: 199.99,
    stock: 15,
    category: "Audio",
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500"
  },
  {
    id: crypto.randomUUID(),
    name: "Smart Watch",
    price: 299.99,
    stock: 8,
    category: "Wearables",
    image: "https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=500"
  },
  {
    id: crypto.randomUUID(),
    name: "4K Monitor",
    price: 499.99,
    stock: 5,
    category: "Electronics",
    image: "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=500"
  }
];

// Default user
const defaultUser: User = {
  email: "demo@example.com",
  isAuthenticated: true
};

export const useStore = create<StoreState>((set) => ({
  products: dummyProducts,
  user: defaultUser,
  
  addProduct: (product) => set((state) => ({
    products: [...state.products, { ...product, id: crypto.randomUUID() }]
  })),
  
  updateProduct: (id, updates) => set((state) => ({
    products: state.products.map(product => 
      product.id === id ? { ...product, ...updates } : product
    )
  })),
  
  deleteProduct: (id) => set((state) => ({
    products: state.products.filter(product => product.id !== id)
  })),
  
  updateStock: (id, quantity) => set((state) => ({
    products: state.products.map(product =>
      product.id === id ? { ...product, stock: Math.max(0, product.stock + quantity) } : product
    )
  })),

  login: (email: string, password: string) => {
    // In a real app, you would validate credentials with a backend
    set({ user: { email, isAuthenticated: true } });
  },

  signup: (email: string, password: string) => {
    // In a real app, you would create a new user in the backend
    set({ user: { email, isAuthenticated: true } });
  },

  logout: () => set({ user: null })
}));