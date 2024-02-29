import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import {
  Button,
  Spinner,
  Accordion,
  AccordionContent,
  TextInput,
} from 'flowbite-react';
import { useContext, useState, useRef } from 'react';
import { MdPerson } from 'react-icons/md';
import { FaEdit } from 'react-icons/fa';
import { IoMdLogOut } from 'react-icons/io';
import UIContext from '../../lib/store/uiContext';
import UserContext from '../../lib/store/userContext';

const CustomerProfileCard = () => {
  const navigate = useNavigate();
  const { toggleAddressModal, setAlert } = useContext(UIContext);
  const { user, token, tradeToken, signOut } = useContext(UserContext);
  // States
  const [editingName, setEditingName] = useState(false);
  const [editNameInput, setEditNameInput] = useState('');
  const [editingPhone, setEditingPhone] = useState(false);
  const [editPhoneInput, setEditPhoneInput] = useState('');

  if (!user) {
    return (
      <div className='min-h-[50vw] text-center'>
        <Spinner className='w-[5rem] h-[5rem]' />
      </div>
    );
  }
  const { name, email, phone, address, order } = user;

  // Event handlers
  const cancelEditNameHandler = () => {
    setEditNameInput('');
    setEditingName(false);
  };

  const editNameHandler = () => {
    // reject if name is empty
    if (editNameInput.trim().length === 0) {
      setAlert({ type: 'failure', message: 'New name cannot be empty.' });
      return;
    }
    // send update request
    axios
      .put(
        '/api/user/name',
        {
          name: editNameInput,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        }
      )
      .then((response) => {
        // send feedback message via alert
        setAlert({ type: 'success', message: 'Name updated!' });
        // refresh page
        setEditingName(false);
        setEditNameInput('');
        tradeToken(token);
      })
      .catch((err) => {
        setAlert({ type: 'failure', message: err.response.data.message });
        return;
      });
  };

  const cancelEditingPhoneHandler = () => {
    setEditPhoneInput('');
    setEditingPhone(false);
  };

  const editPhoneHandler = () => {
    // reject if phone is empty
    if (editPhoneInput.trim().length === 0) {
      setAlert({ type: 'failure', message: 'New phone cannot be empty.' });
      return;
    }

    // send update request
    axios
      .put(
        '/api/user/phone',
        {
          phone: editPhoneInput,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        }
      )
      .then((response) => {
        // send feedback message via alert
        setAlert({ type: 'success', message: 'Phone updated!' });
        // refresh page
        setEditingPhone(false);
        setEditPhoneInput('');
        tradeToken(token);
      })
      .catch((err) => {
        setAlert({ type: 'failure', message: err.response.data.message });
        return;
      });
  };

  // Dynamic content
  let addressContent;
  if (address.length !== 0) {
    const prioritizedAddress = address[0];
    addressContent = (
      <>
        <p>Country: {prioritizedAddress.country}</p>
        <p>Province: {prioritizedAddress.province}</p>
        <p>State: {prioritizedAddress.state}</p>
        <p>Detail: {prioritizedAddress.detail}</p>
      </>
    );
  } else {
    addressContent = <p>No address found.</p>;
  }
  return (
    <div className='max-w-sm mx-auto bg-white shadow-lg rounded-sm border border-gray-200'>
      <h2 className='text-3xl p-3 font-bold text-center'>Profile</h2>
      <hr />
      <div className='flex flex-col h-full'>
        {/* <div className='flex-grow p-5'> */}
        <div>
          <div className=''>
            <div className='mt-1 pr-1'>
              <div className='flex flex-col gap-5 px-6 py-2 my-5'>
                <div className='flex items-center gap-3'>
                  <span>
                    <MdPerson className='text-[20vw] z-11 text-yellow-400 border border-slate-300 rounded-full' />
                  </span>
                  <div>
                    {editingName ? (
                      // <div className='flex gap-2'>
                      <div>
                        <TextInput
                          placeholder={name}
                          onChange={(e) => setEditNameInput(e.target.value)}
                        />
                        <div className=' mt-3 flex gap-3'>
                          <Button
                            onClick={() => editNameHandler()}
                            color='success'
                            size='xs'
                          >
                            Update
                          </Button>
                          <Button
                            onClick={() => cancelEditNameHandler()}
                            color='failure'
                            size='xs'
                          >
                            Cancel
                          </Button>
                        </div>
                      </div>
                    ) : (
                      <div className='flex gap-5'>
                        <span className='text-xl font-bold'>{name}</span>
                        <Button
                          onClick={() => setEditingName(true)}
                          size='xs'
                          outline
                        >
                          <FaEdit
                            size='1rem'
                            className='text-cyan-700 hover:text-white'
                          />
                        </Button>
                      </div>
                    )}
                  </div>
                </div>
                <Accordion>
                  <Accordion.Panel>
                    <Accordion.Title>User Info</Accordion.Title>
                    <Accordion.Content>
                      <p>
                        <strong>Email</strong>: {email}
                      </p>
                      {editingPhone ? (
                        <div className='mt-5'>
                          <TextInput
                            placeholder={phone}
                            onChange={(e) => setEditPhoneInput(e.target.value)}
                          />
                          <div className=' mt-3 flex gap-3'>
                            <Button
                              onClick={() => editPhoneHandler()}
                              color='success'
                              size='xs'
                            >
                              Update
                            </Button>
                            <Button
                              onClick={() => cancelEditingPhoneHandler()}
                              color='failure'
                              size='xs'
                            >
                              Cancel
                            </Button>
                          </div>
                        </div>
                      ) : (
                        <div className='flex gap-5 mt-5'>
                          <p>
                            <strong>Phone</strong>: {phone || '-'}
                          </p>
                          <Button
                            onClick={() => setEditingPhone(true)}
                            size='xs'
                            outline
                          >
                            <FaEdit
                              size='1rem'
                              className='text-cyan-700 hover:text-white'
                            />
                          </Button>
                        </div>
                      )}
                    </Accordion.Content>
                  </Accordion.Panel>
                  <Accordion.Panel>
                    <Accordion.Title>Address</Accordion.Title>
                    <Accordion.Content>
                      <div className='mb-5'>
                        <h2 className='text-md font-semibold'>Address:</h2>
                        {addressContent}
                      </div>
                      <div>
                        <h2 className='text-md font-semibold mb-2'>Action:</h2>
                        <Button onClick={() => toggleAddressModal(true)}>
                          Add Address
                        </Button>
                      </div>
                    </Accordion.Content>
                  </Accordion.Panel>
                  <Accordion.Panel>
                    <Accordion.Title>Orders</Accordion.Title>
                    <Accordion.Content>
                      <div>No orders found.</div>
                    </Accordion.Content>
                  </Accordion.Panel>
                </Accordion>
                <Button color='failure' onClick={() => signOut()}>
                  Sign Out {'  '}
                  <IoMdLogOut size='1.1rem' className='mx-1' />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomerProfileCard;
