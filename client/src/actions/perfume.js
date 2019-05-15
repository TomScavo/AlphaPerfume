import axios from 'axios';

import {
  ADD_PERFUME,
  ADD_PERFUME_FAIL,
  ALERT_SUCCESS,
  ALERT_FAIL,
  CLEAR_ERRORS,
  GET_ALL_PERFUME,
  GET_ALL_PERFUME_FAIL,
  GET_MALE_PERFUME,
  GET_MALE_PERFUME_FAIL,
  GET_FEMALE_PERFUME,
  GET_FEMALE_PERFUME_FAIL,
  CLEAR_PERFUME_LOADING,
  GET_PERFUME_ITEM,
  GET_PERFUME_ITEM_FAIL,
  GET_SEARCH_ITEM,
  GET_SEARCH_ITEM_FAIL
} from './types';

export const addPerfume = ({
  gender,
  name,
  handle,
  description,
  twoPrc,
  twoLeft,
  fivePrc,
  fiveLeft,
  tenPrc,
  tenLeft
}) => async dispatch => {
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  };
  if (!(twoLeft && fiveLeft && tenLeft)) {
    twoLeft = fiveLeft = tenLeft = 100;
  }

  const body = JSON.stringify({
    gender,
    name,
    handle,
    description,
    twoPrc,
    twoLeft,
    fivePrc,
    fiveLeft,
    tenPrc,
    tenLeft
  });

  try {
    const res = await axios.post('/api/perfume', body, config);
    dispatch({
      type: ADD_PERFUME,
      payload: res.data
    });
    dispatch({
      type: ALERT_SUCCESS
    });
    dispatch({
      type: CLEAR_ERRORS
    });
  } catch (err) {
    const errors = err.response.data.errors;
    dispatch({
      type: ADD_PERFUME_FAIL,
      payload: errors
    });

    dispatch({
      type: ALERT_FAIL,
      payload: '失败'
    });
  }
};

export const getAllPerfume = () => async dispatch => {
  dispatch({
    type: CLEAR_PERFUME_LOADING
  });
  try {
    const res = await axios.get('/api/perfume');
    dispatch({
      type: GET_ALL_PERFUME,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: GET_ALL_PERFUME_FAIL
    });
  }
};

export const getMalePerfume = () => async dispatch => {
  dispatch({
    type: CLEAR_PERFUME_LOADING
  });
  try {
    const res = await axios.get('/api/perfume/male');
    dispatch({
      type: GET_MALE_PERFUME,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: GET_MALE_PERFUME_FAIL
    });
  }
};

export const getFemalePerfume = () => async dispatch => {
  dispatch({
    type: CLEAR_PERFUME_LOADING
  });
  try {
    const res = await axios.get('/api/perfume/female');
    dispatch({
      type: GET_FEMALE_PERFUME,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: GET_FEMALE_PERFUME_FAIL
    });
  }
};

export const getPerfumeItem = id => async dispatch => {
  await dispatch({
    type: CLEAR_PERFUME_LOADING
  });
  try {
    const res = await axios.get(`/api/perfume/item/${id}`);

    dispatch({
      type: GET_PERFUME_ITEM,
      payload: res.data
    });
  } catch (err) {
    console.log(err);
    dispatch({
      type: GET_PERFUME_ITEM_FAIL
    });
  }
};

export const getSerachResult = (value, history) => async dispatch => {
  dispatch({
    type: CLEAR_PERFUME_LOADING
  });
  try {
    console.log(`/api/perfume/search/${value}`);
    const res = await axios.get(`/api/perfume/search/${value}`);
    dispatch({
      type: GET_SEARCH_ITEM,
      payload: res.data
    });
    console.log(history);
    history.push('/serchresult');
  } catch (err) {
    console.log(err);
    dispatch({
      type: GET_SEARCH_ITEM_FAIL
    });
  }
};
