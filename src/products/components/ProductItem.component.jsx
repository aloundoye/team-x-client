import Card from '../../shared/components/UIElements/Card.component';

import './ProductItem.styles.css';

const ProductItem = ({ product }) => {
  return (
    <li className="product-item">
      <Card className="product-item__content">
        <div className="product-item__image">
          <img src={product.imageUrl} alt={product.name} />
        </div>
        <div className="product-item__info">
          <h2>{product.name}</h2>
          <h3>{product.quantity}</h3>
        </div>
        <div className="product-item__actions">
          <button>MODIFIER</button>
          <button>SUPPRIMER</button>
        </div>
      </Card>
    </li>
  );
};

export default ProductItem;
