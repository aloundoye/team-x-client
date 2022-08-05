import Card from '../../shared/components/UIElements/Card.component';
import Button from '../../shared/components/FormElements/Button.component';

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
          <h4>
            Prix: {new Intl.NumberFormat('fr-SN').format(product.price)} F CFA
          </h4>
          <h4>Quantite: {product.quantity}</h4>
        </div>
        <div className="product-item__actions">
          <Button to={`/products/${product.id}`}>MODIFIER</Button>
          <Button danger>SUPPRIMER</Button>
        </div>
      </Card>
    </li>
  );
};

export default ProductItem;
