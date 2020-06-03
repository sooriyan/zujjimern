import axios from 'axios';
import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  AUTH_ERROR,
  USER_LOADED,
  LOGIN_FAIL,
  LOGIN_SUCCESS,
  LOGOUT,
  CLEAR_PROFILE,
  GET_ALL_USER_REQUEST,
  GET_USER_PARTICULAR_REQUEST,
  CREATE_REQUEST,
  SET_LOADING,
  GET_DISTINCT_SQFT,
  GET_DISTINCT_BEDROOMS,
  GET_QUERY_BASED_OUTPUT,
  HOME_LOADING,
} from './types';
import { setAlert } from './alert';
import setAuthToken from '../utils/setAuthToken';

//Load User
export const loadUser = () => async (dispatch) => {
  if (localStorage.token) {
    setAuthToken(localStorage.token);
  }
  dispatch(setloading);
  try {
    const res = await axios.get('/api/auth');
    dispatch({
      type: USER_LOADED,
      payload: res.data,
    });
  } catch (error) {
    dispatch({
      type: AUTH_ERROR,
    });
  }
};
//REGISTER USER
export const register = ({ name, email, password, location }) => async (
  dispatch
) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };
  const body = JSON.stringify({ name, email, password, location });
  try {
    const res = await axios.post('/api/users', body, config);
    dispatch({
      type: REGISTER_SUCCESS,
      payload: res.data,
    });
    dispatch(loadUser());
  } catch (error) {
    const errors = error.response.data.errors;
    console.log(errors);
    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, 'danger', 4000)));
    }
    dispatch({
      type: REGISTER_FAIL,
    });
  }
};
//Email verification
export const emailverify = (token, history) => async (dispatch) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };
  const body = JSON.stringify({ token });
  try {
    const res = await axios.put('/emailverify', body, config);
    setAlert('Email Verification Completed Successfully', 'success', '2000');
    history.push('/login');
  } catch (error) {
    const errors = error.response.data.errors;
    console.log(error);
    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, 'danger', 4000)));
    }
  }
};
//Login User
export const login = (email, password) => async (dispatch) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };
  const body = JSON.stringify({ email, password });
  try {
    const res = await axios.post('/api/auth', body, config);
    dispatch({
      type: LOGIN_SUCCESS,
      payload: res.data,
    });
    dispatch(loadUser());
  } catch (error) {
    const errors = error.response.data.errors;
    console.log(errors);
    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, 'danger', 4000)));
    }
    dispatch({
      type: LOGIN_FAIL,
    });
  }
};
export const loadrequests = () => async (dispatch) => {
  dispatch(setloading());
  if (localStorage.token) {
    setAuthToken(localStorage.token);
  }
  try {
    const res = await axios.get('/api/users/requests');
    dispatch({
      type: GET_ALL_USER_REQUEST,
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
export const userparticularrequest = (reqid) => async (dispatch) => {
  dispatch(setloading);
  if (localStorage.token) {
    setAuthToken(localStorage.token);
  }
  try {
    const res = await axios.get(`/api/users/getreq/${reqid}`);
    dispatch({
      type: GET_USER_PARTICULAR_REQUEST,
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
//Create request
export const addrequest = (req) => async (dispatch) => {
  if (localStorage.token) {
    setAuthToken(localStorage.token);
  }
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };
  const body = JSON.stringify(req);
  try {
    const res = await axios.post(`/api/users/request`, body, config);
    dispatch({
      type: CREATE_REQUEST,
      payload: res.data,
    });
    const id = res.data._id;
    const fupconfig = {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    };
    const innerbody = new FormData();
    innerbody.append('file', req.file);
    innerbody.append('id', id);
    try {
      const fupres = await axios.post('/api/fileupload', innerbody, fupconfig);
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
export const setloading = () => (dispatch) => {
  dispatch({ type: SET_LOADING });
};
export const setHomeLoading = () => (dispatch) => {
  dispatch({ type: HOME_LOADING });
};
export const getdistinctbedrooms = () => async (dispatch) => {
  try {
    const distinctbedrooms = await axios.get(
      '/api/project/getdistinctbedrooms'
    );
    dispatch({
      type: GET_DISTINCT_BEDROOMS,
      payload: distinctbedrooms.data,
    });
  } catch (error) {
    const errors = error.response.data.errors;
    console.log(errors);
    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, 'danger', 4000)));
    }
  }
};
export const getdistinctsqft = () => async (dispatch) => {
  try {
    const distinctsqft = await axios.get('/api/project/getdistinctsqft');
    dispatch({
      type: GET_DISTINCT_SQFT,
      payload: distinctsqft.data,
    });
  } catch (error) {
    const errors = error.response.data.errors;
    console.log(errors);
    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, 'danger', 4000)));
    }
  }
};
export const getquerybasedoutput = (resp) => async (dispatch) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };
  dispatch(setHomeLoading());
  try {
    const res = await axios.post('/api/project/queryget', resp, config);
    dispatch({
      type: GET_QUERY_BASED_OUTPUT,
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
    const res = await axios.post('/api/users/fwpwd', body, config);
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
    const res = await axios.put('/api/users/fwpwd', body, config);
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
//Logout /Clear profile
export const logout = () => (dispatch) => {
  dispatch({ type: LOGOUT });
};
