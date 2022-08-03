import { Routes, Route, Navigate } from 'react-router-dom';

import Users from './user/pages/Users.component';
import NewProduct from './products/pages/NewProduct.component';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Users />} />
      <Route path="/products/new" element={<NewProduct />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default App;
