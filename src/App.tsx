import { Header } from './components/header/header';
import { Footer } from './components/footer/footer';
import { Outlet } from 'react-router';

function App() {
  return (
    <div className='flex flex-col min-h-screen bg-gray-50'>
      {/* 헤더 */}
      <Header />

      {/* 메인 컨텐츠 */}
      <Outlet />

      {/* 푸터 */}
      <Footer />
    </div>
  );
}

export default App;
