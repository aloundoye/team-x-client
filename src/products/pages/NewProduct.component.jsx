import Input from '../../shared/components/FormElements/Input.component';
import { VALIDATOR_REQUIRE } from '../../shared/util/validators';

import './NewProduct.styles.css';

const NewProduct = () => {
  return (
    <form className="product-form">
      <Input
        element="input"
        type="text"
        label="Nom du produit"
        validators={[VALIDATOR_REQUIRE()]}
        errorText="Veillez entrer un nom valide"
      />
    </form>
  );
};

export default NewProduct;
