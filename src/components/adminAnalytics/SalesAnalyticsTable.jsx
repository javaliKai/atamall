import { useContext, useEffect } from 'react';
import { Table, Button } from 'flowbite-react';
import { Link } from 'react-router-dom';
import OrderContext from '../../lib/store/orderContext';
import UserContext from '../../lib/store/userContext';
import AnalyticsContext from '../../lib/store/analyticsContext';

const SalesAnalyticsTable = () => {
  const { salesAnalytics, getSalesAnalytics } = useContext(AnalyticsContext);
  const { token } = useContext(UserContext);

  useEffect(() => {
    const initialAnalyticsFetch = async () => {
      await getSalesAnalytics(token);
    };

    initialAnalyticsFetch();
  }, []);

  let index = 0;
  const tableData = [];
  if (salesAnalytics.soldCategory) {
    for (const cat in salesAnalytics.soldCategory) {
      const tableRow = (
        <Table.Row key={Math.random() * 64}>
          <Table.Cell>{++index}</Table.Cell>
          <Table.Cell>{cat}</Table.Cell>
          <Table.Cell>{salesAnalytics.soldCategory[cat]}</Table.Cell>
        </Table.Row>
      );

      tableData.push(tableRow);
    }
  }

  index = 0;
  const productTableData = [];
  if (salesAnalytics.soldProduct) {
    for (const prod in salesAnalytics.soldProduct) {
      const tableRow = (
        <Table.Row key={Math.random() * 64}>
          <Table.Cell>{++index}</Table.Cell>
          <Table.Cell>{prod}</Table.Cell>
          <Table.Cell>{salesAnalytics.soldProduct[prod]}</Table.Cell>
        </Table.Row>
      );

      productTableData.push(tableRow);
    }
  }

  return (
    <>
      <div className='overflow-x-auto'>
        <h2 className='text-2xl mb-3'>
          Total Items Sold: {salesAnalytics.totalItemsSold}
        </h2>
        <h2 className='text-2xl mb-3'>
          Sales Revenue: ${salesAnalytics.revenue}
        </h2>
        <hr />
        <div className='flex justify-between'>
          <h2 className='text-xl my-5'>Categories Sold:</h2>
          <h2 className='text-xl my-5'>
            Most Sold Category:{' '}
            <span className='font-bold'>{salesAnalytics.mostSoldCategory}</span>
          </h2>
        </div>
        <Table striped>
          <Table.Head>
            <Table.HeadCell>No</Table.HeadCell>
            <Table.HeadCell>Category</Table.HeadCell>
            <Table.HeadCell>Sold Quantity</Table.HeadCell>
          </Table.Head>
          <Table.Body className='divide-y'>{tableData}</Table.Body>
        </Table>
        <hr />
        <div className='flex justify-between'>
          <h2 className='text-xl my-5'>Products Sold:</h2>
          <h2 className='text-xl my-5'>
            Most Sold Product:{' '}
            <span className='font-bold'>{salesAnalytics.mostSoldProduct}</span>
          </h2>
        </div>
        <Table striped>
          <Table.Head>
            <Table.HeadCell>No</Table.HeadCell>
            <Table.HeadCell>Product Title</Table.HeadCell>
            <Table.HeadCell>Sold Quantity</Table.HeadCell>
          </Table.Head>
          <Table.Body className='divide-y'>{productTableData}</Table.Body>
        </Table>
      </div>
    </>
  );
};

export default SalesAnalyticsTable;
