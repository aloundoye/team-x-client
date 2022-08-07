
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

const Products = () => {
  

  return <ProductList items={DUMMY_PRODUCTS} />;
};

export default Products;
