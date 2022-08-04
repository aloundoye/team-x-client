import { Link } from 'react-router-dom';

import MainHeader from './MainHeader.component';
import NavLinks from './NavLinks.component';
import SideDrawer from './SideDrawer.component';
import Backdrop from '../UIElements/Backdrop.component';

import './MainNavigation.styles.css';
import { useState } from 'react';

const MainNavigation = () => {
  const [drawerIsOpen, setDrawerIsOpen] = useState(false);

  const openDrawerHandler = () => {
    setDrawerIsOpen(true);
  };

  const closeDrawerHandler = () => {
    setDrawerIsOpen(false);
  };

  return (
    <>
      {drawerIsOpen && <Backdrop onClick={closeDrawerHandler} />}

      <SideDrawer show={drawerIsOpen} onClick={closeDrawerHandler}>
        <NavLinks className="main-navigation__drawer-nav" />
      </SideDrawer>

      <MainHeader>
        <button className="main-navigation__menu-btn" onClick={openDrawerHandler}>
          <span />
          <span />
          <span />
        </button>
        <h1 className="main-navigation__title">
          <Link to="/">TEAM-X GROUP</Link>
        </h1>
        <NavLinks className="main-navigation__header-nav" />
      </MainHeader>
    </>
  );
};

export default MainNavigation;
