import React, { Fragment, useState } from 'react';
import { Form, Button, Row, Col, Container } from 'react-bootstrap';
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import { setAlert } from '../../actions/alert';
import { register } from '../../actions/auth';
const Register = ({ setAlert, register, isAuthenticated }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    password2: '',
    location: '',
  });
  const { name, email, password, password2, location } = formData;
  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  //Redireact if logged in
  if (isAuthenticated) {
    return <Redirect to='/dashboard' />;
  }
  const onSubmit = (e) => {
    e.preventDefault();
    if (password !== password2) {
      setAlert('Passwords do not match', 'danger', 2000);
    } else {
      register({ name, email, password, location });
    }
  };
  return (
    <div className='landing_bg'>
      <Container fluid>
        <Row>
          <Col md={4}></Col>
          <Col className='text-center margin_top_signup' md={4}>
            <h1>Sign Up</h1>
          </Col>
          <Col md={4}></Col>
        </Row>
        <Row>
          <Col md={4}></Col>

          <Col md={4}>
            <Row className='margin_apply'>
              <Col>
                <Form className='margin_apply' onSubmit={(e) => onSubmit(e)}>
                  <Form.Group controlId='formBasicText'>
                    <Form.Label>
                      <b>Name</b>
                    </Form.Label>
                    <Form.Control
                      name='name'
                      type='text'
                      value={name}
                      onChange={(e) => onChange(e)}
                      placeholder='Enter Name'
                    />
                  </Form.Group>
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
                    <Form.Text className='text-muted'>
                      We'll never share your email with anyone else.
                    </Form.Text>
                  </Form.Group>
                  <Form.Group controlId='formBasicEmail'>
                    <Form.Label>
                      <b>Location</b>
                    </Form.Label>
                    <Form.Control
                      type='text'
                      name='location'
                      value={location}
                      onChange={(e) => onChange(e)}
                      placeholder='Enter Current Location'
                    />
                    <Form.Text className='text-muted'>
                      We'll never share your Location with anyone else.
                    </Form.Text>
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
                  <Form.Group controlId='formBasicConfirmPassword'>
                    <Form.Label>
                      <b>Confirm Password</b>
                    </Form.Label>
                    <Form.Control
                      type='password'
                      name='password2'
                      value={password2}
                      onChange={(e) => onChange(e)}
                      placeholder='Confirm Password'
                    />
                  </Form.Group>
                  <Form.Group className='text-center'>
                    <Button
                      variant='primary'
                      className='text-center w-100'
                      type='submit'
                    >
                      Register
                    </Button>
                    <Form.Text className='text-muted'>
                      Already have an account. <Link to='/login'>Login</Link>
                    </Form.Text>
                  </Form.Group>
                </Form>
              </Col>
            </Row>
          </Col>
          <Col md={4} />
        </Row>
      </Container>
    </div>
  );
};
const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});
export default connect(mapStateToProps, { setAlert, register })(Register);
