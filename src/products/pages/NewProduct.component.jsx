import { useContext } from 'react';
import { VALIDATOR_REQUIRE } from '../../shared/util/validators';
import { useForm } from '../../shared/hooks/form-hook';
import { useNavigate } from 'react-router-dom';

import Input from '../../shared/components/FormElements/Input.component';
import Button from '../../shared/components/FormElements/Button.component';
import { useHttpClient } from '../../shared/hooks/http-hook';
import { AuthContext } from '../../shared/context/auth-context';
import ErrorModal from '../../shared/components/UIElements/ErrorModal.component';
import LoadingSpinner from '../../shared/components/UIElements/LoadingSpinner.component';

import './ProductForm.styles.css';

const initialStates = {
  name: { value: '', isValid: false },
  price: { value: 0, isValid: false },
  quantity: { value: 0, isValid: false },
};

const NewProduct = () => {
  const [formState, inputHandler] = useForm(initialStates, false);
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const auth = useContext(AuthContext);
  const navigate = useNavigate();

  const productSubmitHandler = async (event) => {
    event.preventDefault();
    try {
      await sendRequest(
        'http://localhost:5000/api/products',
        'POST',
        JSON.stringify({
          name: formState.inputs.name.value,
          price: formState.inputs.price.value,
          quantity: formState.inputs.quantity.value,
          creator: auth.userId,
        }),
        {
          'Content-Type': 'application/json',
        }
      );

      navigate('/');
    } catch (error) {}
  };

  return (
    <>
      <ErrorModal error={error} onClear={clearError} />
      <form className="product-form" onSubmit={productSubmitHandler}>
        {isLoading && <LoadingSpinner asOverlay />}
        <Input
          id="name"
          element="input"
          type="text"
          label="Nom"
          validators={[VALIDATOR_REQUIRE()]}
          errorText="Veillez entrer un nom valide"
          onInput={inputHandler}
        />
        <Input
          id="price"
          element="input"
          type="number"
          min="5"
          step="any"
          label="Prix"
          validators={[VALIDATOR_REQUIRE()]}
          errorText="Veillez entrer un prix valide"
          onInput={inputHandler}
        />
        <Input
          id="quantity"
          element="input"
          type="number"
          label="Quantite"
          validators={[VALIDATOR_REQUIRE()]}
          errorText="Veillez entrer une quantite valide"
          onInput={inputHandler}
        />
        <Button type="submit" disabled={!formState.isValid}>
          AJOUTER PRODUIT
        </Button>
      </form>
    </>
  );
};

export default NewProduct;
