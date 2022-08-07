import { useParams } from "react-router-dom";
import { VALIDATOR_REQUIRE } from "../../shared/util/validators";

import Button from "../../shared/components/FormElements/Button.component";
import Input from "../../shared/components/FormElements/Input.component";

import "./ProductForm.styles.css";

const DUMMY_PRODUCTS = [
  {
    id: "p1",
    name: "VANS",
    price: "50000",
    quantity: 5,
    creator: "u1",
    imageUrl:
      "https://www.tradeinn.com/f/125/1252953/vans-old-skool-trainers.jpg",
  },
];

const UpdateProduct = () => {
  const productId = useParams().productId;

  const identifiedProduct = DUMMY_PRODUCTS.find((p) => p.id === productId);

  if (!identifiedProduct) {
    return (
      <div className="center">
        <h2>Produit non trouver</h2>
      </div>
    );
  }

  return (
    <form className="product-form" onSubmit={() => {}}>
      <Input
        value={identifiedProduct.name}
        id="name"
        element="input"
        type="text"
        label="Nom"
        validators={[VALIDATOR_REQUIRE()]}
        errorText="Veillez entrer un nom valide"
        onInput={() => {}}
        valid={true}
      />
      <Input
        value={identifiedProduct.price}
        id="price"
        element="input"
        type="text"
        label="Prix"
        validators={[VALIDATOR_REQUIRE()]}
        errorText="Veillez entrer un prix valide"
        onInput={() => {}}
        valid={true}
      />
      <Input
        value={identifiedProduct.quantity}
        id="quantity"
        element="input"
        type="number"
        label="Quantite"
        validators={[VALIDATOR_REQUIRE()]}
        errorText="Veillez entrer une quantite valide"
        onInput={() => {}}
        valid={true}
      />
      <Button type="submit" disabled={true}>
        MODIFIER PRODUIT
      </Button>
    </form>
  );
};

export default UpdateProduct;
