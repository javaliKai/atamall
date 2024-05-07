import { createContext, useState } from 'react';
import axios from 'axios';

// Creating a context (global state) with its initial value
const AnalyticsContext = createContext({
  salesAnalytics: {},
  getSalesAnalytics: () => {},
});

// Exporting provider: the wrapper component that enables state sharing
export const AnalyticsContextProvider = (props) => {
  const [salesAnalytics, setSalesAnalytics] = useState({});

  const getSalesAnalytics = async (token) => {
    console.log('executed');
    const result = {
      analyticsData: {},
      errorObj: undefined,
    };

    try {
      // fetch user order from db
      const response = await axios.get('/api/admin/analytics', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const analyticsData = response.data;
      result.analyticsData = analyticsData;
      setSalesAnalytics(analyticsData);
    } catch (error) {
      result.errorObj = error.response.data;
    } finally {
      return result;
    }
  };

  return (
    <AnalyticsContext.Provider
      value={{
        salesAnalytics,
        getSalesAnalytics,
      }}
    >
      {props.children}
    </AnalyticsContext.Provider>
  );
};

// Exporting the context to be used in the hook
export default AnalyticsContext;
