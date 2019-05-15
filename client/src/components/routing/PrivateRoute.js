import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import alert from '../../actions/alert';

const PrivateRoute = ({
  component: Component,
  auth: { isAuthenticated, loading },
  alert,
  ...rest
}) => (
  <Route
    {...rest}
    render={props => {
      if (!isAuthenticated && !loading) {
        alert(false, '请先登录');
        return <Redirect to="/login" />;
      }
      return <Component {...props} />;
    }}
  />
);

PrivateRoute.propTypes = {
  auth: PropTypes.object.isRequired,
  alert: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { alert }
)(PrivateRoute);
