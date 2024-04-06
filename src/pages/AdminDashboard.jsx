import { useState } from 'react';
import ProductAction from '../components/dashboard/ProductAction.jsx';
import ProductTable from '../components/dashboard/ProductTable';

const AdminDashboard = () => {
  const [query, setQuery] = useState({
    keyword: '',
    category: 'all',
  });

  return (
    <>
      <ProductAction setQuery={setQuery} query={query} />
      <ProductTable query={query} />
    </>
  );
};

export default AdminDashboard;
