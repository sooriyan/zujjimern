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
import { loadrequests } from '../../actions/auth';
const RecentReqs = ({ auth: { loading, requests, request }, loadrequests }) => {
  useEffect(() => {
    loadrequests();
  }, []);

  return (
    <Container fluid>
      <br />
      <Row>
        <Col>
          <div className='text-left'>
            <h5>Recent Requests</h5>
          </div>
          <Row>
            {requests.map((req) => (
              <Col md={3} sm={12} xs={12} key={req._id}>
                <Card key={req._id} style={{ width: '18rem', height: '23rem' }}>
                  <Card.Img
                    variant='top'
                    src={process.env.PUBLIC_URL + req.planDetails}
                  />
                  <Card.Body>
                    <Card.Title>
                      <span>{req.projectName}</span>
                    </Card.Title>
                    <Card.Text>
                      <b>Rooms: </b>
                      {req.noofrooms}
                      <br />
                      <b>SquareFeet: </b>
                      {req.sqfeet}
                      <br />
                      <b>Status: </b>
                      {req.status ? (
                        <Badge variant='success'>Completed</Badge>
                      ) : (
                        <Badge variant='warning'>Pending</Badge>
                      )}
                    </Card.Text>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </Col>
      </Row>
    </Container>
  );
};
const mapStateToProps = (state) => ({
  auth: state.auth,
});
export default connect(mapStateToProps, { loadrequests })(RecentReqs);
