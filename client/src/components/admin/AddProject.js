import React, { Fragment, useState } from 'react';
import { Form, Button, Row, Col, Container } from 'react-bootstrap';
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import { setAlert } from '../../actions/alert';
import { addproject } from '../../actions/adminauth';
const AddProject = ({ setAlert, addproject, history }) => {
  const [formData, setFormData] = useState({
    name: '',
    bedroom: '',
    sqft: '',
    facing: '',
    link: '',
    newproj: true,
    file: '',
    filename: 'Upload Plan Image',
  });
  const {
    name,
    bedroom,
    sqft,
    file,
    filename,
    facing,
    link,
    newproj,
  } = formData;
  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const onFileChangeHandler = (e) => {
    setFormData({
      ...formData,
      file: e.target.files[0],
      filename: e.target.files[0].name,
    });
  };
  const onSubmit = (e) => {
    e.preventDefault();
    addproject({ name, bedroom, sqft, facing, filename, file, link, newproj });
    history.push('/admindashboard');
  };
  return (
    <div className='landing_bg'>
      <Container fluid>
        <Row>
          <Col md={4}></Col>

          <Col md={4}>
            <Row className='margin_apply'>
              <Col className='paper'>
                <div className='text-center'>
                  <h1>Add Project</h1>
                </div>
                <Form className='margin_apply' onSubmit={(e) => onSubmit(e)}>
                  <Form.Group controlId='formBasicText'>
                    <Form.Label>
                      <b>Project Name</b>
                    </Form.Label>
                    <Form.Control
                      name='name'
                      type='text'
                      value={name}
                      onChange={(e) => onChange(e)}
                      placeholder='Enter Project Name'
                    />
                  </Form.Group>
                  <Form.Group controlId='formBasicText'>
                    <Form.Label>
                      <b>Plan Image</b>
                    </Form.Label>
                    <Form.File
                      id='custom-file'
                      name='plandetails'
                      onChange={(e) => onFileChangeHandler(e)}
                      label={filename}
                      custom
                    />
                  </Form.Group>
                  <Form.Group controlId='formBasicEmail'>
                    <Form.Label>
                      <b>Bedroom</b>
                    </Form.Label>
                    <Form.Control
                      type='number'
                      name='bedroom'
                      value={bedroom}
                      onChange={(e) => onChange(e)}
                      placeholder='Enter No of Bedrooms'
                    />
                  </Form.Group>
                  <Form.Group controlId='formBasicPassword'>
                    <Form.Label>
                      <b>Square Feet</b>
                    </Form.Label>
                    <Form.Control
                      type='number'
                      name='sqft'
                      value={sqft}
                      onChange={(e) => onChange(e)}
                      placeholder='Enter Square Feet'
                    />
                  </Form.Group>
                  <Form.Group controlId='formBasicConfirmPassword'>
                    <Form.Label>
                      <b>Facing</b>
                    </Form.Label>
                    <Form.Control
                      type='text'
                      name='facing'
                      value={facing}
                      onChange={(e) => onChange(e)}
                      placeholder='House Facing'
                    />
                  </Form.Group>
                  <Form.Group controlId='formBasicConfirmPassword'>
                    <Form.Label>
                      <b>Iframe URL</b>
                    </Form.Label>
                    <Form.Control
                      as='textarea'
                      rows={3}
                      name='link'
                      value={link}
                      onChange={(e) => onChange(e)}
                      placeholder='Enter IFRAME URL'
                    />
                  </Form.Group>
                  <Form.Group className='text-center'>
                    <Button
                      variant='primary'
                      className='text-center w-100'
                      type='submit'
                    >
                      Add Project
                    </Button>
                  </Form.Group>
                </Form>
              </Col>
            </Row>
          </Col>
          <Col md={4}>
            <div dangerouslySetInnerHTML={{ __html: link }}></div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};
export default connect(null, { setAlert, addproject })(AddProject);
