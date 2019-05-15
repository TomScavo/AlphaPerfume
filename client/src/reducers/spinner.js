import { SPINNER, CLEAR_SPINNER } from '../actions/types';

const initialState = {
  isLoading: false
};

export default function(state = initialState, action) {
  const { type } = action;
  switch (type) {
    case SPINNER:
      return { isLoading: false };
    case CLEAR_SPINNER:
      return { isLoading: true };
    default:
      return state;
  }
}
