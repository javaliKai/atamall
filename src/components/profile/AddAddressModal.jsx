import { useContext, useRef } from 'react';
import axios from 'axios';
import { Button, Modal, Textarea } from 'flowbite-react';
import { Label, TextInput } from 'flowbite-react';
import UIContext from '../../lib/store/uiContext';
import UserContext from '../../lib/store/userContext';

const AddAddressModal = () => {
  const { showAddressModal, toggleAddressModal, setAlert } =
    useContext(UIContext);
  const { user, token, tradeToken } = useContext(UserContext);

  const countryRef = useRef(null);
  const provinceRef = useRef(null);
  const stateRef = useRef(null);
  const addressDetailRef = useRef(null);

  const addAddressFormHandler = (e) => {
    e.preventDefault();
    const country = countryRef.current.value;
    const province = provinceRef.current.value;
    const state = stateRef.current.value;
    const addressDetail = addressDetailRef.current.value;

    const reqBody = {
      country,
      province,
      state,
      detail: addressDetail,
    };

    const reqHeader = {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    };

    // make a post request when no address is found
    if (user.address.length === 0) {
      axios
        .post(`/api/user/address`, reqBody, reqHeader)
        .then(() => {
          setAlert({ type: 'success', message: 'Address added!' });
          countryRef.current.value = '';
          provinceRef.current.value = '';
          stateRef.current.value = '';
          addressDetailRef.current.value = '';
          tradeToken(token);
          toggleAddressModal(false);
        })
        .catch((error) => {
          setAlert({ type: 'failure', message: error.response.data.message });
        });
    } else {
      const addressId = user.address[0]._id;

      axios
        .put(`/api/user/address/${addressId}`, reqBody, reqHeader)
        .then((response) => {
          setAlert({ type: 'success', message: 'Address updated!' });
          countryRef.current.value = '';
          provinceRef.current.value = '';
          stateRef.current.value = '';
          addressDetailRef.current.value = '';
          tradeToken(token);
          toggleAddressModal(false);
        })
        .catch((error) => {
          setAlert({ type: 'failure', message: error.response.data.message });
        });
    }
  };

  return (
    <Modal show={showAddressModal} onClose={() => toggleAddressModal(false)}>
      <form onSubmit={(e) => addAddressFormHandler(e)}>
        <Modal.Header>Add New Address</Modal.Header>
        <Modal.Body>
          <div className='space-y-6'>
            <div>
              <div className='mb-2 block'>
                <Label htmlFor='small' value='Country' />
              </div>
              <TextInput
                id='small'
                type='text'
                sizing='sm'
                ref={countryRef}
                required
              />
            </div>
            <div>
              <div className='mb-2 block'>
                <Label htmlFor='small' value='Province' />
              </div>
              <TextInput
                id='small'
                type='text'
                sizing='sm'
                required
                ref={provinceRef}
              />
            </div>
            <div>
              <div className='mb-2 block'>
                <Label htmlFor='small' value='State' />
              </div>
              <TextInput
                id='small'
                type='text'
                sizing='sm'
                required
                ref={stateRef}
              />
            </div>
            <div>
              <div className='mb-2 block'>
                <Label htmlFor='small' value='Address Detail' />
              </div>
              <Textarea id='small' required rows={4} ref={addressDetailRef} />
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button type='submit'>Add</Button>
          <Button onClick={() => toggleAddressModal(false)} color='gray'>
            Return
          </Button>
        </Modal.Footer>
      </form>
    </Modal>
  );
};

export default AddAddressModal;
