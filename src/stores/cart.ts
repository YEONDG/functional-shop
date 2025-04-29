import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { CartItem, CartStore } from '../types/cart';
import { calculateDiscountPrice } from '../lib/utils/price';
import { filter, find, map, pipe, sum, toArray } from '@fxts/core';

// 장바구니 스토어 생성
export const useCartStore = create<CartStore>()(
  // persist 미들웨어로 로컬 스토리지에 상태 저장
  persist(
    (set, get) => ({
      items: [],
      totalItems: 0,
      totalPrice: 0,

      // 상품 추가
      addItem: (product) => {
        const currentItems = get().items;
        const existingItem = pipe(
          currentItems,
          find((item) => item.id === product.id)
        );

        if (existingItem) {
          // 이미 있는 상품이면 수량만 증가
          return get().updateQuantity(product.id, existingItem.quantity + 1);
        }

        // 새 상품 추가
        const newItem: CartItem = {
          ...product,
          quantity: 1,
        };

        set((state) => {
          const updatedItems = [...state.items, newItem];
          return {
            items: updatedItems,
            totalItems: state.totalItems + 1,
            totalPrice: calculateCartTotal(updatedItems),
          };
        });
      },

      // 상품 제거
      removeItem: (id) => {
        set((state) => {
          const updatedItems = pipe(
            state.items,
            filter((item) => item.id !== id),
            toArray
          );
          return {
            items: updatedItems,
            totalItems: getTotalItems(updatedItems),
            totalPrice: calculateCartTotal(updatedItems),
          };
        });
      },

      // 수량 변경
      updateQuantity: (id, quantity) => {
        set((state) => {
          //   const updatedItems = state.items.map((item) => (item.id === id ? { ...item, quantity } : item));
          const updatedItems = pipe(
            state.items,
            map((item) => (item.id === id ? { ...item, quantity } : item)),
            toArray
          );
          return {
            items: updatedItems,
            totalItems: getTotalItems(updatedItems),
            totalPrice: calculateCartTotal(updatedItems),
          };
        });
      },

      // 장바구니 비우기
      clearCart: () => {
        set({ items: [], totalItems: 0, totalPrice: 0 });
      },
    }),
    {
      name: 'cart-storage', // 로컬 스토리지 키 이름
      partialize: (state) => ({
        items: state.items,
        totalItems: state.totalItems,
        totalPrice: state.totalPrice,
      }),
    }
  )
);

function getTotalItems(items: CartItem[]): number {
  //   return items.reduce((total, item) => total + item.quantity, 0);
  return pipe(
    items,
    map((item) => item.quantity),
    sum
  );
}

function calculateCartTotal(items: CartItem[]): number {
  //   return items.reduce((total, item) => {
  //     const itemPrice = item.discount ? calculateDiscountPrice(item.price, item.discount) : item.price;
  //     return total + itemPrice * item.quantity;
  //   }, 0);
  return pipe(
    items,
    map((item) => {
      const unitPrice = item.discount ? calculateDiscountPrice(item.price, item.discount) : item.price;
      return unitPrice * item.quantity;
    }),
    toArray,
    sum
  );
}
