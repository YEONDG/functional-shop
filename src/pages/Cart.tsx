import { useState } from 'react';
import { Link } from 'react-router';
import { useCartStore } from '../stores/cart';
import { calculateDiscountPrice } from '../lib/utils/price';

const Cart = () => {
  const { items, totalItems, totalPrice, updateQuantity, removeItem, clearCart } = useCartStore();
  const [isCheckingOut, setIsCheckingOut] = useState(false);

  const isCartEmpty = items.length === 0;

  // 결제 처리 함수
  const handleCheckout = () => {
    setIsCheckingOut(true);
    setTimeout(() => {
      alert('주문이 완료되었습니다!');
      clearCart();
      setIsCheckingOut(false);
    }, 1500);
  };

  return (
    <div className='container mx-auto px-4 py-8'>
      <h1 className='text-2xl md:text-3xl font-bold mb-6'>장바구니</h1>

      {isCartEmpty ? (
        <div className='text-center py-12'>
          <p className='text-gray-500 mb-6'>장바구니가 비어 있습니다</p>
          <Link
            to='/'
            className='inline-block bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition-colors'
          >
            쇼핑 계속하기
          </Link>
        </div>
      ) : (
        <div className='grid grid-cols-1 lg:grid-cols-3 gap-8'>
          {/* 장바구니 아이템 목록 */}
          <div className='lg:col-span-2'>
            <div className='bg-white rounded-lg shadow p-6'>
              <div className='flex justify-between items-center mb-4'>
                <h2 className='text-xl font-semibold'>장바구니 상품 ({totalItems})</h2>
                <button onClick={clearCart} className='text-sm text-red-500 hover:text-red-700'>
                  모두 삭제
                </button>
              </div>

              <div className='divide-y'>
                {items.map((item) => (
                  <div key={item.id} className='py-4 flex flex-col sm:flex-row'>
                    {/* 상품 이미지 */}
                    <div className='w-full sm:w-24 h-24 flex-shrink-0 mb-4 sm:mb-0'>
                      <img
                        src={item.image || '/api/placeholder/100/100'}
                        alt={item.name}
                        className='w-full h-full object-cover rounded'
                      />
                    </div>

                    {/* 상품 정보 */}
                    <div className='flex-grow sm:ml-4'>
                      <div className='flex flex-col sm:flex-row justify-between'>
                        <h3 className='font-medium'>{item.name}</h3>
                        <div className='mt-1 sm:mt-0 font-bold text-right'>
                          {item.discount ? (
                            <>
                              <span>{calculateDiscountPrice(item.price, item.discount).toLocaleString()}원</span>
                              <span className='text-sm text-gray-500 line-through ml-2'>
                                {item.price.toLocaleString()}원
                              </span>
                            </>
                          ) : (
                            <span>{item.price.toLocaleString()}원</span>
                          )}
                        </div>
                      </div>

                      {/* 수량 조절 및 삭제 */}
                      <div className='flex justify-between items-center mt-4'>
                        <div className='flex items-center border rounded'>
                          <button
                            className='px-3 py-1 text-gray-600 hover:bg-gray-100'
                            onClick={() => updateQuantity(item.id, Math.max(1, item.quantity - 1))}
                            aria-label='수량 감소'
                          >
                            -
                          </button>
                          <span className='px-3 py-1'>{item.quantity}</span>
                          <button
                            className='px-3 py-1 text-gray-600 hover:bg-gray-100'
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            aria-label='수량 증가'
                          >
                            +
                          </button>
                        </div>
                        <button
                          className='text-sm text-gray-500 hover:text-red-500'
                          onClick={() => removeItem(item.id)}
                        >
                          삭제
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* 주문 요약 */}
          <div className='lg:col-span-1'>
            <div className='bg-white rounded-lg shadow p-6 sticky top-24'>
              <h2 className='text-xl font-semibold mb-4'>주문 요약</h2>

              <div className='space-y-3 mb-6'>
                <div className='flex justify-between'>
                  <span className='text-gray-600'>상품 금액</span>
                  <span>{totalPrice.toLocaleString()}원</span>
                </div>
                <div className='flex justify-between'>
                  <span className='text-gray-600'>배송비</span>
                  <span>{totalPrice >= 50000 ? '무료' : '3,000원'}</span>
                </div>
                <div className='border-t pt-3 flex justify-between font-bold'>
                  <span>총 결제금액</span>
                  <span className='text-blue-600'>
                    {(totalPrice >= 50000 ? totalPrice : totalPrice + 3000).toLocaleString()}원
                  </span>
                </div>
              </div>

              <button
                className='w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed'
                onClick={handleCheckout}
                disabled={isCheckingOut}
              >
                {isCheckingOut ? '처리중...' : '결제하기'}
              </button>

              <div className='mt-4 text-center'>
                <Link to='/products' className='text-blue-600 hover:underline'>
                  쇼핑 계속하기
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
