import { Products } from '../types/products';

// 카테고리 데이터
export const categories = ['의류', '신발', '가방', '액세서리', '화장품', '가전제품', '식품'];

// 상품 데이터 (예시)
export const products: Products = [
  {
    id: '1',
    name: '심플 티셔츠',
    price: 25000,
    image: '/public/tshirt_640.jpg',
    discount: 10,
  },
  {
    id: '2',
    name: '데님 청바지',
    price: 59000,
    image: '/public/tshirt_640.jpg',
  },
  {
    id: '3',
    name: '가죽 백팩',
    price: 89000,
    image: '/public/tshirt_640.jpg',
    discount: 20,
  },
  {
    id: '4',
    name: '심플 셔츠',
    price: 45000,
    image: '/public/tshirt_640.jpg',
  },
  {
    id: '5',
    name: '캐주얼 운동화',
    price: 79000,
    image: '/public/tshirt_640.jpg',
    discount: 15,
  },
  {
    id: '6',
    name: '클래식 모자',
    price: 35000,
    image: '/public/tshirt_640.jpg',
  },
];
