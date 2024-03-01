import banner1 from '../../assets/banner-1.jpg';
import banner2 from '../../assets/banner-2.jpg';
import banner3 from '../../assets/banner-3.jpg';
import banner4 from '../../assets/electronics-banner-1.jpg';
import banner5 from '../../assets/electronics-banner-2.jpg';

import { Carousel as Slider } from 'flowbite-react';

const Carousel = () => {
  return (
    // <div className='h-[75vh]'>
    <>
      <div className='h-[25vh] md:h-[50vh]'>
        <Slider slideInterval={5000}>
          <img src={banner1} alt='...' width='100%' height='auto' />
          <img src={banner2} alt='...' width='100%' height='auto' />
          <img src={banner3} alt='...' width='100%' height='auto' />
        </Slider>
      </div>

      <div className='w-[100%] md:flex md:mt-3 justify-between gap-3'>
        <img src={banner4} alt='...' width='100%' height='auto' />
        <img src={banner5} alt='...' width='100%' height='auto' />
      </div>
    </>
  );
};

export default Carousel;
