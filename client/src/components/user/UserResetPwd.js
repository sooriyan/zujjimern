import React, { useEffect, useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { Form, Button, Row, Col, Container } from 'react-bootstrap';
import { connect } from 'react-redux';
import { setAlert } from '../../actions/alert';
import { forgotpwdupdatepwd } from '../../actions/auth';
const UserResetPwd = ({ setAlert, forgotpwdupdatepwd, match, history }) => {
  const [formData, setFormData] = useState({
    password: '',
    password2: '',
  });
  const { password2, password } = formData;
  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const onSubmit = (e) => {
    e.preventDefault();
    if (password !== password2) {
      setAlert('Passwords do not match', 'danger', 2000);
    } else {
      forgotpwdupdatepwd(match.params.token, password);
      history.push('/login');
    }
  };
  return (
    <Container fluid>
      <Row>
        <Col md={4}></Col>
        <Col className='text-center margin_top_signup' md={4}>
          <h1>Reset Password</h1>
        </Col>
        <Col md={4}></Col>
      </Row>
      <Row>
        <Col md={4}></Col>

        <Col md={4}>
          <Row>
            <Col>
              <Form onSubmit={(e) => onSubmit(e)}>
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
                <Form.Group controlId='formBasicEmail'>
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

export default connect(null, { setAlert, forgotpwdupdatepwd })(UserResetPwd);
