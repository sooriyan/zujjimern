import React, { Fragment, useState } from 'react';
import { Form, Button, Row, Col, Container } from 'react-bootstrap';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { forgotpwdsendemail } from '../../actions/adminauth';
const ForgotPwd = ({ forgotpwdsendemail, adminisAuthenticated }) => {
  const [formData, setFormData] = useState({
    email: '',
  });
  const { email } = formData;
  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const onSubmit = (e) => {
    e.preventDefault();
    forgotpwdsendemail(email);
    return <Redirect to='/adminlogin' />;
  };
  //Redireact if logged in
  if (adminisAuthenticated) {
    return <Redirect to='/admindashboard' />;
  }
  return (
    <Container fluid>
      <Row>
        <Col md={4}></Col>
        <Col className='text-center margin_top_signup' md={4}>
          <h1>Admin Forgot Password</h1>
        </Col>
        <Col md={4}></Col>
      </Row>
      <Row>
        <Col md={4}></Col>

        <Col md={4}>
          <Row>
            <Col>
              <Form onSubmit={(e) => onSubmit(e)}>
                <Form.Group controlId='formBasicEmail'>
                  <Form.Label>
                    <b>Email address</b>
                  </Form.Label>
                  <Form.Control
                    type='email'
                    name='email'
                    value={email}
                    onChange={(e) => onChange(e)}
                    placeholder='Enter email'
                  />
                </Form.Group>

                <Form.Group className='text-center'>
                  <Button
                    variant='primary'
                    className='text-center w-100'
                    type='submit'
                  >
                    Reset Password
                  </Button>
                </Form.Group>
              </Form>
            </Col>
          </Row>
        </Col>
        <Col md={4} />
      </Row>
    </Container>
  );
};

const mapStateToProps = (state) => ({
  adminisAuthenticated: state.adminauth.adminisAuthenticated,
});
export default connect(mapStateToProps, { forgotpwdsendemail })(ForgotPwd);
