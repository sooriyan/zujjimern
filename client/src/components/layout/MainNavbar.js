import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { changeTheme } from '../../actions/theme';
import { Navbar, NavDropdown, Nav, Button } from 'react-bootstrap';
import { logout } from '../../actions/auth';
import { adminlogout } from '../../actions/adminauth';
const MainNavbar = ({
  changeTheme,
  theme: { light },
  logout,
  adminlogout,
  auth: { isAuthenticated, loading },
  adminauth: { adminisAuthenticated, adminloading },
}) => {
  const changetheme = () => {
    changeTheme();
  };
  const authLinks = (
    <>
      <Nav.Link>
        <Link to='/dashboard'>
          <i className='fa fa-user' /> Dashboard
        </Link>
      </Nav.Link>
      <Nav.Link>
        <Link to='/userreqmgmt'>
          <i className='fa fa-bell' /> Requests
        </Link>
      </Nav.Link>
      <Nav.Link>
        <a href='#!' onClick={logout}>
          <i className='fa fa-sign-out' /> Logout
        </a>
      </Nav.Link>
    </>
  );
  const adminauthLinks = (
    <>
      <Nav.Link>
        <Link to='/admindashboard'>
          <i className='fa fa-user' /> Dashboard
        </Link>
      </Nav.Link>
      <Nav.Link>
        <Link to='/reqmgmt'>
          <i className='fa fa-bell' /> Requests
        </Link>
      </Nav.Link>
      <Nav.Link>
        <Link to='/usermgmt'>
          <i className='fa fa-user' /> Users
        </Link>
      </Nav.Link>
      <Nav.Link>
        <Link to='/projectmgmt'>
          <i className='fa fa-video-camera' /> Project
        </Link>
      </Nav.Link>
      <Nav.Link>
        <Link to='/adminmgmt'>
          <i className='fa fa-users' /> Admin
        </Link>
      </Nav.Link>
      <Nav.Link>
        <a href='#!' onClick={adminlogout}>
          <i className='fa fa-sign-out' /> Logout
        </a>
      </Nav.Link>
    </>
  );
  const guestLinks = (
    <>
      <Nav.Link>
        <Link to='/register'>Register</Link>
      </Nav.Link>
      <Nav.Link>
        <Link to='/login'>Login</Link>
      </Nav.Link>
    </>
  );
  return (
    <Navbar
      bg={light ? 'light' : 'dark'}
      variant={light ? 'light' : 'dark'}
      expand='lg'
      className='sticky-top'
    >
      <Navbar.Brand href='/'>
        <b>Zujji</b>
      </Navbar.Brand>
      <Navbar.Toggle aria-controls='basic-navbar-nav' />
      <Navbar.Collapse id='basic-navbar-nav'>
        <Nav className='mr-auto'></Nav>

        <Nav>
          {!loading &&
            (isAuthenticated
              ? authLinks
              : !adminloading &&
                (adminisAuthenticated ? adminauthLinks : guestLinks))}
        </Nav>
        <Nav>
          {light ? (
            <Button variant='dark' onClick={changetheme}>
              <i className='fa fa-moon-o'></i>
            </Button>
          ) : (
            <Button variant='light' onClick={changetheme}>
              <i className='fa fa-sun-o' aria-hidden='true'></i>
            </Button>
          )}
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};
const mapStateToProps = (state) => ({
  theme: state.theme,
  auth: state.auth,
  adminauth: state.adminauth,
});
export default connect(mapStateToProps, { changeTheme, logout, adminlogout })(
  MainNavbar
);
