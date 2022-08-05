import ProductList from '../components/ProductList.component';

const DUMMY_PRODUCTS = [
  {
    id: 'p1',
    name: 'VANS',
    quantity: 5,
    creator: 'u1',
    imageUrl:
      'https://www.tradeinn.com/f/125/1252953/vans-old-skool-trainers.jpg',
  },
];

const UserProducts = () => {
  return <ProductList items={DUMMY_PRODUCTS}/>;
};

export default UserProducts;
