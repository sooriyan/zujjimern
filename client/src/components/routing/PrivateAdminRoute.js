import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
const PrivateAdminRoute = ({
  component: Component,
  adminauth: { adminisAuthenticated, adminloading },
  ...rest
}) => (
  <Route
    {...rest}
    render={(props) =>
      !adminisAuthenticated && !adminloading ? (
        <Redirect to='/adminlogin' />
      ) : (
        <Component {...props} />
      )
    }
  />
);

const mapStateToProps = (state) => ({
  adminauth: state.adminauth,
});

export default connect(mapStateToProps)(PrivateAdminRoute);
