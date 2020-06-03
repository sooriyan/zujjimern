import React, { useState } from 'react';
import { connect } from 'react-redux';
import { addrequest } from '../../actions/auth';
import { Container, Row, Col, Badge, Form, Button } from 'react-bootstrap';
const CreateRequest = ({ history, addrequest }) => {
  const [rooms, setRooms] = useState({
    mbrbtn: false,
    cbrbtn: false,
    gbrbtn: false,
    lbtn: false,
    dbtn: false,
    hbtn: false,
    projectName: '',
    noofrooms: '',
    sqfeet: '',
    mbrTheme: '',
    file: '',
    filename: 'Upload Plan Image',
    mbrSpecialComments: '',
    cbrTheme: '',
    cbrSpecialComments: '',
    gbrTheme: '',
    gbrSpecialComments: '',
    livingroomTheme: '',
    livingroomComments: '',
    diningRoomTheme: '',
    dinningRoomComments: '',
    hallTheme: '',
    hallComments: '',
    otherSpecialComments: '',
  });
  const {
    mbrbtn,
    cbrbtn,
    gbrbtn,
    lbtn,
    dbtn,
    hbtn,
    file,
    filename,
    sqfeet,
    noofrooms,
    mbrTheme,
    mbrSpecialComments,
    cbrTheme,
    cbrSpecialComments,
    gbrTheme,
    gbrSpecialComments,
    livingroomTheme,
    livingroomComments,
    diningRoomTheme,
    dinningRoomComments,
    hallTheme,
    hallComments,
    otherSpecialComments,
    projectName,
  } = rooms;
  const onClick = (btn, arg) => {
    setRooms({ ...rooms, [btn]: arg });
  };
  const onChange = (e) => {
    setRooms({ ...rooms, [e.target.name]: e.target.value });
  };
  const onFileChangeHandler = (e) => {
    setRooms({
      ...rooms,
      file: e.target.files[0],
      filename: e.target.files[0].name,
    });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    addrequest(rooms);
    history.push('/userreqmgmt');
  };
  return (
    <Container>
      <br />
      <Row>
        <Col md={2} className=' paper'>
          <div className='text-center'>
            {' '}
            <h3>Add Rooms</h3>
          </div>{' '}
          <br />
          <h5>
            <Badge
              variant={mbrbtn ? 'success' : 'secondary'}
              className='badgebtn'
              onClick={() => onClick('mbrbtn', !mbrbtn)}
            >
              Master Bedroom
            </Badge>
          </h5>
          <br />
          <h5>
            <Badge
              variant={cbrbtn ? 'success' : 'secondary'}
              className='badgebtn'
              onClick={() => onClick('cbrbtn', !cbrbtn)}
            >
              Children Bedroom
            </Badge>
          </h5>
          <br />
          <h5>
            <Badge
              variant={gbrbtn ? 'success' : 'secondary'}
              className='badgebtn'
              onClick={() => onClick('gbrbtn', !gbrbtn)}
            >
              Guest Bedroom
            </Badge>
          </h5>
          <br />
          <h5>
            <Badge
              variant={lbtn ? 'success' : 'secondary'}
              className='badgebtn'
              onClick={() => onClick('lbtn', !lbtn)}
            >
              Living Room
            </Badge>
          </h5>
          <br />
          <h5>
            <Badge
              variant={dbtn ? 'success' : 'secondary'}
              className='badgebtn'
              onClick={() => onClick('dbtn', !dbtn)}
            >
              Dining Room
            </Badge>
          </h5>
          <br />
          <h5>
            <Badge
              variant={hbtn ? 'success' : 'secondary'}
              className='badgebtn'
              onClick={() => onClick('hbtn', !hbtn)}
            >
              Hall
            </Badge>
          </h5>
        </Col>
        <Col md={8} className=' paper'>
          <div className='text-center'>
            <h3>Create Request</h3>
          </div>
          <Form className='' onSubmit={(e) => onSubmit(e)}>
            <div className='overflow'>
              <Form.Group controlId='formBasicText' className='margin_apply'>
                <Form.Label>
                  <b>Project Name</b>
                </Form.Label>
                <Form.Control
                  name='projectName'
                  type='text'
                  value={projectName}
                  onChange={(e) => onChange(e)}
                  placeholder='Enter Project Name'
                />
              </Form.Group>
              <Form.Group controlId='formBasicText' className='margin_apply'>
                <Form.Label>
                  <b>Plan Image</b>
                </Form.Label>
                <Form.File
                  id='custom-file'
                  name='plandetails'
                  onChange={(e) => onFileChangeHandler(e)}
                  label={filename}
                  custom
                />
              </Form.Group>
              <Form.Group controlId='formBasicText' className='margin_apply'>
                <Form.Label>
                  <b>No of Rooms</b>
                </Form.Label>
                <Form.Control
                  name='noofrooms'
                  type='number'
                  value={noofrooms}
                  onChange={(e) => onChange(e)}
                  placeholder='Enter No of Rooms'
                />
              </Form.Group>
              <Form.Group controlId='formBasicText' className='margin_apply'>
                <Form.Label>
                  <b>Square Feet</b>
                </Form.Label>
                <Form.Control
                  name='sqfeet'
                  type='number'
                  value={sqfeet}
                  onChange={(e) => onChange(e)}
                  placeholder='Enter Square Feet'
                />
              </Form.Group>
              {mbrbtn && (
                <>
                  <Form.Group
                    controlId='formBasicText'
                    className='margin_apply'
                  >
                    <Form.Label>
                      <b>Master Bedroom Theme</b>
                    </Form.Label>
                    <Form.Control
                      name='mbrTheme'
                      type='text'
                      value={mbrTheme}
                      onChange={(e) => onChange(e)}
                      placeholder='Enter Master Bedroom Theme'
                    />
                  </Form.Group>
                  <Form.Group
                    controlId='formBasicText'
                    className='margin_apply'
                  >
                    <Form.Label>
                      <b>Master bedroom Comments</b>
                    </Form.Label>
                    <Form.Control
                      name='mbrSpecialComments'
                      as='textarea'
                      value={mbrSpecialComments}
                      onChange={(e) => onChange(e)}
                      placeholder='Enter Project Name'
                    />
                  </Form.Group>
                </>
              )}
              {cbrbtn && (
                <>
                  <Form.Group
                    controlId='formBasicText'
                    className='margin_apply'
                  >
                    <Form.Label>
                      <b>Children Bedroom Theme</b>
                    </Form.Label>
                    <Form.Control
                      name='cbrTheme'
                      type='text'
                      value={cbrTheme}
                      onChange={(e) => onChange(e)}
                      placeholder='Enter Child Bedroom Theme'
                    />
                  </Form.Group>
                  <Form.Group
                    controlId='formBasicText'
                    className='margin_apply'
                  >
                    <Form.Label>
                      <b>Children bedroom Comments</b>
                    </Form.Label>
                    <Form.Control
                      name='cbrSpecialComments'
                      as='textarea'
                      value={cbrSpecialComments}
                      onChange={(e) => onChange(e)}
                      placeholder='Enter Child Bedroom Comments'
                    />
                  </Form.Group>
                </>
              )}
              {gbrbtn && (
                <>
                  <Form.Group
                    controlId='formBasicText'
                    className='margin_apply'
                  >
                    <Form.Label>
                      <b>Guest Bedroom Theme</b>
                    </Form.Label>
                    <Form.Control
                      name='gbrTheme'
                      type='text'
                      value={gbrTheme}
                      onChange={(e) => onChange(e)}
                      placeholder='Enter Guest Bedroom Theme'
                    />
                  </Form.Group>
                  <Form.Group
                    controlId='formBasicText'
                    className='margin_apply'
                  >
                    <Form.Label>
                      <b>Guest bedroom Comments</b>
                    </Form.Label>
                    <Form.Control
                      name='gbrSpecialComments'
                      as='textarea'
                      value={gbrSpecialComments}
                      onChange={(e) => onChange(e)}
                      placeholder='Enter Guest Bedroom Comments'
                    />
                  </Form.Group>
                </>
              )}
              {lbtn && (
                <>
                  <Form.Group
                    controlId='formBasicText'
                    className='margin_apply'
                  >
                    <Form.Label>
                      <b>Living room Theme</b>
                    </Form.Label>
                    <Form.Control
                      name='livingroomTheme'
                      type='text'
                      value={livingroomTheme}
                      onChange={(e) => onChange(e)}
                      placeholder='Enter Guest Bedroom Theme'
                    />
                  </Form.Group>
                  <Form.Group
                    controlId='formBasicText'
                    className='margin_apply'
                  >
                    <Form.Label>
                      <b>Living Room Comments</b>
                    </Form.Label>
                    <Form.Control
                      name='livingroomComments'
                      as='textarea'
                      value={livingroomComments}
                      onChange={(e) => onChange(e)}
                      placeholder='Enter Living Room Comments'
                    />
                  </Form.Group>
                </>
              )}
              {dbtn && (
                <>
                  <Form.Group
                    controlId='formBasicText'
                    className='margin_apply'
                  >
                    <Form.Label>
                      <b>Dining room Theme</b>
                    </Form.Label>
                    <Form.Control
                      name='diningRoomTheme'
                      type='text'
                      value={diningRoomTheme}
                      onChange={(e) => onChange(e)}
                      placeholder='Enter Dining room Theme'
                    />
                  </Form.Group>
                  <Form.Group
                    controlId='formBasicText'
                    className='margin_apply'
                  >
                    <Form.Label>
                      <b>Dining Room Comments</b>
                    </Form.Label>
                    <Form.Control
                      name='dinningRoomComments'
                      as='textarea'
                      value={dinningRoomComments}
                      onChange={(e) => onChange(e)}
                      placeholder='Enter Dining Room Comments'
                    />
                  </Form.Group>
                </>
              )}
              {hbtn && (
                <>
                  <Form.Group
                    controlId='formBasicText'
                    className='margin_apply'
                  >
                    <Form.Label>
                      <b>Hall Theme</b>
                    </Form.Label>
                    <Form.Control
                      name='hallTheme'
                      type='text'
                      value={hallTheme}
                      onChange={(e) => onChange(e)}
                      placeholder='Enter Hall Theme'
                    />
                  </Form.Group>
                  <Form.Group
                    controlId='formBasicText'
                    className='margin_apply'
                  >
                    <Form.Label>
                      <b>Hall Comments</b>
                    </Form.Label>
                    <Form.Control
                      name='hallComments'
                      as='textarea'
                      value={hallComments}
                      onChange={(e) => onChange(e)}
                      placeholder='Enter Hall Comments'
                    />
                  </Form.Group>
                </>
              )}
              <Form.Group controlId='formBasicText' className='margin_apply'>
                <Form.Label>
                  <b>Other Comments</b>
                </Form.Label>
                <Form.Control
                  name='otherSpecialComments'
                  as='textarea'
                  value={otherSpecialComments}
                  onChange={(e) => onChange(e)}
                  placeholder='Enter Comments'
                />
              </Form.Group>
              <Form.Group className='text-center' className='margin_apply'>
                <Button
                  variant='primary'
                  className='text-center w-100'
                  type='submit'
                >
                  Send Request
                </Button>
              </Form.Group>
            </div>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default connect(null, { addrequest })(CreateRequest);
