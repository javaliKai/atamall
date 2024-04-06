import { Card } from 'flowbite-react';
import { Link } from 'react-router-dom';
import SigninForm from '../components/auth/SigninForm';

const AdminSignIn = () => {
  return (
    <div className='md:flex md:justify-center'>
      <Card className='mt-5 md:w-[35vw]'>
        <h2 className='text-center text-3xl font-bold'>Admin Sign In</h2>
        <SigninForm type='admin' />
        <div className='mt-2'>
          <p>
            Register new admin{' '}
            <Link to='/register' className='font-bold hover:text-underline'>
              here
            </Link>
          </p>
        </div>
      </Card>
    </div>
  );
};

export default AdminSignIn;
