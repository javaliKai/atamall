import { Link } from 'react-router-dom';
import { Card, Label, TextInput, Button } from 'flowbite-react';
import RegisterForm from '../components/auth/RegisterForm';

const Register = () => {
  return (
    <div className='md:flex md:justify-center'>
      <Card className='mt-5 md:w-[35vw]'>
        <h2 className='text-center text-3xl font-bold'>Register</h2>
        <RegisterForm />
        <div className='mt-2'>
          <p>
            Already have an account?{' '}
            <Link to='/signin' className='font-bold hover:text-underline'>
              sign in here
            </Link>
          </p>
        </div>
      </Card>
    </div>
  );
};

export default Register;
