export const Footer = () => {
  return (
    <footer className='bg-gray-800 text-white py-8 mt-12'>
      <div className='max-w-7xl mx-auto px-4 md:px-8'>
        <div className='grid grid-cols-1 md:grid-cols-4 gap-8'>
          <div>
            <h3 className='text-lg font-bold mb-4'>쇼핑몰</h3>
            <p className='text-gray-400'>고객 만족을 최우선으로 생각하는 쇼핑몰입니다.</p>
          </div>

          <div>
            <h3 className='text-lg font-bold mb-4'>고객 서비스</h3>
            <ul className='space-y-2 text-gray-400'>
              <li>
                <a href='#' className='hover:text-white'>
                  주문 조회
                </a>
              </li>
              <li>
                <a href='#' className='hover:text-white'>
                  배송 정보
                </a>
              </li>
              <li>
                <a href='#' className='hover:text-white'>
                  교환 및 반품
                </a>
              </li>
              <li>
                <a href='#' className='hover:text-white'>
                  자주 묻는 질문
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className='text-lg font-bold mb-4'>회사 정보</h3>
            <ul className='space-y-2 text-gray-400'>
              <li>
                <a href='#' className='hover:text-white'>
                  회사 소개
                </a>
              </li>
              <li>
                <a href='#' className='hover:text-white'>
                  이용약관
                </a>
              </li>
              <li>
                <a href='#' className='hover:text-white'>
                  개인정보처리방침
                </a>
              </li>
              <li>
                <a href='#' className='hover:text-white'>
                  제휴 문의
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className='text-lg font-bold mb-4'>뉴스레터 구독</h3>
            <p className='text-gray-400 mb-2'>최신 소식과 특별 혜택을 받아보세요.</p>
            <div className='flex'>
              <input
                type='email'
                placeholder='이메일'
                className='py-2 px-3 rounded-l text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500'
              />
              <button className='bg-blue-600 hover:bg-blue-700 py-2 px-4 rounded-r'>구독</button>
            </div>
          </div>
        </div>

        <div className='border-t border-gray-700 mt-8 pt-8 text-center text-gray-400'>
          <p>© 2025 쇼핑몰. 모든 권리 보유.</p>
        </div>
      </div>
    </footer>
  );
};
