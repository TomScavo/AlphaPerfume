import { ALERT_SUCCESS, ALERT_FAIL, CLEAR_ALERT } from './types';

export default (isSuccess, msg) => dispatch => {
  if (isSuccess) {
    return dispatch({ type: ALERT_SUCCESS, payload: msg });
  }
  return dispatch({ type: ALERT_FAIL, payload: msg });
};

export const clearAlert = () => dispatch => {
  return dispatch({ type: CLEAR_ALERT });
};
