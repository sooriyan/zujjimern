import React, { Fragment, useState } from 'react';
import { Form, Button, Row, Col, Container } from 'react-bootstrap';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { login } from '../../actions/auth';
const Login = ({ login, isAuthenticated }) => {
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
    login(email, password);
  };
  //Redireact if logged in
  if (isAuthenticated) {
    return <Redirect to='/dashboard' />;
  }
  return (
    <Container fluid>
      <Row>
        <Col md={4}></Col>
        <Col className='text-center margin_top_signup' md={4}>
          <h1>Login</h1>
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
                <Form.Text className='text-muted'>
                  Don't have an account. <Link to='/register'>Sign Up</Link>
                </Form.Text>
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
  isAuthenticated: state.auth.isAuthenticated,
});
export default connect(mapStateToProps, { login })(Login);
