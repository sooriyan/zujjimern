import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  USER_LOADED,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
  GET_ALL_USER_REQUEST,
  GET_USER_PARTICULAR_REQUEST,
  CREATE_REQUEST,
  SET_LOADING,
  GET_DISTINCT_BEDROOMS,
  GET_DISTINCT_SQFT,
  GET_RECENT_PROJECTS,
  GET_QUERY_BASED_OUTPUT,
  HOME_LOADING,
} from '../actions/types';
const initialState = {
  token: localStorage.getItem('token'),
  isAuthenticated: null,
  loading: true,
  user: null,
  requests: [],
  request: {},
  distinctbedrooms: [],
  distinctsqft: [],
  dashboardprojects: [],
  homeloading: true,
};
export default function (state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case REGISTER_SUCCESS:
    case LOGIN_SUCCESS:
      localStorage.setItem('token', payload.token);
      return {
        ...state,
        ...payload,
        isAuthenticated: true,
        loading: false,
      };
    case REGISTER_FAIL:
    case AUTH_ERROR:
    case LOGIN_FAIL:
    case LOGOUT:
      localStorage.removeItem('token');
      return {
        ...state,
        token: null,
        isAuthenticated: false,
        loading: false,
      };
    case USER_LOADED:
      return {
        ...state,
        isAuthenticated: true,
        loading: false,
        user: payload,
      };
    case GET_ALL_USER_REQUEST:
      return {
        ...state,
        loading: false,
        requests: payload,
      };
    case GET_USER_PARTICULAR_REQUEST:
      return {
        ...state,
        loading: false,
        request: payload,
      };
    case CREATE_REQUEST:
      return {
        ...state,
        loading: false,
        requests: [...state.requests, payload],
      };
    case SET_LOADING:
      return {
        ...state,
        loading: true,
      };
    case HOME_LOADING:
      return {
        ...state,
        homeloading: true,
      };
    case GET_DISTINCT_BEDROOMS:
      return {
        ...state,
        distinctbedrooms: payload,
      };
    case GET_DISTINCT_SQFT:
      return {
        ...state,
        distinctsqft: payload,
      };
    case GET_RECENT_PROJECTS:
      return {
        ...state,
        dashboardprojects: payload,
        homeloading: false,
      };
    case GET_QUERY_BASED_OUTPUT:
      return {
        ...state,
        dashboardprojects: payload,
        homeloading: false,
      };
    default:
      return state;
  }
}
