import {
  REGISTER_FAIL,
  LOGIN_FAIL,
  EDIT_ADDRESS_FAIL,
  ADD_PERFUME_FAIL,
  CLEAR_ERRORS
} from '../actions/types';

const initialState = {};

export default function(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case REGISTER_FAIL:
    case LOGIN_FAIL:
    case EDIT_ADDRESS_FAIL:
    case ADD_PERFUME_FAIL:
      let errors = {};
      console.log('payload', payload);
      payload.forEach(err => {
        errors[err.param] = err.msg;
      });
      return errors;
    case CLEAR_ERRORS:
      return {};
    default:
      return state;
  }
}
