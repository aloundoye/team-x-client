import { NavLink } from 'react-router-dom';
import { useContext } from 'react';

import { AuthContext } from '../../context/auth-context';

import './NavLinks.styles.css';

const NavLinks = (props) => {
  const auth = useContext(AuthContext);

  return (
    <nav className={props.className}>
      <ul className="nav-links">
        <li>
          <NavLink to="/" end>
            TOUS LES UTILISATEURS
          </NavLink>
        </li>
        <li>
          <NavLink to="/products" end>
            TOUS LES PRODUITS
          </NavLink>
        </li>
        {auth.isLoggedIn && (
          <li>
            <NavLink to={`/${auth.userId}/products`}>MES PRODUITS</NavLink>
          </li>
        )}
        {auth.isLoggedIn && (
          <li>
            <NavLink to="/products/new">AJOUTER PRODUIT</NavLink>
          </li>
        )}

        {!auth.isLoggedIn && (
          <li>
            <NavLink to="/auth">SE CONNECTER</NavLink>
          </li>
        )}

        {auth.isLoggedIn && (
          <li>
            <button onClick={auth.logout}>SE DECONNECTER</button>
          </li>
        )}
      </ul>
    </nav>
  );
};

export default NavLinks;
