import { useContext, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Label, TextInput, Button } from 'flowbite-react';
import UserContext from '../../lib/store/userContext';
import UIContext from '../../lib/store/uiContext';

const SigninForm = () => {
  const navigate = useNavigate();
  const { signIn } = useContext(UserContext);
  const { setAlert } = useContext(UIContext);
  const emailRef = useRef();
  const passwordRef = useRef();

  const signinHandler = async (e) => {
    e.preventDefault();

    const emailInput = emailRef.current.value;
    const passwordInput = passwordRef.current.value;

    // Send auth request via user context
    const result = await signIn(emailInput, passwordInput);

    // handle error
    if (!result.user) {
      return setAlert({ type: 'failure', message: result.errorObj.message });
    }

    // if success, redirect to main page
    setAlert({
      type: 'success',
      message: `Login success! Welcome, ${result.user.name}`,
    });
    return navigate('/');
  };

  return (
    <form onSubmit={signinHandler} className='flex flex-col gap-4'>
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
          <Label htmlFor='password1' value='Your password' />
        </div>
        <TextInput
          ref={passwordRef}
          id='password1'
          type='password'
          minLength={6}
          required
        />
      </div>
      <Button type='submit'>Sign In</Button>
    </form>
  );
};

export default SigninForm;
