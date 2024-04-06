import {
  Modal,
  TextInput,
  Label,
  Textarea,
  Button,
  Select,
} from 'flowbite-react';
import { useContext, useState } from 'react';
import UIContext from '../../lib/store/uiContext';
import ProductContext from '../../lib/store/productContext';
import UserContext from '../../lib/store/userContext';

const ProductFormModal = ({ type, productId }) => {
  const { toggleEditProductModal, toggleAddProductModal, setAlert } =
    useContext(UIContext);
  const { products, editProduct, addProduct } = useContext(ProductContext);
  const { token } = useContext(UserContext);

  let currentProduct = undefined;
  if (type === 'edit') {
    currentProduct = products.find((prod) => prod._id === productId);
  }

  const [formData, setFormData] = useState({
    title: type === 'edit' ? currentProduct.title : '',
    price: type === 'edit' ? currentProduct.price : '',
    description: type === 'edit' ? currentProduct.description : '',
    category: type === 'edit' ? currentProduct.category : '',
    image: type === 'edit' ? currentProduct.image : '',
  });

  const submitFormHandler = async (e) => {
    e.preventDefault();
    const productObj = {
      ...formData,
      _id: productId,
    };

    if (type === 'edit') {
      const result = await editProduct(productObj, token);
      if (result.success) {
        setAlert({ type: 'success', message: 'Product updated!' });
      } else {
        setAlert({ type: 'failure', message: result.error });
      }

      toggleEditProductModal(false);
    } else {
      const result = await addProduct(formData, token);
      if (result.success) {
        setAlert({ type: 'success', message: 'New product added!' });
      } else {
        setAlert({ type: 'failure', message: result.error });
      }
      toggleAddProductModal(false);
    }
  };

  // Dynamic elements
  const header = type === 'edit' ? 'Edit Product' : 'Add New Product';
  const submitBtnValue = type === 'edit' ? 'Update' : 'Add';

  return (
    <Modal
      show={true}
      onClose={() => {
        toggleEditProductModal(false);
      }}
      theme={{
        content: {
          base: 'relative h-full w-full p-4 md:h-auto',
          inner:
            'relative rounded-lg bg-white shadow dark:bg-gray-700 flex flex-col max-h-[100vh]',
        },
      }}
    >
      <form onSubmit={(e) => submitFormHandler(e)}>
        <Modal.Header>{header}</Modal.Header>
        <Modal.Body>
          <div className='space-y-1'>
            <div>
              <div className='mb-2 block'>
                <Label htmlFor='title' value='Title' />
              </div>
              <TextInput
                id='title'
                type='text'
                sizing='sm'
                value={formData.title}
                onChange={(e) =>
                  setFormData((prevState) => {
                    return { ...prevState, title: e.target.value };
                  })
                }
                required
              />
            </div>
            <div>
              <div className='mb-2 block'>
                <Label htmlFor='price' value='Price' />
              </div>
              <TextInput
                id='price'
                type='number'
                min={0}
                step={0.01}
                value={formData.price}
                onChange={(e) =>
                  setFormData((prevState) => {
                    return { ...prevState, price: e.target.value };
                  })
                }
                sizing='sm'
                required
              />
            </div>
            <div>
              <div className='mb-2 block'>
                <Label htmlFor='category' value='Category' />
              </div>
              <Select
                id='category'
                required
                value={formData.category}
                onChange={(e) =>
                  setFormData((prevState) => {
                    return { ...prevState, category: e.target.value };
                  })
                }
              >
                <option value='electronics'>Electronics</option>
                <option value="men's clothing">Men's Clothing</option>
                <option value="women's clothing">Women's Clothing</option>
                <option value='jewelery'>Jewelry</option>{' '}
              </Select>
            </div>
            <div>
              <div className='mb-2 block'>
                <Label htmlFor='image' value='Image Link' />
              </div>
              <TextInput
                id='image'
                type='text'
                sizing='sm'
                value={formData.image}
                onChange={(e) =>
                  setFormData((prevState) => {
                    return { ...prevState, image: e.target.value };
                  })
                }
                required
              />
            </div>
            <div>
              <div className='mb-2 block'>
                <Label htmlFor='description' value='Product Description' />
              </div>
              <Textarea
                id='description'
                required
                rows={4}
                value={formData.description}
                onChange={(e) =>
                  setFormData((prevState) => {
                    return { ...prevState, description: e.target.value };
                  })
                }
              />
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button type='submit'>{submitBtnValue}</Button>
          <Button onClick={() => toggleEditProductModal(false)} color='gray'>
            Return
          </Button>
        </Modal.Footer>
      </form>
    </Modal>
  );
};

export default ProductFormModal;
