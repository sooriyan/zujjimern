import { SET_THEME } from '../actions/types';

const initialState = {
  light: true,
};
export default function (state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case SET_THEME:
      return {
        ...state,
        light: !state.light,
      };
    default:
      return state;
  }
}
