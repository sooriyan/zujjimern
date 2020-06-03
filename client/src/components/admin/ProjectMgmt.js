import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { getallprojects } from '../../actions/adminauth';
import { Table, Container, Row, Col } from 'react-bootstrap';
import Moment from 'react-moment';
import Loader from '../layout/Loader';
const ProjectMgmt = ({
  adminauth: { adminisLoading, projects },
  getallprojects,
  light,
}) => {
  useEffect(() => {
    getallprojects();
    console.log(projects);
  }, []);
  return (
    <Container fluid>
      <br />
      <Row>
        <Col md={10}>
          <h3>Project Management</h3>
        </Col>
        <Col md={2}>
          <Link to='/addproject' className='btn btn-primary pull-right'>
            Add Project
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
            responsive
          >
            <thead>
              <tr>
                <th>Project Name</th>
                <th>Bedroom</th>
                <th>Sqft</th>
                <th>Facing</th>
                <th>Created By</th>
                <th>Added On</th>
                <th>Action</th>
              </tr>
            </thead>
            {!adminisLoading && projects ? (
              <tbody>
                {projects.map((project) => (
                  <tr key={project._id}>
                    <td>{project.name}</td>
                    <td>{project.bedroom}</td>
                    <td>{project.sqft}</td>
                    <td>{project.facing}</td>
                    <td>{project.admin.name}</td>
                    <td>
                      <Moment>{project.date}</Moment>
                    </td>
                    <td>
                      <Link
                        to={`/editproject/${project._id}`}
                        title='Edit Project'
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

export default connect(mapStateToProps, { getallprojects })(ProjectMgmt);
