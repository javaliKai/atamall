import { Modal, Button } from 'flowbite-react';
import { useContext } from 'react';
import UserContext from '../../lib/store/userContext';
import UIContext from '../../lib/store/uiContext';
import ProductContext from '../../lib/store/productContext';

const DeleteConfirmation = ({ productTitle, productId }) => {
  const { token } = useContext(UserContext);
  const { toggleDeleteProductModal, setAlert } = useContext(UIContext);
  const { deleteProduct } = useContext(ProductContext);

  const deleteProductHandler = async () => {
    const result = await deleteProduct(productId, token);
    if (result.success) {
      setAlert({ type: 'success', message: 'Product deleted!' });
    } else {
      setAlert({ type: 'failure', message: result.error });
    }
    toggleDeleteProductModal(false);
  };

  return (
    <Modal
      show={true}
      size='md'
      onClose={() => toggleDeleteProductModal(false)}
      popup
    >
      <Modal.Header />
      <Modal.Body>
        <div className='text-center'>
          <h3 className='mb-5 text-lg font-normal text-gray-500 dark:text-gray-400'>
            Are you sure you want to delete this product?
          </h3>
          <p className='mb-5 text-gray-500 font-bold'>
            Product Title: {productTitle}
          </p>
          <div className='flex justify-center gap-4'>
            <Button color='failure' onClick={() => deleteProductHandler()}>
              {"Yes, I'm sure"}
            </Button>
            <Button
              color='gray'
              onClick={() => toggleDeleteProductModal(false)}
            >
              No, cancel
            </Button>
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default DeleteConfirmation;
