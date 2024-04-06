import { Button, TextInput, Select } from 'flowbite-react';
import { useContext } from 'react';
import UIContext from '../../lib/store/uiContext';
import ProductFormModal from './ProductFormModal';

const ProductAction = ({ query, setQuery }) => {
  const { showAddProductModal, toggleAddProductModal } = useContext(UIContext);

  return (
    <>
      {showAddProductModal && <ProductFormModal />}
      <div className='md:flex justify-between items-center'>
        <div className='flex gap-3 mb-3'>
          <TextInput
            className='w-[25rem]'
            type='text'
            placeholder='Search product'
            value={query.keyword}
            onChange={(e) =>
              setQuery((prevState) => {
                return { ...prevState, keyword: e.target.value };
              })
            }
          />
          <Select
            onChange={(e) =>
              setQuery((prevState) => {
                return {
                  ...prevState,
                  category: e.target.value,
                };
              })
            }
          >
            <option value='all'>All</option>
            <option value='electronics'>Electronics</option>
            <option value="men's clothing">Men's Clothing</option>
            <option value="women's clothing">Women's Clothing</option>
            <option value='jewelery'>Jewelry</option>
          </Select>
        </div>
        <Button onClick={() => toggleAddProductModal(true)}>
          Add New Product
        </Button>
      </div>
    </>
  );
};

export default ProductAction;
