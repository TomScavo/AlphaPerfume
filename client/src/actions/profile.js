import axios from 'axios';

import {
  GET_ADDRESS,
  GET_ADDRESS_FAIL,
  EDIT_ADDRESS,
  EDIT_ADDRESS_FAIL
} from './types';

export const getAddress = () => async dispatch => {
  try {
    const res = await axios.get('/api/address');
    dispatch({
      type: GET_ADDRESS,
      payload: res.data
    });
  } catch (err) {
    console.error(err);
    console.log(err);
    dispatch({
      type: GET_ADDRESS_FAIL,
      payload: err
    });
  }
};

export const editAddress = (
  { name, number, province, city, area, detail },
  history
) => async dispatch => {
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  };

  const body = JSON.stringify({ name, number, province, city, area, detail });
  try {
    const res = await axios.post('/api/address', body, config);
    dispatch({
      type: EDIT_ADDRESS,
      payload: res.data
    });

    history.push('/address');
  } catch (err) {
    console.log(err);
    const errors = err.response.data.errors;
    dispatch({
      type: EDIT_ADDRESS_FAIL,
      payload: errors
    });
  }
};
