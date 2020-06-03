import React, { useEffect, useState } from 'react';
import {
  Container,
  Row,
  Col,
  Card,
  Button,
  Badge,
  Modal,
} from 'react-bootstrap';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { getrecentprojects } from '../../actions/adminauth';
const RecentProjs = ({ recentprojects, getrecentprojects }) => {
  const [lgShow, setLgShow] = useState(false);
  const [currentproject, setCurrentProject] = useState('');
  useEffect(() => {
    getrecentprojects();
  }, []);
  const onClick = (id) => {
    var selectedproj = recentprojects.filter(function (project) {
      return project._id == id;
    });

    console.log(selectedproj[0]);
    setCurrentProject(selectedproj[0]);
    setLgShow(true);
  };
  return (
    <Container fluid>
      <br />
      <Row>
        <Col>
          <div className='text-left'>
            <h5>Recent Projects</h5>
          </div>
          <Row>
            {recentprojects.map((proj) => (
              <Col md={3} sm={12} xs={12} key={proj._id}>
                <Card
                  key={proj._id}
                  onClick={() => onClick(proj._id)}
                  style={{ width: '18rem', height: '22rem' }}
                >
                  <Card.Img
                    variant='top'
                    src={process.env.PUBLIC_URL + proj.planDetails}
                  />
                  <Card.Body>
                    <Card.Title>
                      <span>{proj.name}</span>
                    </Card.Title>
                    <Card.Text>
                      <b>Bedrooms: </b>
                      {proj.bedroom}
                      <br />
                      <b>SquareFeet: </b>
                      {proj.sqft}
                    </Card.Text>
                  </Card.Body>
                </Card>
              </Col>
            ))}
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
        </Col>
      </Row>
    </Container>
  );
};
const mapStateToProps = (state) => ({
  recentprojects: state.adminauth.recentprojects,
});
export default connect(mapStateToProps, { getrecentprojects })(RecentProjs);
