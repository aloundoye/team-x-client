import { Routes, Route, Navigate } from 'react-router-dom';

import Users from './user/pages/Users.component';
import NewProduct from './products/pages/NewProduct.component';
import UserProducts from './products/pages/UserProducts.component';
import Layout from './shared/components/Layout/Layout.component';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Users />} />
        <Route path="/:userId/products" element={<UserProducts />} />
        <Route path="/products/new" element={<NewProduct />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Route>
    </Routes>
  );
}

export default App;
