import { Product, Products } from './products';

export type WishlistStore = {
  items: Products;
  totalItems: number;

  addItem: (item: Product) => void;
  removeItem: (id: string) => void;
  toggleItem: (item: Product) => void;
  clearWishlist: () => void;
  isInWishlist: (id: string) => boolean;
};
