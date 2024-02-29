import axios from 'axios';
import { createContext, useState } from 'react';

const ProductContext = createContext({
  products: [],
  getProducts: () => {},
});

export const ProductContextProvider = ({ children }) => {
  const [products, setProducts] = useState([]);

  const getProducts = async () => {
    const result = {
      products: [],
      errorObj: undefined,
    };

    try {
      const response = await axios.get('/api/product');
      const products = response.data.products;
      setProducts(products);
      result.products = products;
    } catch (error) {
      result.errorObj = error.response.data;
    }
    return result;
  };

  return (
    <ProductContext.Provider
      value={{
        products,
        getProducts,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};

export default ProductContext;
