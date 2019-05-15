import { ALERT_SUCCESS, ALERT_FAIL, CLEAR_ALERT } from '../actions/types';

const initialState = {
  isSuccess: false,
  isRender: false,
  msg: ''
};

export default function(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case ALERT_SUCCESS:
      return { isSuccess: true, isRender: true, msg: payload };
    case ALERT_FAIL:
      return { isSuccess: false, isRender: true, msg: payload };
    case CLEAR_ALERT:
      return { isSuccess: false, isRender: false, msg: '' };
    default:
      return state;
  }
}
