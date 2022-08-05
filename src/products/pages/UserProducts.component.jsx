import { useParams } from 'react-router-dom';

import ProductList from '../components/ProductList.component';

const DUMMY_PRODUCTS = [
  {
    id: 'p1',
    name: 'VANS',
    price: '50000',
    quantity: 5,
    creator: 'u1',
    imageUrl:
      'https://www.tradeinn.com/f/125/1252953/vans-old-skool-trainers.jpg',
  },
];

const UserProducts = () => {
  const userId = useParams().userId;
  const loadedProducts = DUMMY_PRODUCTS.filter(
    (product) => product.creator === userId
  );

  return <ProductList items={loadedProducts} />;
};

export default UserProducts;
