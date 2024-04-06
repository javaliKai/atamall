import { useContext, useEffect, useState } from 'react';
import { Button, Table } from 'flowbite-react';
import ProductContext from '../../lib/store/productContext';
import ProductFormModal from './ProductFormModal';
import UIContext from '../../lib/store/uiContext';
import DeleteConfirmation from './DeleteConfirmation';
import { Link } from 'react-router-dom';

const ProductTable = ({ query }) => {
  const { products, getProducts } = useContext(ProductContext);

  let queriedProducts = [];
  if (products.length > 0) {
    products.forEach((product) => {
      if (product.title.toLowerCase().includes(query.keyword.toLowerCase())) {
        queriedProducts.push(product);
      }
    });
  }

  let filteredProducts = [];
  if (query.category === 'all') {
    filteredProducts = queriedProducts;
  } else {
    filteredProducts = queriedProducts.filter(
      (product) => product.category === query.category
    );
  }

  const {
    showEditProductModal,
    toggleEditProductModal,
    showDeleteProductModal,
    toggleDeleteProductModal,
  } = useContext(UIContext);

  const [currentEditingProduct, setCurrentEditingProduct] = useState(undefined);
  const [flaggedProduct, setFlaggedProduct] = useState({
    productId: undefined,
    productTitle: '',
  });

  const openEditProductHandler = (productId) => {
    setCurrentEditingProduct(productId);
    toggleEditProductModal(true);
  };

  const openDeleteConfirmationHandler = (productId, productTitle) => {
    setFlaggedProduct({ productId, productTitle });
    toggleDeleteProductModal(true);
  };

  useEffect(() => {
    const initialProductFetch = async () => {
      await getProducts();
    };

    initialProductFetch();
  }, []);

  return (
    <>
      {showEditProductModal && currentEditingProduct && (
        <ProductFormModal type='edit' productId={currentEditingProduct} />
      )}
      {showDeleteProductModal && flaggedProduct && (
        <DeleteConfirmation
          productId={flaggedProduct.productId}
          productTitle={flaggedProduct.productTitle}
        />
      )}
      <div className='overflow-x-auto'>
        <Table striped>
          <Table.Head>
            <Table.HeadCell>No</Table.HeadCell>
            <Table.HeadCell>Product name</Table.HeadCell>
            <Table.HeadCell>Category</Table.HeadCell>
            <Table.HeadCell>Price</Table.HeadCell>
            <Table.HeadCell>
              Actions
              <span className='sr-only'>Actions</span>
            </Table.HeadCell>
          </Table.Head>
          <Table.Body className='divide-y'>
            {filteredProducts.map((prod, index) => (
              <Table.Row
                key={prod._id}
                className='bg-white dark:border-gray-700 dark:bg-gray-800'
              >
                <Table.Cell>{index + 1}</Table.Cell>
                <Table.Cell>
                  <Link to={`/product/${prod._id}`}>{prod.title}</Link>
                </Table.Cell>
                <Table.Cell>{prod.category}</Table.Cell>
                <Table.Cell>${prod.price}</Table.Cell>
                <Table.Cell className='flex gap-2'>
                  <Button
                    size='sm'
                    onClick={() => openEditProductHandler(prod._id)}
                  >
                    <svg
                      className='w-6 h-6 text-white'
                      aria-hidden='true'
                      xmlns='http://www.w3.org/2000/svg'
                      width='24'
                      height='24'
                      fill='none'
                      viewBox='0 0 24 24'
                    >
                      <path
                        stroke='currentColor'
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        strokeWidth='2'
                        d='m14.304 4.844 2.852 2.852M7 7H4a1 1 0 0 0-1 1v10a1 1 0 0 0 1 1h11a1 1 0 0 0 1-1v-4.5m2.409-9.91a2.017 2.017 0 0 1 0 2.853l-6.844 6.844L8 14l.713-3.565 6.844-6.844a2.015 2.015 0 0 1 2.852 0Z'
                      />
                    </svg>
                  </Button>
                  <Button
                    size='sm'
                    onClick={() =>
                      openDeleteConfirmationHandler(prod._id, prod.title)
                    }
                    color='failure'
                  >
                    <a
                      href='#'
                      className='font-medium text-cyan-600 hover:underline dark:text-cyan-500'
                    >
                      <svg
                        className='w-6 h-6 text-white dark:text-white'
                        aria-hidden='true'
                        xmlns='http://www.w3.org/2000/svg'
                        width='24'
                        height='24'
                        fill='none'
                        viewBox='0 0 24 24'
                      >
                        <path
                          stroke='currentColor'
                          strokeLinecap='round'
                          strokeLinejoin='round'
                          strokeWidth='2'
                          d='M5 7h14m-9 3v8m4-8v8M10 3h4a1 1 0 0 1 1 1v3H9V4a1 1 0 0 1 1-1ZM6 7h12v13a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V7Z'
                        />
                      </svg>
                    </a>
                  </Button>
                </Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table>
      </div>
    </>
  );
};

export default ProductTable;
