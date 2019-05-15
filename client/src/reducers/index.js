import { combineReducers } from 'redux';
import auth from './auth';
import alert from './alert';
import errors from './errors';
import address from './address';
import perfume from './perfume';
import cart from './cart';
import spinner from './spinner';
// import alert from './alert';
// import profile from './profile';
// import post from './post';

export default combineReducers({
  auth,
  errors,
  address,
  perfume,
  alert,
  cart,
  spinner
});
