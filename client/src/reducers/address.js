import {
  GET_ADDRESS,
  GET_ADDRESS_FAIL,
  EDIT_ADDRESS,
  CLEAR_ADDRESS
} from '../actions/types';

const initialState = {
  isLoading: true,
  hasAddress: false,
  name: '',
  number: '',
  province: '',
  city: '',
  area: '',
  detail: ''
};

export default function(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case GET_ADDRESS:
      const { name, number, province, city, area, detail } = payload.address;
      return {
        ...state,
        name,
        number,
        province,
        city,
        area,
        detail,
        hasAddress: true,
        isLoading: false
      };
    case GET_ADDRESS_FAIL:
      return { ...state, hasAddress: false };
    case CLEAR_ADDRESS:
      return {
        isLoading: true,
        hasAddress: false,
        name: '',
        number: '',
        province: '',
        city: '',
        area: '',
        detail: ''
      };
    case EDIT_ADDRESS:
      return state;
    default:
      return state;
  }
}
