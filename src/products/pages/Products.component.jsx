import { useState, useEffect } from 'react';

import ProductList from '../components/ProductList.component';
import ErrorModal from '../../shared/components/UIElements/ErrorModal.component';
import LoadingSpinner from '../../shared/components/UIElements/LoadingSpinner.component';
import { useHttpClient } from '../../shared/hooks/http-hook';

const Products = () => {
  const [loadedProducts, setLoadedProducts] = useState();
  const { isLoading, error, sendRequest, clearError } = useHttpClient();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await sendRequest('http://localhost:5000/api/products');
        setLoadedProducts(data.products);
      } catch (err) {}
    };

    fetchProducts();
  }, []);

  return (
    <>
      <ErrorModal error={error} onClear={clearError} />
      {isLoading && (
        <div className="center">
          <LoadingSpinner asOverlay />
        </div>
      )}
      {!isLoading && loadedProducts && <ProductList products={loadedProducts} error={error}/>}
    </>
  );
};

export default Products;
