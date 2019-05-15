import axios from 'axios';
import alert from './alert';
import spinner from './spinner';
import {
  ADD_SHOPPING_CART,
  ADD_SHOPPING_CART_FAIL,
  GET_CART,
  GET_CART_FAIL,
  RESET_CART_LOADING,
  CHANGE_CART_AMOUNT,
  CHANGE_CART_AMOUNT_FAIL,
  DELETE_CAR
} from './types';

export const addToCart = (perfume, history) => async dispatch => {
  dispatch(spinner());
  const body = JSON.stringify(perfume);
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    };
    await axios.post('/api/cart', body, config);
    dispatch({
      type: ADD_SHOPPING_CART
    });
    dispatch(spinner(true));
    history.push('/cart');
  } catch (err) {
    dispatch(spinner(true));
    console.log(err);
    dispatch({
      type: ADD_SHOPPING_CART_FAIL
    });
  }
};

export const getCart = () => async dispatch => {
  dispatch(spinner());
  try {
    const res = await axios.get('/api/cart');
    dispatch({
      type: GET_CART,
      payload: res.data
    });
    dispatch(spinner(true));
  } catch (err) {
    dispatch(spinner(true));
    console.log(err);
    dispatch({
      type: GET_CART_FAIL
    });
  }
};

export const changeSum = payload => async dispatch => {
  dispatch({
    type: RESET_CART_LOADING
  });
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  };
  const body = JSON.stringify(payload);
  try {
    const res = await axios.post('/api/cart/amount', body, config);
    dispatch({ type: CHANGE_CART_AMOUNT, payload: res.data });
  } catch (err) {
    console.log(err.response.data.msg);
    dispatch({ type: CHANGE_CART_AMOUNT_FAIL });
    dispatch(alert(false, err.response.data.msg));
  }
};

export const deleteCart = id => async dispatch => {
  dispatch({
    type: RESET_CART_LOADING
  });
  try {
    const res = await axios.delete(`/api/cart/${id}`);
    dispatch({
      type: DELETE_CAR,
      payload: res.data
    });
  } catch (err) {
    console.log(err);
  }
};
