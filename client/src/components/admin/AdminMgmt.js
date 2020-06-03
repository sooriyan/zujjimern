import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { getalladmins } from '../../actions/adminauth';
import { Table, Container, Row, Col } from 'react-bootstrap';
import Moment from 'react-moment';

import Loader from '../layout/Loader';
const AdminMgmt = ({
  adminauth: { adminisLoading, admins },
  getalladmins,
  light,
}) => {
  useEffect(() => {
    getalladmins();
    console.log(admins);
  }, []);
  return (
    <Container fluid>
      <br />
      <Row>
        <Col md={10}>
          <h3>Admin Management</h3>
        </Col>
        <Col md={2}>
          <Link to='/addadmin' className='btn btn-primary pull-right'>
            Add Admin
          </Link>
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
                <th>Admin Name</th>
                <th>Email</th>
                <th>Added On</th>
              </tr>
            </thead>
            {!adminisLoading && admins ? (
              <tbody>
                {admins.map((admin) => (
                  <tr key={admin._id}>
                    <td>{admin.name}</td>
                    <td>{admin.email}</td>
                    <td>
                      <Moment>{admin.date}</Moment>
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

export default connect(mapStateToProps, { getalladmins })(AdminMgmt);
