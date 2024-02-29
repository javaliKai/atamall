import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { Card, Label, TextInput, Button } from 'flowbite-react';
import SigninForm from '../components/auth/SigninForm';

const SignIn = () => {
  return (
    <Card className='mt-5'>
      <h2 className='text-center text-3xl font-bold'>Sign In</h2>
      <SigninForm />
      <div className='mt-2'>
        <p>
          Don't have an account?{' '}
          <Link to='/register' className='font-bold hover:text-underline'>
            register here
          </Link>
        </p>
      </div>
    </Card>
  );
};

export default SignIn;
