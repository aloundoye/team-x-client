import { useParams } from 'react-router-dom';
import { VALIDATOR_REQUIRE } from '../../shared/util/validators';
import { useForm } from '../../shared/hooks/form-hook';

import Button from '../../shared/components/FormElements/Button.component';
import Input from '../../shared/components/FormElements/Input.component';

import './ProductForm.styles.css';
import { useEffect, useState } from 'react';
import Card from '../../shared/components/UIElements/Card.component';

const DUMMY_PRODUCTS = [
  {
    id: 'p1',
    name: 'VANS',
    price: 50000,
    quantity: 5,
    creator: 'u1',
    imageUrl:
      'https://www.tradeinn.com/f/125/1252953/vans-old-skool-trainers.jpg',
  },
];

const UpdateProduct = () => {
  const [isLoading, setIsLoading] = useState(true);
  const productId = useParams().productId;

  const [formState, inputHandler, setFormData] = useForm(
    {
      name: { value: '', isValid: false },
      price: { value: 0, isValid: false },
      quantity: { value: 0, isValid: false },
    },
    false
  );

  const identifiedProduct = DUMMY_PRODUCTS.find((p) => p.id === productId);
  useEffect(() => {
    if (identifiedProduct) {
      setFormData(
        {
          name: { value: identifiedProduct.name, isValid: true },
          price: { value: identifiedProduct.price, isValid: true },
          quantity: { value: identifiedProduct.quantity, isValid: true },
        },
        true
      );
    }

    setIsLoading(false);
  }, [setFormData, identifiedProduct]);

  const productUpdateSubmitHandler = (event) => {
    event.preventDefault();
    console.log(formState.inputs);
  };

  if (!identifiedProduct) {
    return (
      <div className="center">
        <Card>
          <h2>Produit non trouver</h2>
        </Card>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="center">
        <h2>Loading...</h2>
      </div>
    );
  }

  return (
    <form className="product-form" onSubmit={productUpdateSubmitHandler}>
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
    </form>
  );
};

export default UpdateProduct;
