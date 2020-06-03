import React, { Fragment, useState } from 'react';
import { Form, Button, Row, Col, Container } from 'react-bootstrap';
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import { setAlert } from '../../actions/alert';
import { adminregister } from '../../actions/adminauth';
const AdminRegister = ({ setAlert, adminregister, history }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    password2: '',
  });
  const { name, email, password, password2 } = formData;
  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const onSubmit = (e) => {
    e.preventDefault();
    if (password !== password2) {
      setAlert('Passwords do not match', 'danger', 2000);
    } else {
      adminregister({ name, email, password });
      setAlert('Admin Added', 'success', 2000);
      history.push('/admindashboard');
    }
  };
  return (
    <div className='landing_bg'>
      <Container fluid>
        <Row>
          <Col md={4}></Col>
          <Col className='text-center margin_top_signup' md={4}>
            <h1>Add Admin</h1>
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
                      Add Admin
                    </Button>
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
export default connect(null, { setAlert, adminregister })(AdminRegister);
