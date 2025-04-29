import { Heart } from 'lucide-react';
import { categories, products } from '../../data';
import { calculateDiscountPrice } from '../../lib/utils/price';
import { useCartStore } from '../../stores/cart';
import { useWishlistStore } from '../../stores/wishlist';

export const Main = () => {
  const { addItem } = useCartStore();
  const { toggleItem, isInWishlist } = useWishlistStore();
  return (
    <main className='flex-grow max-w-7xl w-full mx-auto px-4 md:px-8 py-6 h-full'>
      {/* 배너 */}
      <div className='rounded-lg bg-gradient-to-r from-blue-500 to-purple-600 text-white p-8 mb-8'>
        <div className='max-w-xl'>
          <h2 className='text-2xl md:text-4xl font-bold mb-2'>여름 시즌 할인</h2>
          <p className='text-lg md:text-xl mb-4'>최대 50% 할인된 가격으로 여름 아이템을 만나보세요!</p>
          <button className='bg-white text-blue-600 font-medium py-2 px-6 rounded-full hover:bg-gray-100 transition-colors'>
            지금 쇼핑하기
          </button>
        </div>
      </div>

      {/* 상품 섹션 */}
      <section>
        <div className='flex justify-between items-center mb-6'>
          <h2 className='text-2xl font-bold'>인기 상품</h2>
          <a href='#' className='text-blue-600 hover:underline'>
            더보기
          </a>
        </div>

        {/* 상품 그리드 */}
        <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6'>
          {products.map((product) => (
            <div
              key={product.id}
              className='bg-white rounded-lg overflow-hidden shadow hover:shadow-md transition-shadow'
            >
              <div className='relative'>
                <img src={product.image} alt={product.name} className='w-full h-48 object-cover' />
                {product.discount && (
                  <span className='absolute top-2 left-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded'>
                    {product.discount}% OFF
                  </span>
                )}
                <button
                  onClick={() => toggleItem(product)}
                  className='absolute top-2 right-2 text-gray-600 hover:text-red-500 bg-white rounded-full p-1.5 shadow'
                >
                  {isInWishlist(product.id) ? <Heart size={18} className='fill-red-500' /> : <Heart size={18} />}
                </button>
              </div>

              <div className='p-4'>
                <h3 className='font-medium text-gray-900 mb-1'>{product.name}</h3>
                <div className='flex items-center space-x-2'>
                  {product.discount ? (
                    <>
                      <span className='font-bold text-lg'>
                        {calculateDiscountPrice(product.price, product.discount).toLocaleString()}원
                      </span>
                      <span className='text-sm text-gray-500 line-through'>{product.price.toLocaleString()}원</span>
                    </>
                  ) : (
                    <span className='font-bold text-lg'>{product.price.toLocaleString()}원</span>
                  )}
                </div>
                <button
                  onClick={() => addItem(product)}
                  className='mt-3 w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition-colors'
                >
                  장바구니 담기
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 카테고리별 섹션 */}
      <section className='mt-12'>
        <div className='flex justify-between items-center mb-6'>
          <h2 className='text-2xl font-bold'>카테고리별 쇼핑</h2>
        </div>

        <div className='grid grid-cols-2 md:grid-cols-4 gap-4'>
          {categories.slice(0, 4).map((category, index) => (
            <a key={index} href='#' className='block relative h-32 rounded-lg overflow-hidden'>
              <img src={`/api/placeholder/300/150`} alt={category} className='w-full h-full object-cover' />
              <div className='absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center'>
                <span className='text-white text-xl font-medium'>{category}</span>
              </div>
            </a>
          ))}
        </div>
      </section>
    </main>
  );
};
