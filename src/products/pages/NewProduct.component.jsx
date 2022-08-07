import { useCallback, useReducer } from 'react';
import { VALIDATOR_REQUIRE } from '../../shared/util/validators';

import Input from '../../shared/components/FormElements/Input.component';
import Button from '../../shared/components/FormElements/Button.component';

import './NewProduct.styles.css';

const formReducer = (state, action) => {
  switch (action.type) {
    case 'INPUT_CHANGE':
      let formIsValid = true;
      for (const inputId in state.inputs) {
        if (inputId === action.inputId) {
          formIsValid = formIsValid && action.isValid;
        } else {
          formIsValid = formIsValid && state.inputs[inputId].isValid;
        }
      }
      return {
        ...state,
        inputs: {
          ...state.inputs,
          [action.inputId]: { value: action.value, isValid: action.isValid },
        },
        isValid: formIsValid,
      };
    default:
      return state;
  }
};

const NewProduct = () => {
  const [formState, dispatch] = useReducer(formReducer, {
    inputs: {
      name: { value: '', isValid: false },
      price: { value: '', isValid: false },
      quantity: { value: '', isValid: false },
    },
    isValid: false,
  });

  const inputHandler = useCallback((id, value, isValid) => {
    dispatch({
      type: 'INPUT_CHANGE',
      value: value,
      isValid: isValid,
      inputId: id,
    });
  }, []);

  const productSubmitHandler = (event) => {
    event.preventDefault();
    console.log(formState.inputs);
  };

  return (
    <form className="product-form" onSubmit={productSubmitHandler}>
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
        type="text"
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
  );
};

export default NewProduct;
