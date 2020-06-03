import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import {
  getdistinctsqft,
  getdistinctbedrooms,
  getquerybasedoutput,
} from '../../actions/auth';
import { setAlert } from '../../actions/alert';
import { getrecentprojects } from '../../actions/adminauth';
import Loader from '../layout/Loader';
import {
  Container,
  Row,
  Col,
  Form,
  Button,
  Card,
  Modal,
} from 'react-bootstrap';
const DashboardQuery = ({
  distinctsqft,
  distinctbedrooms,
  getdistinctsqft,
  dashboardprojects,
  getdistinctbedrooms,
  getrecentprojects,
  getquerybasedoutput,
  homeloading,
  setAlert,
}) => {
  const [mainarray, setMainArray] = useState({
    sqft: '',
    bedroom: '',
  });
  const [lgShow, setLgShow] = useState(false);
  const [currentproject, setCurrentProject] = useState('');
  useEffect(() => {
    getdistinctbedrooms();
    getdistinctsqft();
    getrecentprojects();
  }, []);
  const onSubmit = (e) => {
    e.preventDefault();
    if (sqft !== '' && bedroom !== '') {
      getquerybasedoutput(mainarray);
    } else {
      setAlert('Please Fill all the fields', 'danger', 4000);
      console.log('Error');
    }
  };
  const onChange = (e) => {
    setMainArray({ ...mainarray, [e.target.name]: e.target.value });
  };
  const onClick = (id) => {
    var selectedproj = dashboardprojects.filter(function (project) {
      return project._id == id;
    });
    setCurrentProject(selectedproj[0]);
    setLgShow(true);
  };
  const { sqft, bedroom } = mainarray;
  return (
    <Container fluid>
      <Row>
        <Col md={3}>
          <div className='paper'>
            <h4>Search Your Query</h4>
            <Form className='margin_apply' onSubmit={(e) => onSubmit(e)}>
              <Form.Group controlId='formBasicEmail'>
                <Form.Label>
                  <b>SquareFeet</b>
                </Form.Label>
                <Form.Control
                  as='select'
                  name='sqft'
                  onChange={(e) => onChange(e)}
                  value={sqft}
                >
                  <option>Select Square Feet</option>
                  {distinctsqft.map((sqft) => (
                    <option value={sqft}>{sqft}</option>
                  ))}
                </Form.Control>
              </Form.Group>
              <Form.Group controlId='formBasicEmail'>
                <Form.Label>
                  <b>Bedroom</b>
                </Form.Label>
                <Form.Control
                  as='select'
                  name='bedroom'
                  value={bedroom}
                  onChange={(e) => onChange(e)}
                >
                  <option>Select No of Bedrooms</option>

                  {distinctbedrooms.map((bdroom) => (
                    <option value={bdroom}>{bdroom}</option>
                  ))}
                </Form.Control>
              </Form.Group>
              <Button
                variant='primary'
                className='text-center w-100'
                type='submit'
              >
                Search
              </Button>
            </Form>
          </div>
        </Col>
        <Col md={9}>
          <div className='paper text-center'>
            {homeloading ? (
              <Loader />
            ) : (
              <Row>
                {dashboardprojects.map((project) => (
                  <Col md={3} key={project._id}>
                    <Card
                      key={project._id}
                      onClick={() => onClick(project._id)}
                      className='margin10px'
                    >
                      <Card.Img
                        variant='top'
                        style={{ height: '150px' }}
                        src={process.env.PUBLIC_URL + project.planDetails}
                      />
                      <Card.Body>
                        <Card.Title>
                          <span>{project.name}</span>
                        </Card.Title>
                        <Card.Text>
                          <b>Bedrooms: </b>
                          {project.bedroom}
                          <br />
                          <b>SquareFeet: </b>
                          {project.sqft}
                        </Card.Text>
                      </Card.Body>
                    </Card>
                  </Col>
                ))}
              </Row>
            )}
          </div>
        </Col>
      </Row>
      <Modal size='lg' show={lgShow} onHide={() => setLgShow(false)}>
        <Modal.Header closeButton>
          <Modal.Title id='example-modal-sizes-title-lg'>
            {currentproject.name}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div
            className='text-center'
            dangerouslySetInnerHTML={{ __html: currentproject.link }}
          ></div>
        </Modal.Body>
      </Modal>
    </Container>
  );
};
const mapStateToProps = (state) => ({
  distinctsqft: state.auth.distinctsqft,
  distinctbedrooms: state.auth.distinctbedrooms,
  dashboardprojects: state.auth.dashboardprojects,
  homeloading: state.auth.homeloading,
});
export default connect(mapStateToProps, {
  getdistinctsqft,
  getdistinctbedrooms,
  getrecentprojects,
  getquerybasedoutput,
  setAlert,
})(DashboardQuery);
