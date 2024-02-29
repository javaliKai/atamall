import CustomerProfileCard from '../components/profile/CustomerProfileCard';
import AddAddressModal from '../components/profile/AddAddressModal';

const CustomerProfile = () => {
  return (
    <>
      <section className='antialiased my-[7vh]'>
        <div className='h-full'>
          <CustomerProfileCard />
        </div>
      </section>
      <AddAddressModal />
    </>
  );
};

export default CustomerProfile;
