import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { getalluserreqs } from '../../actions/adminauth';
import { Table, Container, Row, Col, Badge } from 'react-bootstrap';
import Moment from 'react-moment';

import Loader from '../layout/Loader';
const RequestMgmt = ({
  adminauth: { adminisLoading, requests },
  getalluserreqs,
  light,
}) => {
  useEffect(() => {
    getalluserreqs();
  }, []);
  return (
    <Container fluid>
      <br />
      <Row>
        <Col md={10}>
          <h3>Request Management</h3>
        </Col>
      </Row>
      <br />
      <Row>
        <Col md={12}>
          <Table
            striped
            bordered
            hover
            size='md'
            variant={light ? 'light' : 'dark'}
          >
            <thead>
              <tr>
                <th>Request Name</th>
                <th>Square Feet</th>
                <th>No of Rooms</th>
                <th>User</th>
                <th>Created On</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            {!adminisLoading && requests ? (
              <tbody>
                {requests.map((request) => (
                  <tr key={request._id}>
                    <td>{request.projectName}</td>
                    <td>{request.sqfeet}</td>
                    <td>{request.noofrooms}</td>
                    <td>{request.user.name}</td>
                    <td>
                      <Moment>{request.date}</Moment>
                    </td>
                    <td>
                      <Badge
                        variant={request.status === 1 ? 'success' : 'warning'}
                      >
                        {request.status === 1 ? 'Completed' : 'Pending'}
                      </Badge>
                    </td>
                    <td>
                      <Link
                        to={`/editrequest/${request._id}`}
                        title='Edit Request'
                      >
                        <i class='fa fa-pencil' aria-hidden='true'></i>
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            ) : (
              <Loader />
            )}
          </Table>
        </Col>
      </Row>
    </Container>
  );
};
const mapStateToProps = (state) => ({
  adminauth: state.adminauth,
  light: state.theme.light,
});

export default connect(mapStateToProps, { getalluserreqs })(RequestMgmt);
