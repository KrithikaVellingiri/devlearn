import { create } from 'zustand';

export interface CartItem {
  id: string;
  title: string;
  price: number;
  image: string;
  instructor: string;
  originalPrice?: number;
}

interface CartStore {
  items: CartItem[];
  addToCart: (item: CartItem) => void;
  removeFromCart: (id: string) => void;
  clearCart: () => void;
}

export const useCartStore = create<CartStore>((set) => ({
  items: [
    {
      id: "1",
      title: "Advanced Microservices Orchestration",
      instructor: "Sarah Chen, Lead SRE",
      price: 189.00,
      originalPrice: 249.00,
      image: "https://images.unsplash.com/photo-1555949963-aa79dcee981c?auto=format&fit=crop&q=80&w=1470" 
    },
    {
      id: "2",
      title: "Rust Systems Programming Deep Dive",
      instructor: "Marcus Thorne, Core Dev",
      price: 124.50,
      image: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&q=80&w=1470" 
    }
  ],
  addToCart: (item) => set((state) => {
    if (state.items.find(i => i.id === item.id)) return state;
    return { items: [...state.items, item] };
  }),
  removeFromCart: (id) => set((state) => ({
    items: state.items.filter((item) => item.id !== id)
  })),
  clearCart: () => set({ items: [] }),
}));
