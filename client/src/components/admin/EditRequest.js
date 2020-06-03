import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import {
  getparticularuserreq,
  updateparticularrequest,
} from '../../actions/adminauth';
import { Container, Row, Col, Form, Button, Image } from 'react-bootstrap';
const EditRequest = ({
  match,
  request,
  getparticularuserreq,
  updateparticularrequest,
  history,
}) => {
  useEffect(() => {
    getparticularuserreq(match.params.reqid);
  }, []);
  const [iframe, setIframe] = useState('');
  const onChange = (e) => {
    setIframe(e.target.value);
  };
  const onSubmit = (e) => {
    e.preventDefault();
    updateparticularrequest(match.params.reqid, iframe);
    history.push('/reqmgmt');
  };
  return (
    <Container>
      <br />
      <Row>
        <Col md={7} className='paper'>
          <Form className='margin_apply' onSubmit={(e) => onSubmit(e)}>
            <Form.Group controlId='formBasicText'>
              <Form.Label>
                <b>Request Name: </b>
              </Form.Label>{' '}
              {request.projectName}
            </Form.Group>
            <Form.Group controlId='formBasicText'>
              <Form.Label>
                <b>No of Rooms: </b>
              </Form.Label>{' '}
              {request.noofrooms}
            </Form.Group>
            <Form.Group controlId='formBasicText'>
              <Form.Label>
                <b>Square Feet: </b>
              </Form.Label>{' '}
              {request.sqfeet}
            </Form.Group>
            <Form.Group controlId='formBasicText'>
              <Form.Label>
                <b>Plan Details: </b>
              </Form.Label>{' '}
              {request.planDetails}
            </Form.Group>
            {request.mbrTheme && (
              <Form.Group controlId='formBasicText'>
                <Form.Label>
                  <b>Master Bedroom Theme: </b>
                </Form.Label>{' '}
                {request.mbrTheme}
              </Form.Group>
            )}
            {request.mbrSpecialComments && (
              <Form.Group controlId='formBasicText'>
                <Form.Label>
                  <b>Master Bedroom Spl Comments: </b>
                </Form.Label>{' '}
                {request.mbrSpecialComments}
              </Form.Group>
            )}
            {request.cbrTheme && (
              <Form.Group controlId='formBasicText'>
                <Form.Label>
                  <b>Child Bedroom Theme: </b>
                </Form.Label>{' '}
                {request.cbrTheme}
              </Form.Group>
            )}
            {request.cbrSpecialComments && (
              <Form.Group controlId='formBasicText'>
                <Form.Label>
                  <b>Child Bedroom Spl Comments: </b>
                </Form.Label>{' '}
                {request.cbrSpecialComments}
              </Form.Group>
            )}
            {request.gbrTheme && (
              <Form.Group controlId='formBasicText'>
                <Form.Label>
                  <b>Guest Bedroom Theme: </b>
                </Form.Label>{' '}
                {request.gbrTheme}
              </Form.Group>
            )}
            {request.gbrSpecialComments && (
              <Form.Group controlId='formBasicText'>
                <Form.Label>
                  <b>Guest Bedroom Spl Comments: </b>
                </Form.Label>{' '}
                {request.gbrSpecialComments}
              </Form.Group>
            )}
            {request.livingroomTheme && (
              <Form.Group controlId='formBasicText'>
                <Form.Label>
                  <b>Living room Theme: </b>
                </Form.Label>{' '}
                {request.livingroomTheme}
              </Form.Group>
            )}
            {request.livingroomComments && (
              <Form.Group controlId='formBasicText'>
                <Form.Label>
                  <b>Living Room Spl Comments: </b>
                </Form.Label>{' '}
                {request.livingroomComments}
              </Form.Group>
            )}
            {request.diningRoomTheme && (
              <Form.Group controlId='formBasicText'>
                <Form.Label>
                  <b>Dining Room Theme: </b>
                </Form.Label>{' '}
                {request.diningRoomTheme}
              </Form.Group>
            )}
            {request.dinningRoomComments && (
              <Form.Group controlId='formBasicText'>
                <Form.Label>
                  <b>Dining Room Spl Comments: </b>
                </Form.Label>{' '}
                {request.dinningRoomComments}
              </Form.Group>
            )}
            {request.hallTheme && (
              <Form.Group controlId='formBasicText'>
                <Form.Label>
                  <b>Hall Theme: </b>
                </Form.Label>{' '}
                {request.hallTheme}
              </Form.Group>
            )}
            {request.hallComments && (
              <Form.Group controlId='formBasicText'>
                <Form.Label>
                  <b>Hall Comments: </b>
                </Form.Label>{' '}
                {request.hallComments}
              </Form.Group>
            )}
            {request.otherSpecialComments && (
              <Form.Group controlId='formBasicText'>
                <Form.Label>
                  <b>Other Comments: </b>
                </Form.Label>{' '}
                {request.otherSpecialComments}
              </Form.Group>
            )}
            <Form.Group controlId='formBasicText'>
              <Row>
                <Col md={2}>
                  <Form.Label>
                    <b>Enter Iframe URL: </b>
                  </Form.Label>
                </Col>
                <Col md={10}>
                  <Form.Control
                    as='textarea'
                    rows='3'
                    name='iframe'
                    value={iframe}
                    onChange={(e) => onChange(e)}
                    placeholder='Enter IFRAME URL'
                  />
                </Col>
              </Row>
            </Form.Group>
            <Form.Group className='text-center'>
              <Button
                variant='primary'
                className='text-center w-100'
                type='submit'
              >
                Update Request
              </Button>
            </Form.Group>
          </Form>
        </Col>
        <Col md={4} className='paper '>
          <h3>Plan Image:</h3>
          <div className='text-center'>
            <Image src={request.planDetails} className='imgwidth' rounded />
          </div>
        </Col>
      </Row>
      <Row>
        {iframe && (
          <Col className='paper text-center'>
            <h3>Iframe Preview</h3>
            <div dangerouslySetInnerHTML={{ __html: iframe }}></div>
          </Col>
        )}
      </Row>
    </Container>
  );
};
const mapStateToProps = (state) => ({
  request: state.adminauth.request,
});
export default connect(mapStateToProps, {
  getparticularuserreq,
  updateparticularrequest,
})(EditRequest);
