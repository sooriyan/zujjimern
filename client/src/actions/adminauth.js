import axios from 'axios';
import {
  ADMIN_REGISTER_SUCCESS,
  ADMIN_REGISTER_FAIL,
  ADMIN_AUTH_ERROR,
  ADMIN_USER_LOADED,
  ADMIN_LOGIN_FAIL,
  ADMIN_LOGIN_SUCCESS,
  ADMIN_LOGOUT,
  GET_ALL_ADMIN,
  GET_ALL_PROJECT,
  ADD_PROJECT,
  GET_PARTICULAR_PROJECT,
  SET_PROJECT_OBJECT,
  GET_ALL_REQUESTS,
  GET_PARTICULAR_REQUEST,
  UPDATE_PARTICULAR_REQUEST,
  GET_RECENT_PROJECTS,
  GET_RECENT_REQS,
} from './types';
import { setHomeLoading } from './auth';
import { setAlert } from './alert';
import setAdminAuthToken from '../utils/setAdminAuthToken';
//Load Admin
export const adminloadUser = () => async (dispatch) => {
  if (localStorage.admintoken) {
    setAdminAuthToken(localStorage.admintoken);
  }
  try {
    const res = await axios.get('/api/adminauth');
    dispatch({
      type: ADMIN_USER_LOADED,
      payload: res.data,
    });
  } catch (error) {
    dispatch({
      type: ADMIN_AUTH_ERROR,
    });
  }
};
//REGISTER Admin
export const adminregister = ({ name, email, password }) => async (
  dispatch
) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };
  const body = JSON.stringify({ name, email, password });
  try {
    const res = await axios.post('/api/admin', body, config);
    dispatch({
      type: ADMIN_REGISTER_SUCCESS,
      payload: res.data,
    });
    dispatch(adminloadUser());
  } catch (error) {
    const errors = error.response.data.errors;
    console.log(errors);
    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, 'danger', 4000)));
    }
    dispatch({
      type: ADMIN_REGISTER_FAIL,
    });
  }
};
//Get All Admins
export const getalladmins = () => async (dispatch) => {
  if (localStorage.admintoken) {
    setAdminAuthToken(localStorage.admintoken);
  }
  try {
    const res = await axios.get('/api/admin');
    dispatch({
      type: GET_ALL_ADMIN,
      payload: res.data,
    });
    console.log(res.data);
  } catch (error) {
    const errors = error.response.data.errors;
    console.log(errors);
    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, 'danger', 4000)));
    }
  }
};
//Get All Projects
export const getallprojects = () => async (dispatch) => {
  if (localStorage.admintoken) {
    setAdminAuthToken(localStorage.admintoken);
  }
  try {
    const res = await axios.get('/api/project');
    dispatch({
      type: GET_ALL_PROJECT,
      payload: res.data,
    });
    console.log(res.data);
  } catch (error) {
    const errors = error.response.data.errors;
    console.log(errors);
    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, 'danger', 4000)));
    }
  }
};
//Add Project
export const addproject = ({
  id,
  name,
  bedroom,
  sqft,
  facing,
  link,
  newproj,
  file,
  filename,
}) => async (dispatch) => {
  if (localStorage.admintoken) {
    setAdminAuthToken(localStorage.admintoken);
  }
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };
  const body = JSON.stringify({
    id,
    name,
    bedroom,
    sqft,
    facing,
    link,
    newproj,
  });
  try {
    const res = await axios.post('/api/project', body, config);
    dispatch({
      type: ADD_PROJECT,
      payload: res.data,
    });
    const id = res.data._id;
    const fupconfig = {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    };
    const innerbody = new FormData();
    innerbody.append('file', file);
    innerbody.append('id', id);
    try {
      const fupres = await axios.post(
        '/api/fileupload/project',
        innerbody,
        fupconfig
      );
    } catch (errord) {
      const errors = errord.response.data.errors;
      if (errors) {
        errors.forEach((error) =>
          dispatch(setAlert(error.msg, 'danger', 4000))
        );
      }
    }
  } catch (error) {
    const errors = error.response.data.errors;
    console.log(errors);
    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, 'danger', 4000)));
    }
  }
};
//Login Admin
export const adminlogin = (email, password) => async (dispatch) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };
  const body = JSON.stringify({ email, password });
  try {
    const res = await axios.post('/api/adminauth', body, config);
    dispatch({
      type: ADMIN_LOGIN_SUCCESS,
      payload: res.data,
    });
    dispatch(adminloadUser());
  } catch (error) {
    const errors = error.response.data.errors;
    console.log(errors);
    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, 'danger', 4000)));
    }
    dispatch({
      type: ADMIN_LOGIN_FAIL,
    });
  }
};
//Onchange Project
export const setProject = (project) => async (dispatch) => {
  console.log(project);
  dispatch({
    type: SET_PROJECT_OBJECT,
    payload: project,
  });
};
//Get Particular Project
export const getparticularproject = (projid) => async (dispatch) => {
  console.log(projid);
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };
  const body = JSON.stringify({ projid });
  try {
    const res = await axios.put('/api/project/getproject', body, config);
    dispatch({
      type: GET_PARTICULAR_PROJECT,
      payload: res.data,
    });
  } catch (error) {
    const errors = error.response.data.errors;
    console.log(errors);
    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, 'danger', 4000)));
    }
  }
};
//GET all user requests
export const getalluserreqs = () => async (dispatch) => {
  if (localStorage.admintoken) {
    setAdminAuthToken(localStorage.admintoken);
  }
  try {
    const res = await axios.get('/api/admin/getreqs');
    dispatch({
      type: GET_ALL_REQUESTS,
      payload: res.data,
    });
  } catch (error) {
    const errors = error.response.data.errors;
    console.log(errors);
    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, 'danger', 4000)));
    }
  }
};
//Get Particular User Request
export const getparticularuserreq = (requestid) => async (dispatch) => {
  if (localStorage.admintoken) {
    setAdminAuthToken(localStorage.admintoken);
  }
  try {
    const res = await axios.get(`/api/admin/getreq/${requestid}`);
    console.log(res);
    dispatch({
      type: GET_PARTICULAR_REQUEST,
      payload: res.data,
    });
  } catch (error) {
    const errors = error.response.data.errors;
    console.log(errors);
    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, 'danger', 4000)));
    }
  }
};

