import { useState } from 'react';
import { ShoppingCart, Search, Heart, User, Menu, X } from 'lucide-react';
import { categories } from '../../data';
import { NavLink } from 'react-router';
import { useCartStore } from '../../stores/cart';
import { useWishlistStore } from '../../stores/wishlist';

export const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { totalItems } = useCartStore();
  const { totalItems: totalWishItems } = useWishlistStore();

  return (
    <header className='sticky top-0 z-10 bg-white shadow'>
      {/* 상단 헤더 */}
      <div className='flex justify-between items-center px-4 md:px-8 py-4 max-w-7xl mx-auto'>
        {/* 모바일 메뉴 토글 버튼 */}
        <button className='md:hidden' onClick={() => setIsMenuOpen(!isMenuOpen)}>
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        {/* 로고 */}
        <NavLink to='/'>
          <h1 className='text-2xl md:text-3xl font-bold text-blue-600'>쇼핑몰</h1>
        </NavLink>

        {/* 검색창 - 모바일에서는 숨김 */}
        <div className='hidden md:flex items-center flex-grow mx-8 max-w-xl relative'>
          <input
            type='text'
            placeholder='검색어를 입력하세요'
            className='w-full py-2 px-4 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent'
          />
          <Search className='absolute right-4 text-gray-400' size={20} />
        </div>

        {/* 유저 메뉴 */}
        <nav className='flex items-center space-x-4'>
          <NavLink to='/wishlist' className='hidden md:block md:relative text-gray-600 hover:text-blue-600'>
            <Heart size={24} />
            <span className='absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center'>
              {totalWishItems}
            </span>
          </NavLink>
          <NavLink to='/cart' className='text-gray-600 hover:text-blue-600 relative'>
            <ShoppingCart size={24} />
            <span className='absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center'>
              {totalItems}
            </span>
          </NavLink>
          <NavLink to='/' className='hidden md:block text-gray-600 hover:text-blue-600'>
            <User size={24} />
          </NavLink>
        </nav>
      </div>

      {/* 모바일 검색창 */}
      <div className='md:hidden px-4 pb-4'>
        <div className='relative'>
          <input
            type='text'
            placeholder='검색어를 입력하세요'
            className='w-full py-2 px-4 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent'
          />
          <Search className='absolute right-4 top-2 text-gray-400' size={20} />
        </div>
      </div>

      {/* 카테고리 네비게이션 */}
      <nav className={`${isMenuOpen ? 'block' : 'hidden'} md:block bg-blue-600 text-white`}>
        <ul className='flex flex-col md:flex-row justify-center items-center max-w-7xl mx-auto'>
          {categories.map((category, index) => (
            <li key={index}>
              <a href='#' className='block px-4 py-3 hover:bg-blue-700 transition-colors'>
                {category}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
};
