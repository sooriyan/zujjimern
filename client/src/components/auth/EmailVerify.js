import React, { useEffect } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { emailverify } from '../../actions/auth';
const EmailVerify = ({ match, emailverify, history }) => {
  useEffect(() => {
    emailverify(match.params.token, history);
  }, []);
  return <div></div>;
};

export default connect(null, { emailverify })(withRouter(EmailVerify));
