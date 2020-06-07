import React from 'react';
import { ThemeProvider } from 'styled-components';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { lightTheme, darkTheme } from '../../theme/theme';
import { GlobalStyles } from '../../theme/global';
import Register from '../auth/Register';
import Login from '../auth/Login';
import AlertComp from './AlertComp';
import Dashboard from '../dashboard/Dashboard';
import Requests from '../user/Requests';
import PrivateRoute from '../routing/PrivateRoute';
import PrivateAdminRoute from '../routing/PrivateAdminRoute';
import EmailVerify from '../auth/EmailVerify';
import MainNavbar from './MainNavbar';
import AdminMgmt from '../admin/AdminMgmt';
import ForgotPwd from '../admin/ForgotPwd';
import AddProject from '../admin/AddProject';
import EditProject from '../admin/EditProject';
import RequestMgmt from '../admin/RequestMgmt';
import EditRequest from '../admin/EditRequest';
import ProjectMgmt from '../admin/ProjectMgmt';
import UserMgmt from '../admin/UserMgmt';
import AdminLogin from '../adminauth/AdminLogin';
import AdminRegister from '../adminauth/AdminRegister';
import AdminDashboard from '../dashboard/AdminDashboard';
import ResetPwd from '../admin/ResetPwd';
import MainComponent from './MainComponent.js';
import UserForgotPwd from '../user/UserForgotPwd';
import UserResetPwd from '../user/UserResetPwd';
import { connect } from 'react-redux';
import CreateRequest from '../user/CreateRequest';
const Home = ({ theme: { light } }) => {
  return (
    <ThemeProvider theme={light ? lightTheme : darkTheme}>
      <GlobalStyles />
      <Router>
        <MainNavbar />
        <AlertComp />
        <Switch>
          <Route exact path='/adminlogin' component={AdminLogin} />
          <PrivateAdminRoute exact path='/addAdmin' component={AdminRegister} />
          <PrivateAdminRoute
            exact
            path='/admindashboard'
            component={AdminDashboard}
          />
          <PrivateAdminRoute
            exact
            path='/editproject/:projid'
            component={EditProject}
          />
          <PrivateAdminRoute exact path='/adminmgmt' component={AdminMgmt} />
          <PrivateAdminRoute exact path='/reqmgmt' component={RequestMgmt} />
          <PrivateAdminRoute
            exact
            path='/editrequest/:reqid'
            component={EditRequest}
          />
          <PrivateAdminRoute
            exact
            path='/projectmgmt'
            component={ProjectMgmt}
          />
          <PrivateAdminRoute exact path='/addproject' component={AddProject} />
          <PrivateAdminRoute exact path='/usermgmt' component={UserMgmt} />
          <Route exact path='/register' component={Register} />
          <Route exact path='/login' component={Login} />
          <Route exact path='/' component={MainComponent} />
          <Route exact path='/adminfpwd' component={ForgotPwd} />
          <Route exact path='/fpwd' component={UserForgotPwd} />
          <Route exact path='/emailverify/:token' component={EmailVerify} />
          <Route exact path='/adminfpwd/:token' component={ResetPwd} />
          <Route exact path='/fpwd/:token' component={UserResetPwd} />
          <PrivateRoute exact path='/dashboard' component={Dashboard} />
          <PrivateRoute exact path='/userreqmgmt' component={Requests} />
          <PrivateRoute exact path='/addreq' component={CreateRequest} />
        </Switch>
      </Router>
    </ThemeProvider>
  );
};
const mapStateToProps = (state) => ({
  theme: state.theme,
});
export default connect(mapStateToProps)(Home);
