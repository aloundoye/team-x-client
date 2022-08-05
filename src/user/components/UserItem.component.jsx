import { Link } from 'react-router-dom';

import Avatar from '../../shared/components/UIElements/Avatar.component';
import Card from '../../shared/components/UIElements/Card.component';

import './UserItem.styles.css';

const UserItem = (props) => {
  const { id, image, name, productsCount } = props.user;

  return (
    <li className="user-item">
       <Card className="user-item__content">
        <Link to={`/${id}/products`}>
          <div className="user-item__image">
            <Avatar image={image} />
          </div>
          <div className="user-item__info">
            <h2>{name}</h2>
            <h3>
              {productsCount} {productsCount <= 1 ? 'Produit' : 'Produits'}
            </h3>
          </div>
        </Link>
      </Card>
    </li>
  );
};

export default UserItem;
