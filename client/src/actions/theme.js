import { SET_THEME } from './types';

//Change Theme
export const changeTheme = () => (dispatch) => {
  dispatch({ type: SET_THEME });
};
