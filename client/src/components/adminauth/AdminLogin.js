import React, { Fragment, useState } from 'react';
import { Form, Button, Row, Col, Container } from 'react-bootstrap';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { adminlogin } from '../../actions/adminauth';
const AdminLogin = ({ adminlogin, adminisAuthenticated }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const { email, password } = formData;
  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const onSubmit = (e) => {
    e.preventDefault();
    adminlogin(email, password);
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
          <h1>Admin</h1>
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
                <Form.Group controlId='formBasicPassword'>
                  <Form.Label>
                    <b>Password</b>
                  </Form.Label>
                  <Form.Control
                    type='password'
                    name='password'
                    value={password}
                    onChange={(e) => onChange(e)}
                    placeholder='Password'
                  />
                </Form.Group>
                <Form.Group className='text-center'>
                  <Button
                    variant='primary'
                    className='text-center w-100'
                    type='submit'
                  >
                    Login
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
export default connect(mapStateToProps, { adminlogin })(AdminLogin);
