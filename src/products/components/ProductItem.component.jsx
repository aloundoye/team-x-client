import { useContext, useState } from 'react';

import Card from '../../shared/components/UIElements/Card.component';
import Button from '../../shared/components/FormElements/Button.component';
import Modal from '../../shared/components/UIElements/Modal.component..jsx';
import { AuthContext } from '../../shared/context/auth-context';

import './ProductItem.styles.css';

const ProductItem = ({ product }) => {
  const auth = useContext(AuthContext);
  const [showConfirmModal, setShowConfirmModal] = useState(false);

  const showDeleteWarningHandler = () => {
    setShowConfirmModal(true);
  };

  const cancelDeleteWarningHandler = () => {
    setShowConfirmModal(false);
  };
  const confirmDeleteHandler = () => {
    setShowConfirmModal(false);
  };
  return (
    <>
      <Modal
        show={showConfirmModal}
        onCancel={cancelDeleteWarningHandler}
        header="Etes-vous sur ?"
        footerClass="product-item__modal-actions"
        footer={
          <>
            <Button inverse onClick={cancelDeleteWarningHandler}>
              ANNULER
            </Button>
            <Button danger onClick={confirmDeleteHandler}>
              SUPPRIMER
            </Button>
          </>
        }
      >
        <p>Voulez-vous vraiment supprimer ce produit ?</p>
      </Modal>
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
            {auth.isLoggedIn && (
              <Button to={`/products/${product.id}`}>MODIFIER</Button>
            )}
            {auth.isLoggedIn && (
              <Button danger onClick={showDeleteWarningHandler}>
                SUPPRIMER
              </Button>
            )}
          </div>
        </Card>
      </li>
    </>
  );
};

export default ProductItem;
