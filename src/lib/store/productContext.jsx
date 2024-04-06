import axios from 'axios';
import { createContext, useState } from 'react';

const ProductContext = createContext({
  products: [],
  getProducts: () => {},
  editProduct: (productObj, token) => {},
  deleteProduct: (productId, token) => {},
  addProduct: (productObj, token) => {},
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

  const editProduct = async (productObj, token) => {
    const result = {
      success: false,
      error: '',
    };
    try {
      await axios.put(`/api/admin/product/${productObj._id}`, productObj, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      // const updatedProduct = response.data.updatedProduct;
      getProducts();
      result.success = true;
    } catch (error) {
      result.errorObj = error.response.data;
    }

    return result;
  };

  const deleteProduct = async (productId, token) => {
    const result = {
      success: false,
      error: '',
    };

    try {
      await axios.delete(`/api/admin/product/${productId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      getProducts();
      result.success = true;
    } catch (error) {
      result.errorObj = error.response.data;
    }

    return result;
  };

  const addProduct = async (productObj, token) => {
    const result = {
      success: false,
      error: '',
    };
    try {
      await axios.post(`/api/admin/product`, productObj, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      getProducts();
      result.success = true;
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
        editProduct,
        deleteProduct,
        addProduct,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};

export default ProductContext;
