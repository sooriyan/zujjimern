import {
  ADMIN_REGISTER_SUCCESS,
  ADMIN_REGISTER_FAIL,
  ADMIN_USER_LOADED,
  ADMIN_AUTH_ERROR,
  ADMIN_LOGIN_SUCCESS,
  ADMIN_LOGIN_FAIL,
  ADMIN_LOGOUT,
  GET_ALL_ADMIN,
  GET_ALL_PROJECT,
  ADD_PROJECT,
  GET_PARTICULAR_PROJECT,
  SET_PROJECT_OBJECT,
  GET_ALL_REQUESTS,
  GET_PARTICULAR_REQUEST,
  UPDATE_PARTICULAR_REQUEST,
  GET_RECENT_REQS,
  GET_RECENT_PROJECTS,
  GET_ALL_USERS,
  DELETE_USER,
} from '../actions/types';
const initialState = {
  admintoken: localStorage.getItem('admintoken'),
  adminisAuthenticated: null,
  adminloading: true,
  admin: null,
  admins: [],
  projects: [],
  project: {},
  requests: [],
  request: {},
  recentreqs: [],
  recentprojects: [],
  allusers: [],
};
export default function (state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case ADMIN_LOGIN_SUCCESS:
      localStorage.setItem('admintoken', payload.token);
      return {
        ...state,
        ...payload,
        adminisAuthenticated: true,
        adminloading: false,
      };
    case ADMIN_REGISTER_FAIL:
    case ADMIN_AUTH_ERROR:
    case ADMIN_LOGIN_FAIL:
    case ADMIN_LOGOUT:
      localStorage.removeItem('admintoken');
      return {
        ...state,
        admintoken: null,
        adminisAuthenticated: false,
        adminloading: false,
      };
    case ADD_PROJECT:
      return {
        ...state,
        projects: [...state.projects, payload],
      };
    case GET_ALL_ADMIN:
      return {
        ...state,
        admins: payload,
        adminloading: false,
      };
    case GET_ALL_USERS:
      return {
        ...state,
        allusers: payload,
      };
    case DELETE_USER:
      return {
        ...state,
        allusers: state.allusers.filter((user) => user._id !== payload),
      };
    case SET_PROJECT_OBJECT: {
      return {
        ...state,
        project: payload,
      };
    }
    case GET_ALL_PROJECT:
      return {
        ...state,
        projects: payload,
        adminloading: false,
      };
    case GET_PARTICULAR_PROJECT:
      return {
        ...state,
        project: payload,
        adminloading: false,
      };
    case GET_ALL_REQUESTS:
      return {
        ...state,
        requests: payload,
      };
    case ADMIN_USER_LOADED:
      return {
        ...state,
        adminisAuthenticated: true,
        adminloading: false,
        admin: payload,
      };
    case GET_PARTICULAR_REQUEST:
      return {
        ...state,
        request: payload,
        adminloading: false,
      };
    case UPDATE_PARTICULAR_REQUEST:
      return {
        ...state,
        request: payload,
        adminloading: false,
      };
    case GET_RECENT_REQS:
      return {
        ...state,
        recentreqs: payload,
        adminloading: false,
      };
    case GET_RECENT_PROJECTS:
      return {
        ...state,
        recentprojects: payload,
        adminloading: false,
      };
    default:
      return state;
  }
}
