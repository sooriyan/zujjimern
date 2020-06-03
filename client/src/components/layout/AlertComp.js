import React from 'react';
import { Alert } from 'react-bootstrap';
import { connect } from 'react-redux';
const AlertComp = ({ alerts }) =>
  alerts !== null &&
  alerts.length > 0 &&
  alerts.map((alert) => (
    <Alert
      key={alert.id}
      className='sticky-top margintop10'
      variant={alert.alertType}
    >
      {alert.message}
    </Alert>
  ));
const mapStateToProps = (state) => ({
  alerts: state.alert,
});
export default connect(mapStateToProps)(AlertComp);