//Update Particular request
export const updateparticularrequest = (requestid, projectLoc) => async (
  dispatch
) => {
  if (localStorage.admintoken) {
    setAdminAuthToken(localStorage.admintoken);
  }
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };
  const body = JSON.stringify({ projectLoc });
  try {
    const res = await axios.put(`/api/admin/getreq/${requestid}`, body, config);
    dispatch({
      type: UPDATE_PARTICULAR_REQUEST,
      payload: res.data,
    });
  } catch (error) {
    const errors = error.response.data.errors;
    console.log(errors);
    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, 'danger', 4000)));
    }
  }
};
export const getrecentreqs = () => async (dispatch) => {
  try {
    const res = await axios.get('/api/admin/recentreqs');
    dispatch({
      type: GET_RECENT_REQS,
      payload: res.data,
    });
  } catch (error) {
    const errors = error.response.data.errors;
    console.log(errors);
    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, 'danger', 4000)));
    }
  }
};
export const getrecentprojects = () => async (dispatch) => {
  dispatch(setHomeLoading);
  try {
    const res = await axios.get('/api/project/recentprojects');
    dispatch({
      type: GET_RECENT_PROJECTS,
      payload: res.data,
    });
  } catch (error) {
    const errors = error.response.data.errors;
    console.log(errors);
    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, 'danger', 4000)));
    }
  }
};
//Send Email for forgot password
export const forgotpwdsendemail = (email) => async (dispatch) => {
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };
    const body = JSON.stringify({ email });
    const res = await axios.post('/api/admin/fwpwd', body, config);
    if (res) {
      dispatch(setAlert(res.data.msg, 'success', 4000));
    }
  } catch (error) {
    const errors = error.response.data.errors;
    console.log(errors);
    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, 'danger', 4000)));
    }
  }
};
//Update Password for forgot password
export const forgotpwdupdatepwd = (param, password) => async (dispatch) => {
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };
    const body = JSON.stringify({ param, password });
    const res = await axios.put('/api/admin/fwpwd', body, config);
    if (res) {
      dispatch(setAlert('Updated Password Successfully', 'success', 4000));
    }
  } catch (error) {
    const errors = error.response.data.errors;
    console.log(errors);
    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, 'danger', 4000)));
    }
  }
};
//Logout
export const adminlogout = () => (dispatch) => {
  dispatch({ type: ADMIN_LOGOUT });
};
