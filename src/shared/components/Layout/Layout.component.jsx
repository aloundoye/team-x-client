import { Outlet } from 'react-router-dom';

import MainNavigation from '../Navigation/MainNavigation.component';

const Layout = () => {
  return (
    <>
      <MainNavigation />
      <main>
        <Outlet />
      </main>
    </>
  );
};

export default Layout;