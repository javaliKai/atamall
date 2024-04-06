import { createContext, useState } from 'react';

// Creating a context (global state) with its initial value
const UIContext = createContext({
  showSideNav: false,
  toggleSideNav: () => {},
  alert: undefined,
  setAlert: undefined,
  resetAlert: () => {},
  showAddressModal: false,
  toggleAddressModal: (state) => {},
  showEditProductModal: false,
  toggleEditProductModal: (state) => {},
  showDeleteProductModal: false,
  toggleDeleteProductModal: (state) => {},
  showAddProductModal: false,
  toggleAddProductModal: (state) => {},
  showConfirmOrderModal: false,
  toggleConfirmOrderModal: (state) => {},
});

// Exporting provider: the wrapper component that enables state sharing
export const UIContextProvider = (props) => {
  /** Define the state here... */
  const [showSideNav, setShowSideNav] = useState(false);
  const [alert, setAlertState] = useState(undefined);
  const [showAddressModal, setShowAddressModal] = useState(false);
  const [showEditProductModal, setEditProductModal] = useState(false);
  const [showDeleteProductModal, setDeleteProductModal] = useState(false);
  const [showAddProductModal, setAddProductModal] = useState(false);
  const [showConfirmOrderModal, setShowConfirmOrderModal] = useState(false);

  const toggleSideNav = () => {
    setShowSideNav((prevState) => !prevState);
  };

  const setAlert = (alertObj) => {
    // alert obj takes a form like: {  type: ... , message: ...}
    const { type, message } = alertObj;
    setAlertState({ type, message });
  };

  const resetAlert = () => {
    setAlertState(undefined);
  };

  const toggleAddressModal = (state) => {
    setShowAddressModal(state);
  };

  const toggleEditProductModal = (state) => {
    setEditProductModal(state);
  };

  const toggleDeleteProductModal = (state) => {
    setDeleteProductModal(state);
  };

  const toggleAddProductModal = (state) => {
    setAddProductModal(state);
  };

  const toggleConfirmOrderModal = (state) => {
    setShowConfirmOrderModal(state);
  };

  return (
    <UIContext.Provider
      value={{
        showSideNav,
        toggleSideNav,
        alert,
        setAlert,
        resetAlert,
        showAddressModal,
        toggleAddressModal,
        showEditProductModal,
        toggleEditProductModal,
        showDeleteProductModal,
        toggleDeleteProductModal,
        showAddProductModal,
        toggleAddProductModal,
        showConfirmOrderModal,
        toggleConfirmOrderModal,
      }}
    >
      {props.children}
    </UIContext.Provider>
  );
};

// Exporting the context to be used in the hook
export default UIContext;
