import { SPINNER, CLEAR_SPINNER } from './types';

export default (isLoading = false) => dispatch => {
  if (isLoading) {
    return dispatch({ type: SPINNER });
  }
  return dispatch({ type: CLEAR_SPINNER });
};
