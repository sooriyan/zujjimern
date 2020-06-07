import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { getallusers, deleteuser } from '../../actions/adminauth';
import {
  Table,
  Container,
  Row,
  Col,
  Badge,
  Modal,
  Button,
} from 'react-bootstrap';
import Moment from 'react-moment';
import DataTable from 'react-data-table-component';
import Loader from '../layout/Loader';
const UserMgmt = ({
  adminauth: { adminisLoading, allusers },
  getallusers,
  deleteuser,
  light,
}) => {
  useEffect(() => {
    getallusers();
  }, []);
  const theme = light ? 'default' : 'dark';
  const [show, setShow] = useState(false);
  const [currentuser, setCurrentUser] = useState({});
  const handleClose = () => {
    setShow(false);
  };
  const handledelete = (id) => {
    deleteuser(id);
    setShow(false);
  };
  const columns = [
    {
      name: 'Name',
      selector: 'name',
      sortable: true,
    },
    {
      name: 'Email',
      selector: 'email',
      sortable: true,
    },
    {
      name: 'Location',
      selector: 'location',
      sortable: true,
    },
    {
      name: 'Created On',
      selector: 'date',
    },
    {
      name: 'Status',
      selector: 'badge',
    },
    {
      name: 'Action',
      selector: 'action',
    },
  ];
  const onClick = (id, name, email) => {
    setCurrentUser({ id, name, email });
    setShow(true);
  };
  const data = allusers.map(({ _id, name, email, location, date, status }) => {
    return {
      name,
      email,
      location,
      date: <Moment>{date}</Moment>,
      badge: (
        <Badge variant={status === 1 ? 'success' : 'warning'}>
          {status === 1 ? 'Verified User' : 'Verification Pending'}
        </Badge>
      ),
      action: (
        <Button title='View Request' onClick={() => onClick(_id, name, email)}>
          <i class='fa fa-trash' aria-hidden='true'></i>
        </Button>
      ),
    };
  });
  return (
    <Container fluid>
      <br />
      <Row>
        <Col md={12}>
          <DataTable
            title='Users'
            columns={columns}
            sortIcon={<i class='fa fa-arrow-down' aria-hidden='true'></i>}
            data={data}
            theme={theme}
            pagination={true}
          />
        </Col>
      </Row>
      <Modal size='md' show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Delete User</Modal.Title>
        </Modal.Header>
        <Modal.Body className='text-center'>
          Are you sure, Do you want to delete {currentuser.name} (
          {currentuser.email})
        </Modal.Body>
        <Modal.Footer>
          <Button variant='secondary' onClick={handleClose}>
            No
          </Button>
          <Button
            variant='primary'
            onClick={() => handledelete(currentuser.id)}
          >
            Yes
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};
const mapStateToProps = (state) => ({
  adminauth: state.adminauth,
  light: state.theme.light,
});

export default connect(mapStateToProps, { getallusers, deleteuser })(UserMgmt);
