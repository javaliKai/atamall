import { useRef, useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Label, TextInput, Button, Alert } from 'flowbite-react';
import UIContext from '../../lib/store/uiContext';

const RegisterForm = () => {
  const nameRef = useRef(null);
  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const rePasswordRef = useRef(null);

  const navigate = useNavigate();
  const { setAlert } = useContext(UIContext);
  const [formError, setFormError] = useState('');

  const registerHandler = (e) => {
    e.preventDefault();

    const nameInput = nameRef.current.value.trim();
    const emailInput = emailRef.current.value.trim();
    const passwordInput = passwordRef.current.value.trim();
    const rePasswordInput = rePasswordRef.current.value.trim();

    // Validation
    const nameClear = nameInput.length > 0;
    const emailClear = emailInput.length > 0;
    const passwordClear = passwordInput.length >= 6;
    const rePasswordClear = rePasswordInput.length >= 6;
    const passwordMatch = passwordInput === rePasswordInput;

    if (
      nameClear &&
      emailClear &&
      passwordClear &&
      rePasswordClear &&
      passwordMatch
    ) {
      // call register api here
      axios
        .post('/api/user/', {
          name: nameInput,
          email: emailInput,
          password: passwordInput,
          rePassword: rePasswordInput,
        })
        .then((response) => {
          // if the code reach this scope, then register is success
          setAlert({
            type: 'success',
            message: 'Register succes. You can now sign in.',
          });
          // navigate to the signin page
          navigate('/signin');
        })
        .catch((error) => {
          setFormError(error.response.data.message);
        });
    } else if (!passwordMatch) {
      setFormError('Password and Re-type password must match!');
    } else {
      setFormError(
        'Form submission failed. Please make sure to fill in correctly.'
      );
    }
  };

  return (
    <form onSubmit={registerHandler} className='flex max-w-md flex-col gap-4'>
      {formError && <Alert color='failure'>{formError}</Alert>}
      <div>
        <div className='mb-2 block'>
          <Label htmlFor='name' value='Name' />
        </div>
        <TextInput ref={nameRef} id='name' type='text' required />
      </div>
      <div>
        <div className='mb-2 block'>
          <Label htmlFor='email1' value='Your email' />
        </div>
        <TextInput
          ref={emailRef}
          id='email1'
          type='email'
          placeholder='name@flowbite.com'
          required
        />
      </div>
      <div>
        <div className='mb-2 block'>
          <Label htmlFor='password1' value='Password' />
        </div>
        <TextInput ref={passwordRef} id='password1' type='password' required />
      </div>
      <div>
        <div className='mb-2 block'>
          <Label htmlFor='password2' value='Re-type Password' />
        </div>
        <TextInput
          ref={rePasswordRef}
          id='password2'
          type='password'
          required
        />
      </div>
      <Button type='submit'>Register</Button>
    </form>
  );
};

export default RegisterForm;
