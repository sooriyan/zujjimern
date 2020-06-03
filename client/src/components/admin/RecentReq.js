import React, { useEffect } from 'react';
import { Container, Row, Col, Card, Button, Badge } from 'react-bootstrap';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { getrecentreqs } from '../../actions/adminauth';
const RecentReq = ({ recentreqs, getrecentreqs }) => {
  useEffect(() => {
    getrecentreqs();
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
            {recentreqs.map((req) => (
              <Col md={3}>
                <Link to={`/editrequest/${req._id}`}>
                  <Card
                    key={req._id}
                    style={{ width: '18rem', height: '25rem' }}
                  >
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
                        <br />
                      </Card.Text>
                    </Card.Body>
                  </Card>
                </Link>
              </Col>
            ))}
          </Row>
        </Col>
      </Row>
    </Container>
  );
};
const mapStateToProps = (state) => ({
  recentreqs: state.adminauth.recentreqs,
});
export default connect(mapStateToProps, { getrecentreqs })(RecentReq);
