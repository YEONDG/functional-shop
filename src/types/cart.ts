import { Product } from './products';

export type CartItem = Product & {
  quantity: number;
};

export interface CartStore {
  items: CartItem[];
  totalItems: number;
  totalPrice: number;

  addItem: (item: Product) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
}
