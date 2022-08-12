import Card from '../../shared/components/UIElements/Card.component';
import ProductItem from './ProductItem.component';

import './ProductList.styles.css';

const ProductList = ({ products, error }) => {
  if (products.length === 0 || error) {
    return (
      <div className="product-list center">
        <Card>
          <h2>Aucun produit trouve</h2>
        </Card>
      </div>
    );
  }

  return (
    <ul className="product-list">
      {products.map((product) => (
        <ProductItem key={product.id} product={product} />
      ))}
    </ul>
  );
};

export default ProductList;
