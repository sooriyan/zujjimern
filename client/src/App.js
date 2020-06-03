import React, { Fragment, useEffect } from 'react';
import Home from './components/layout/Home';
import { Provider } from 'react-redux';
import './App.css';
import store from './store';
import { loadUser } from './actions/auth';
import { adminloadUser } from './actions/adminauth';
import setAuthToken from './utils/setAuthToken';
import setAdminAuthToken from './utils/setAdminAuthToken';

if (localStorage.token) {
  setAuthToken(localStorage.token);
}
if (localStorage.admintoken) {
  setAdminAuthToken(localStorage.admintoken);
}
const App = () => {
  useEffect(() => {
    store.dispatch(loadUser());
    store.dispatch(adminloadUser());
  }, []);
  return (
    <Provider store={store}>
      <Home />
    </Provider>
  );
};

export default App;
