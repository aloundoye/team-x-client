import { useParams, useNavigate } from 'react-router-dom';
import { useContext, useEffect } from 'react';

import { VALIDATOR_REQUIRE } from '../../shared/util/validators';
import { useForm } from '../../shared/hooks/form-hook';
import Button from '../../shared/components/FormElements/Button.component';
import Input from '../../shared/components/FormElements/Input.component';
import ErrorModal from '../../shared/components/UIElements/ErrorModal.component';
import LoadingSpinner from '../../shared/components/UIElements/LoadingSpinner.component';
import { useHttpClient } from '../../shared/hooks/http-hook';
import { AuthContext } from '../../shared/context/auth-context';

import './ProductForm.styles.css';
import Card from '../../shared/components/UIElements/Card.component';

const UpdateProduct = () => {
  const productId = useParams().productId;
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const auth = useContext(AuthContext);
  const navigate = useNavigate();

  const [formState, inputHandler, setFormData] = useForm(
    {
      name: { value: '', isValid: false },
      price: { value: 0, isValid: false },
      quantity: { value: 0, isValid: false },
    },
    false
  );

  const productUpdateSubmitHandler = async (event) => {
    event.preventDefault();
    try {
      await sendRequest(
        `http://localhost:5000/api/products/${productId}`,
        'PATCH',
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

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const data = await sendRequest(
          `http://localhost:5000/api/products/${productId}`
        );
        setFormData(
          {
            name: { value: data.product.name, isValid: true },
            price: { value: data.product.price, isValid: true },
            quantity: { value: data.product.quantity, isValid: true },
          },
          true
        );
      } catch (err) {}
    };

    fetchProduct();
  }, []);

  return (
    <>
      <ErrorModal error={error} onClear={clearError} />
      <form className="product-form" onSubmit={productUpdateSubmitHandler}>
        {isLoading && <LoadingSpinner asOverlay />}
        {!isLoading && (
          <>
            <Input
              id="name"
              element="input"
              type="text"
              label="Nom"
              validators={[VALIDATOR_REQUIRE()]}
              errorText="Veillez entrer un nom valide"
              onInput={inputHandler}
              initialValue={formState.inputs.name.value}
              initialValid={formState.inputs.name.isValid}
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
              initialValue={formState.inputs.price.value}
              initialValid={formState.inputs.price.isValid}
            />
            <Input
              id="quantity"
              element="input"
              type="number"
              label="Quantite"
              validators={[VALIDATOR_REQUIRE()]}
              errorText="Veillez entrer une quantite valide"
              onInput={inputHandler}
              initialValue={formState.inputs.quantity.value}
              initialValid={formState.inputs.quantity.isValid}
            />
            <Button type="submit" disabled={!formState.isValid}>
              MODIFIER PRODUIT
            </Button>
          </>
        )}
      </form>
    </>
  );
};

export default UpdateProduct;
