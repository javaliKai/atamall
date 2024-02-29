import { useState, useContext, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Dropdown, TextInput, Button, Spinner, Select } from 'flowbite-react';
import { CiSearch } from 'react-icons/ci';
import Carousel from '../components/home/Carousel';
import Products from '../components/home/Products';
import ProductContext from '../lib/store/productContext';

const Home = () => {
  // CHECKPOINT: finish the search product functionality
  const navigate = useNavigate();
  const [params] = useSearchParams();
  const keyword = params.get('keyword') || '';

  const { getProducts, products } = useContext(ProductContext);
  let queriedProducts = [];
  if (products.length > 0) {
    products.forEach((product) => {
      if (product.title.toLowerCase().includes(keyword.toLowerCase())) {
        queriedProducts.push(product);
      }
    });
  }

  const [productSearchInput, setProductSearchInput] = useState(keyword);
  const [isSearching, setIsSearching] = useState(false);
  const [productFilter, setProductFilter] = useState('all');
  let filteredProducts = [];
  if (productFilter === 'all') {
    filteredProducts = queriedProducts;
  } else {
    filteredProducts = queriedProducts.filter(
      (product) => product.category === productFilter
    );
  }

  useEffect(() => {
    const initialProductFetch = async () => {
      await getProducts();
    };

    initialProductFetch();
  }, []);

  // side-effect for searching products with 1s delay
  useEffect(() => {
    const productSearchTimeout = setTimeout(() => {
      const productName = productSearchInput.trim();
      if (productName.length > 0) {
        setIsSearching(true);

        // update query parameter
        navigate({
          search: `?keyword=${productName}`,
        });
      } else if (isSearching) {
        navigate({ search: '' });
        setIsSearching(false);
      } else {
        setIsSearching(false);
      }
    }, 1000);

    return () => {
      clearTimeout(productSearchTimeout);
    };
  }, [productSearchInput]);

  if (products.length === 0) {
    return (
      <div className='flex items-center justify-center min-h-[80vh]'>
        <Spinner size='lg' />
      </div>
    );
  }

  return (
    <>
      <TextInput
        onChange={(e) => setProductSearchInput(e.target.value)}
        type='text'
        value={productSearchInput}
        rightIcon={CiSearch}
        placeholder='Search Product...'
        required
      />
      {(!isSearching || !keyword) && <Carousel />}
      <article className='py-16'>
        <div className='flex md:flex-col justify-between'>
          <div>
            {isSearching || keyword ? (
              <h2 className='text-2xl md:text-3xl mb-[2rem]'>
                Results For "{keyword.trim()}"
              </h2>
            ) : (
              <h2 className='text-2xl md:text-3xl mb-[2rem]'>Our Products</h2>
            )}
          </div>
          <div>
            <Select onChange={(e) => setProductFilter(e.target.value)}>
              <option value='all'>All</option>
              <option value='electronics'>Electronics</option>
              <option value="men's clothing">Men's Clothing</option>
              <option value="women's clothing">Women's Clothing</option>
              <option value='jewelery'>Jewelry</option>
            </Select>
            {/* <Dropdown label='Categories' inline>
              <Dropdown.Item>All</Dropdown.Item>
              <Dropdown.Item>Electronics</Dropdown.Item>
              <Dropdown.Item>Men's Clothing</Dropdown.Item>
              <Dropdown.Item>Women's Clothing</Dropdown.Item>
              <Dropdown.Item>Jewelery</Dropdown.Item>
            </Dropdown> */}
          </div>
          <ul className='hidden flex gap-3'>
            <li
              // onClick={() => changeFilterBy('all')}
              // className={`cursor-pointer ${filterBy === 'all' && 'underline'}`}
              className={`cursor-pointer`}
            >
              All
            </li>
            <li>/</li>
            <li
            // onClick={() => changeFilterBy('electronics')}
            // className={`cursor-pointer ${
            //   filterBy === 'electronics' && 'underline'
            // }`}
            >
              Electronics
            </li>
            <li>/</li>
            <li
            // onClick={() => changeFilterBy("men's clothing")}
            // className={`cursor-pointer ${
            //   filterBy === "men's clothing" && 'underline'
            // }`}
            >
              Men's Clothing
            </li>
            <li>/</li>
            <li
            // onClick={() => changeFilterBy("women's clothing")}
            // className={`cursor-pointer ${
            //   filterBy === "women's clothing" && 'underline'
            // }`}
            >
              Women's Clothing
            </li>
            <li>/</li>
            <li
            // onClick={() => changeFilterBy('jewelery')}
            // className={`cursor-pointer ${
            //   filterBy === 'jewelery' && 'underline'
            // }`}
            >
              Jewelery
            </li>
          </ul>
        </div>
        {filteredProducts.length === 0 ? (
          <p className='italic text-center'>No products found!</p>
        ) : (
          <Products data={filteredProducts} />
        )}
      </article>
    </>
  );
};

export default Home;
