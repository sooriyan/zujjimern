import React, { useEffect } from 'react';
import { Container, Row, Col, Card, Button, Badge } from 'react-bootstrap';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { getrecentprojects } from '../../actions/adminauth';
const RecentReq = ({ recentprojects, getrecentprojects }) => {
  useEffect(() => {
    getrecentprojects();
  }, []);
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
              <Col md={3}>
                <Link to={`/editproject/${proj._id}`}>
                  <Card
                    key={proj._id}
                    style={{ width: '18rem', height: '20rem' }}
                  >
                    <Card.Img
                      variant='top'
                      src={process.env.PUBLIC_URL + proj.planDetails}
                    />
                    <Card.Body>
                      <Card.Title>
                        <span>{proj.projectName}</span>
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
  recentprojects: state.adminauth.recentprojects,
});
export default connect(mapStateToProps, { getrecentprojects })(RecentReq);
