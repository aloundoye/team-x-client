import { useState, useContext } from 'react';

import Button from '../../shared/components/FormElements/Button.component';
import Card from '../../shared/components/UIElements/Card.component';
import Input from '../../shared/components/FormElements/Input.component';
import ErrorModal from '../../shared/components/UIElements/ErrorModal.component';
import LoadingSpinner from '../../shared/components/UIElements/LoadingSpinner.component';
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
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();

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
          firstname: undefined,
          lastname: undefined,
        },
        formState.inputs.email.isValid && formState.inputs.password.isValid
      );
    } else {
      setFormData(
        {
          ...formState.inputs,
          firstname: {
            value: '',
            isValid: false,
          },
          lastname: {
            value: '',
            isValid: false,
          },
        },
        false
      );
    }
    setIsLoginMode((prevMode) => !prevMode);
  };

  const authSubmitHandler = async (event) => {
    event.preventDefault();
    let data;
    setIsLoading(true);
    if (isLoginMode) {
      try {
        const response = await fetch('http://localhost:5000/api/users/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            email: formState.inputs.email.value,
            password: formState.inputs.password.value,
          }),
        });

        data = await response.json();

        if (!response.ok) {
          throw new Error(data.message);
        }

        auth.login();
      } catch (err) {
        setError(err.message || 'Une erreur inconnue est survenue!');
      }
    } else {
      try {
        const response = await fetch('http://localhost:5000/api/users/signup', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            firstname: formState.inputs.firstname.value,
            lastname: formState.inputs.lastname.value,
            email: formState.inputs.email.value,
            password: formState.inputs.password.value,
          }),
        });

        data = await response.json();

        if (!response.ok) {
          throw new Error(data.message);
        }

        auth.login();
      } catch (err) {
        setError(err.message || 'Une erreur inconnue est survenue!');
      }
    }
    setIsLoading(false);
  };

  const errorHandler = () => {
    setError(null);
  };

  return (
    <>
      <ErrorModal error={error} onClear={errorHandler} />
      <Card className="authentication">
        {isLoading && <LoadingSpinner asOverlay />}
        <h2>{!isLoginMode ? 'Inscription' : 'Connexion'}</h2>
        <hr />
        <form onSubmit={authSubmitHandler}>
          {!isLoginMode && (
            <>
              <Input
                element="input"
                id="firstname"
                type="text"
                label="Prenom"
                validators={[VALIDATOR_REQUIRE()]}
                errorText="Veuillez entrer votre prenom."
                onInput={inputHandler}
              />
              <Input
                element="input"
                id="lastname"
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
    </>
  );
};

export default Auth;
