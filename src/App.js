import { Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import { useCallback, useEffect, useState } from 'react';

import Users from './user/pages/Users.component';
import NewProduct from './products/pages/NewProduct.component';
import UserProducts from './products/pages/UserProducts.component';
import Layout from './shared/components/Layout/Layout.component';
import UpdateProduct from './products/pages/UpdateProduct.component';
import Auth from './user/pages/Auth.component';
import { AuthContext } from './shared/context/auth-context';
import Products from './products/pages/Products.component';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userId, setUserId] = useState(false);

  const navigate = useNavigate();

  const login = useCallback((uid) => {
    setIsLoggedIn(true);
    setUserId(uid);
  }, []);

  const logout = useCallback(() => {
    setIsLoggedIn(false);
    setUserId(null);
  }, []);

  let routes;

  if (isLoggedIn) {
    routes = (
      <>
        <Route index element={<Users />} />
        <Route path="/products" element={<Products />} />
        <Route path="/:userId/products" element={<UserProducts />} />
        <Route path="/products/new" element={<NewProduct />} />
        <Route path="/products/:productId" element={<UpdateProduct />} />
        <Route path="/auth" element={<Auth />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </>
    );
  } else {
    routes = (
      <>
        <Route index element={<Users />} />
        <Route path="/products" element={<Products />} />
        <Route path="/:userId/products" element={<UserProducts />} />
        <Route path="/auth" element={<Auth />} />
        <Route path="*" element={<Navigate to="/auth" replace />} />
      </>
    );
  }

  useEffect(() => {
    if (isLoggedIn) {
      return navigate('/');
    }
  }, [isLoggedIn]);

  return (
    <AuthContext.Provider value={{ isLoggedIn, login, logout, userId }}>
      <Routes>
        <Route path="/" element={<Layout />}>
          {routes}
        </Route>
      </Routes>
    </AuthContext.Provider>
  );
}

export default App;
