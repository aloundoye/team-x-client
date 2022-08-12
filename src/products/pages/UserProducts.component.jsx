import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import ProductList from '../components/ProductList.component';
import ErrorModal from '../../shared/components/UIElements/ErrorModal.component';
import LoadingSpinner from '../../shared/components/UIElements/LoadingSpinner.component';
import { useHttpClient } from '../../shared/hooks/http-hook';

const UserProducts = () => {
  const userId = useParams().userId;
  const [loadedProducts, setLoadedProducts] = useState();
  const { isLoading, error, sendRequest, clearError } = useHttpClient();

  useEffect(() => {
    const fetchUserProducts = async () => {
      try {
        const data = await sendRequest(
          `http://localhost:5000/api/products/user/${userId}`
        );
        setLoadedProducts(data.products);
      } catch (err) {}
    };

    fetchUserProducts();
  }, []);

  return (
    <>
      <ErrorModal error={error} onClear={clearError} />
      {isLoading && (
        <div className="center">
          <LoadingSpinner asOverlay />
        </div>
      )}
      {!isLoading && loadedProducts && (
        <ProductList products={loadedProducts} error={error} />
      )}
    </>
  );
};

export default UserProducts;
