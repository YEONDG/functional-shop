import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { WishlistStore } from '../types/wishlist';
import { filter, pipe, some, toArray } from '@fxts/core';

export const useWishlistStore = create<WishlistStore>()(
  persist(
    (set, get) => ({
      items: [],
      totalItems: 0,

      // 관심 상품 추가
      addItem: (product) => {
        const currentItems = get().items;
        const isExisting = pipe(
          currentItems,
          some((item) => item.id === product.id)
        );

        // 이미 존재하면 추가하지 않음
        if (isExisting) return;

        set((state) => ({
          items: [...state.items, product],
          totalItems: state.totalItems + 1,
        }));
      },

      // 관심 상품 제거
      removeItem: (id) => {
        set((state) => {
          //   const updatedItems = state.items.filter((item) => item.id !== id);
          const updatedItems = pipe(
            state.items,
            filter((item) => item.id !== id),
            toArray
          );
          return {
            items: updatedItems,
            totalItems: updatedItems.length,
          };
        });
      },

      // 관심 상품 토글 (있으면 제거, 없으면 추가)
      toggleItem: (product) => {
        const isInWishlist = get().isInWishlist(product.id);

        if (isInWishlist) {
          get().removeItem(product.id);
        } else {
          get().addItem(product);
        }
      },

      // 관심 상품 모두 비우기
      clearWishlist: () => {
        set({ items: [], totalItems: 0 });
      },

      // 특정 상품이 관심 상품에 있는지 확인
      isInWishlist: (id) => {
        return pipe(
          get().items,
          some((item) => item.id === id)
        );
      },
    }),
    {
      name: 'wishlist-storage', // 로컬 스토리지 키 이름
    }
  )
);
