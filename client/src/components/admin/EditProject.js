import React, { Fragment, useState, useEffect } from 'react';
import { Form, Button, Row, Col, Container } from 'react-bootstrap';
import { connect } from 'react-redux';
import { setAlert } from '../../actions/alert';
import {
  getparticularproject,
  addproject,
  setProject,
} from '../../actions/adminauth';
const EditProject = ({
  match: { params },
  addproject,
  history,
  project,
  getparticularproject,
  setProject,
}) => {
  useEffect(() => {
    const projid = params.projid;
    getparticularproject(projid);
  }, []);
  const [file, setFile] = useState('');
  const { id, name, bedroom, sqft, facing, link } = project;
  const [filename, setFilename] = useState(id);
  const onFileChangeHandler = (e) => {
    setFile(e.target.files[0]);
    setFilename(e.target.files[0].name);
  };
  const onChange = (e) => {
    console.log(e.target.value);
    setProject({ ...project, [e.target.name]: e.target.value });
  };
  const onSubmit = (e) => {
    e.preventDefault();
    let newproj = false;
    addproject({
      id,
      name,
      bedroom,
      sqft,
      facing,
      link,
      newproj,
      file,
      filename,
    });
    history.push('/admindashboard');
  };
  return (
    <div className='landing_bg'>
      <Container fluid>
        <br />
        <Row>
          <Col md={4} className='margin_apply paper'>
            <Col>
              <div className='text-center'>
                <h3>Edit Project</h3>
              </div>
              <Form className='margin_apply' onSubmit={(e) => onSubmit(e)}>
                <Form.Group controlId='formBasicText'>
                  <Form.Label>
                    <b>Project Name</b>
                  </Form.Label>
                  <Form.Control
                    disabled
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
                    label='Upload Image'
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
                    Edit Project
                  </Button>
                </Form.Group>
              </Form>
            </Col>
          </Col>
          <Col md={6} className='paper text-center'>
            <h3>Iframe Preview</h3>
            <div dangerouslySetInnerHTML={{ __html: link }}></div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};
const mapStateToProps = (state) => ({
  project: state.adminauth.project,
});
export default connect(mapStateToProps, {
  setAlert,
  addproject,
  getparticularproject,
  setProject,
})(EditProject);
