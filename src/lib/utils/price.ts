/**
 * @param price - 원래 가격
 * @param discount - 할인율(%)
 * @returns 할인이 적용된 가격
 */
export const calculateDiscountPrice = (price: number, discount: number) => {
  if (!discount) return price;
  return price - (price * discount) / 100;
};
