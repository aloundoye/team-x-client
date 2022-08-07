import { VALIDATOR_REQUIRE } from "../../shared/util/validators";
import { useForm } from "../../shared/hooks/form-hook";

import Input from "../../shared/components/FormElements/Input.component";
import Button from "../../shared/components/FormElements/Button.component";

import "./ProductForm.styles.css";

const initialStates = {
  name: { value: "", isValid: false },
  price: { value: 0, isValid: false },
  quantity: { value: 0, isValid: false },
};

const NewProduct = () => {
  const [formState, inputHandler] = useForm(initialStates, false);

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
  );
};

export default NewProduct;
