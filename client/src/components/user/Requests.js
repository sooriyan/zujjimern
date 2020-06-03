import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { loadrequests, userparticularrequest } from '../../actions/auth';
import DataTable from 'react-data-table-component';
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
import Loader from '../layout/Loader';
const Requests = ({
  auth: { loading, requests, request },
  loadrequests,
  userparticularrequest,
  light,
}) => {
  useEffect(() => {
    loadrequests();
  }, []);
  const [show, setShow] = useState(false);

  const handleClose = () => {
    setShow(false);
  };
  const theme = light ? 'default' : 'dark';
  const columns = [
    {
      name: 'Request Name',
      selector: 'projectName',
      sortable: true,
    },
    {
      name: 'Square Feet',
      selector: 'sqfeet',
      sortable: true,
    },
    {
      name: 'No of Rooms',
      selector: 'noofrooms',
      sortable: true,
    },
    {
      name: 'Created On',
      selector: 'date',
      sortable: true,
    },
    {
      name: 'Status',
      selector: 'badge',
      sortable: true,
    },
    {
      name: 'View',
      selector: 'view',
    },
  ];
  const data = requests.map(
    ({ _id, projectName, sqfeet, noofrooms, date, status }) => {
      return {
        projectName,
        sqfeet,
        noofrooms,
        date: <Moment>{date}</Moment>,
        view: status ? (
          <Button title='View Request' onClick={() => onClick(_id)}>
            <i class='fa fa-eye' aria-hidden='true'></i>
          </Button>
        ) : (
          <Badge variant='warning'>Under Progress</Badge>
        ),
        badge: (
          <Badge variant={status === 1 ? 'success' : 'warning'}>
            {status === 1 ? 'Completed' : 'Pending'}
          </Badge>
        ),
      };
    }
  );
  const onClick = (arg) => {
    console.log(arg);
    userparticularrequest(arg);
    setShow(true);
  };
  if (loading) {
    return <Loader />;
  } else {
    return (
      <Container fluid>
        <br />
        <Row>
          <Col md={10}></Col>
          <Col md={2}>
            <Link to='/addreq' className='btn btn-primary pull-right'>
              Add Request
            </Link>
          </Col>
        </Row>
        <br />
        <Row>
          <Col md={12}>
            <DataTable
              title='Requests'
              columns={columns}
              sortIcon={<i class='fa fa-arrow-down' aria-hidden='true'></i>}
              data={data}
              theme={theme}
              pagination={true}
            />
            <Modal size='lg' show={show} onHide={handleClose}>
              <Modal.Header closeButton>
                <Modal.Title>{request.projectName}</Modal.Title>
              </Modal.Header>
              <Modal.Body
                className='text-center'
                dangerouslySetInnerHTML={{ __html: request.projectLoc }}
              ></Modal.Body>
            </Modal>
          </Col>
        </Row>
      </Container>
    );
  }
};
const mapStateToProps = (state) => ({
  auth: state.auth,
  light: state.theme.light,
});

export default connect(mapStateToProps, {
  loadrequests,
  userparticularrequest,
})(Requests);
