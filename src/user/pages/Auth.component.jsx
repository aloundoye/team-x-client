import { useState, useContext } from 'react';

import Button from '../../shared/components/FormElements/Button.component';
import Card from '../../shared/components/UIElements/Card.component';
import Input from '../../shared/components/FormElements/Input.component';
import {
  VALIDATOR_EMAIL,
  VALIDATOR_MINLENGTH,
  VALIDATOR_REQUIRE,
} from '../../shared/util/validators';
import { useForm } from '../../shared/hooks/form-hook';
import { AuthContext } from '../../shared/context/auth-context';

import './Auth.styles.css';

const Auth = () => {
  const auth = useContext(AuthContext);
  const [isLoginMode, setIsLoginMode] = useState(true);

  const [formState, inputHandler, setFormData] = useForm(
    {
      email: {
        value: '',
        isValid: false,
      },
      password: {
        value: '',
        isValid: false,
      },
    },
    false
  );

  const switchModeHandler = () => {
    if (!isLoginMode) {
      setFormData(
        {
          ...formState.inputs,
          prenom: undefined,
          nom: undefined,
        },
        formState.inputs.email.isValid && formState.inputs.password.isValid
      );
    } else {
      setFormData(
        {
          ...formState.inputs,
          prenom: {
            value: '',
            isValid: false,
          },
          nom: {
            value: '',
            isValid: false,
          },
        },
        false
      );
    }
    setIsLoginMode((prevMode) => !prevMode);
  };

  const authSubmitHandler = (event) => {
    event.preventDefault();
    console.log(formState.inputs);
    auth.login();
  };

  return (
    <Card className="authentication">
      <h2>{!isLoginMode ? 'Inscription' : 'Connexion'}</h2>
      <hr />
      <form onSubmit={authSubmitHandler}>
        {!isLoginMode && (
          <>
            <Input
              element="input"
              id="prenom"
              type="text"
              label="Prenom"
              validators={[VALIDATOR_REQUIRE()]}
              errorText="Veuillez entrer votre prenom."
              onInput={inputHandler}
            />
            <Input
              element="input"
              id="nom"
              type="text"
              label="Nom"
              validators={[VALIDATOR_REQUIRE()]}
              errorText="Veuillez entrer votre nom."
              onInput={inputHandler}
            />
          </>
        )}
        <Input
          element="input"
          id="email"
          type="email"
          label="E-Mail"
          validators={[VALIDATOR_EMAIL()]}
          errorText="S'il vous plaît, mettez une adresse email valide."
          onInput={inputHandler}
        />
        <Input
          element="input"
          id="password"
          type="password"
          label="Mot de passe"
          validators={[VALIDATOR_MINLENGTH(5)]}
          errorText="Veuillez entrer un mot de passe valide, au moins 5 caractères."
          onInput={inputHandler}
        />
        <Button type="submit" disabled={!formState.isValid}>
          {isLoginMode ? 'Se connecter' : "S'inscrire"}
        </Button>
      </form>
      <Button inverse onClick={switchModeHandler}>
        BASCULER VERS {isLoginMode ? 'Inscription' : 'Connexion'}
      </Button>
    </Card>
  );
};

export default Auth;
