import { Modal, Button } from 'flowbite-react';
import { useContext } from 'react';
import UIContext from '../../lib/store/uiContext';
import OrderContext from '../../lib/store/orderContext';
import UserContext from '../../lib/store/userContext';

const OrderConfirmModal = ({ orderId, isCancelling }) => {
  const { showConfirmOrderModal, toggleConfirmOrderModal, setAlert } =
    useContext(UIContext);
  const { finishOrder, cancelOrder } = useContext(OrderContext);
  const { token } = useContext(UserContext);

  const confirmOrderHandler = async (e) => {
    e.preventDefault();

    if (!token) return;

    toggleConfirmOrderModal(false);

    if (!isCancelling) {
      const result = await finishOrder(orderId, token);

      if (!result.success) {
        setAlert({ type: 'failure', message: result.errorObj.message });
        return;
      }

      setAlert({ type: 'success', message: 'Order finished!' });
    } else {
      const result = await cancelOrder(orderId, token);

      if (!result.success) {
        setAlert({ type: 'failure', message: result.errorObj.message });
        return;
      }

      setAlert({ type: 'success', message: 'Order cancelled!' });
    }
  };

  let modalTitle;
  if (isCancelling) {
    modalTitle = 'Cancel';
  } else {
    modalTitle = 'Finish';
  }

  return (
    <Modal
      show={showConfirmOrderModal}
      onClose={() => toggleConfirmOrderModal(false)}
    >
      <form onSubmit={(e) => confirmOrderHandler(e)}>
        <Modal.Header>Confirm {modalTitle} Order</Modal.Header>
        <Modal.Body>
          <p>Are you sure want to {modalTitle.toLowerCase()} order?</p>
        </Modal.Body>
        <Modal.Footer>
          <Button type='submit'>Yes</Button>
          <Button onClick={() => toggleConfirmOrderModal(false)} color='gray'>
            No, return
          </Button>
        </Modal.Footer>
      </form>
    </Modal>
  );
};

export default OrderConfirmModal;
