import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router';
import './index.css';
import App from './App.tsx';
import { Main } from './components/main/main.tsx';
import Cart from './pages/Cart.tsx';
import Wishlist from './pages/Wishlist.tsx';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      { index: true, Component: Main },
      { path: 'cart', Component: Cart },
      { path: 'wishlist', Component: Wishlist },
    ],
  },
]);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
