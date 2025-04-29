import { Link } from 'react-router';
import { Heart, ShoppingCart, Trash2, ArrowLeft } from 'lucide-react';
import { useWishlistStore } from '../stores/wishlist';
import { useCartStore } from '../stores/cart';
import { calculateDiscountPrice } from '../lib/utils/price';
import { Product } from '../types/products';

const Wishlist = () => {
  const { items, totalItems, removeItem, clearWishlist } = useWishlistStore();
  const { addItem } = useCartStore();

  // 위시리스트가 비어있는지 확인
  const isWishlistEmpty = items.length === 0;

  // 장바구니에 추가하는 함수
  const handleAddToCart = (product: Product) => {
    addItem({
      ...product,
      id: product.id.toString(),
    });
  };

  return (
    <div className='container mx-auto px-4 py-8'>
      {/* 헤더 섹션 */}
      <div className='mb-8'>
        <Link to='/' className='inline-flex items-center text-blue-600 hover:text-blue-800 mb-4'>
          <ArrowLeft size={16} className='mr-1' />
          계속 쇼핑하기
        </Link>

        <div className='flex justify-between items-center'>
          <h1 className='text-2xl md:text-3xl font-bold flex items-center'>
            <Heart className='mr-2 text-red-500' size={28} />
            관심 상품 <span className='ml-2 text-gray-500'>({totalItems})</span>
          </h1>

          {!isWishlistEmpty && (
            <button onClick={clearWishlist} className='text-sm text-red-500 hover:text-red-700 flex items-center'>
              <Trash2 size={16} className='mr-1' />
              전체 삭제
            </button>
          )}
        </div>
      </div>

      {/* 빈 위시리스트 상태 */}
      {isWishlistEmpty ? (
        <div className='bg-white rounded-lg shadow p-8 text-center'>
          <div className='inline-flex justify-center items-center w-16 h-16 bg-gray-100 rounded-full mb-4'>
            <Heart size={28} className='text-gray-400' />
          </div>
          <h2 className='text-xl font-semibold mb-2'>관심 상품이 없습니다</h2>
          <p className='text-gray-500 mb-6'>마음에 드는 상품을 찾아 하트를 눌러보세요!</p>
          <Link
            to='/'
            className='inline-block bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition-colors'
          >
            상품 둘러보기
          </Link>
        </div>
      ) : (
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6'>
          {items.map((item) => (
            <div
              key={item.id}
              className='bg-white rounded-lg shadow overflow-hidden flex flex-col group hover:shadow-md transition-shadow'
            >
              {/* 상품 이미지 */}
              <div className='relative overflow-hidden'>
                <Link to={`/`}>
                  <img
                    src={item.image}
                    alt={item.name}
                    className='w-full h-52 object-cover group-hover:scale-105 transition-transform duration-300'
                  />
                </Link>

                {/* 할인 태그 */}
                {item.discount && (
                  <span className='absolute top-2 left-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded'>
                    {item.discount}% OFF
                  </span>
                )}

                {/* 찜 버튼 */}
                <button
                  onClick={() => removeItem(item.id)}
                  className='absolute top-2 right-2 p-2 bg-white rounded-full shadow hover:bg-red-50 transition-colors'
                  aria-label='관심상품에서 제거'
                >
                  <Heart size={18} className='fill-red-500 text-red-500' />
                </button>
              </div>

              {/* 상품 정보 */}
              <div className='p-4 flex-grow'>
                <Link to={`/`}>
                  <h3 className='font-medium text-gray-900 mb-1 hover:text-blue-600 transition-colors'>{item.name}</h3>
                </Link>

                {/* 가격 정보 */}
                <div className='flex items-center space-x-2 mb-3'>
                  {item.discount ? (
                    <>
                      <span className='font-bold text-lg'>
                        {calculateDiscountPrice(item.price, item.discount).toLocaleString()}원
                      </span>
                      <span className='text-sm text-gray-500 line-through'>{item.price.toLocaleString()}원</span>
                    </>
                  ) : (
                    <span className='font-bold text-lg'>{item.price.toLocaleString()}원</span>
                  )}
                </div>
              </div>

              {/* 액션 버튼 */}
              <div className='p-4 pt-0'>
                <button
                  onClick={() => handleAddToCart(item)}
                  className='w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition-colors flex items-center justify-center'
                >
                  <ShoppingCart size={16} className='mr-2' />
                  장바구니에 담기
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Wishlist;
