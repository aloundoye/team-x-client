import { NavLink } from 'react-router-dom';

import './NavLinks.styles.css';

const NavLinks = (props) => {
  return (
    <nav className={props.className}>
      <ul className="nav-links">
        <li>
          <NavLink to="/" end>TOUS LES UTILISATEURS</NavLink>
        </li>
        <li>
          <NavLink to="/products" end>TOUS LES PRODUITS</NavLink>
        </li>
        <li>
          <NavLink to="/u1/products">MES PRODUITS</NavLink>
        </li>
        <li>
          <NavLink to="/products/new">AJOUTER PRODUIT</NavLink>
        </li>
        <li>
          <NavLink to="/auth">SE CONNECTER</NavLink>
        </li>

      </ul>
    </nav>
  );
};

export default NavLinks;
