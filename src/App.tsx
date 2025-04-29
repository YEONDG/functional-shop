import { Header } from './components/header/header';
import { Footer } from './components/footer/footer';
import { Outlet } from 'react-router';
import { Helmet, HelmetProvider } from 'react-helmet-async';

function App() {
  return (
    <HelmetProvider>
      <div className='flex flex-col min-h-screen bg-gray-50'>
        <Helmet>
          <title>함수형 쇼핑몰 예제</title>
          <meta name='description' content='함수형 연습 쇼핑몰입니다.' />
          <meta name='keywords' content='Fxts, functional programming' />
          <meta property='og:title' content='쇼핑몰' />
          <meta property='og:description' content='고품질 티셔츠 전문 쇼핑몰입니다.' />
          <meta property='og:image' content='/tshirt_640.jpg' />
          <meta property='og:url' content='https://functional-shop.vercel.app/' />
          <link rel='canonical' href='https://functional-shop.vercel.app/' />
        </Helmet>
        {/* 헤더 */}
        <Header />

        {/* 메인 컨텐츠 */}
        <Outlet />

        {/* 푸터 */}
        <Footer />
      </div>
    </HelmetProvider>
  );
}

export default App;
