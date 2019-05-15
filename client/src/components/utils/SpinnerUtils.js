import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import SpinnerOverlay from './SpinnerOverlay';

const SpinnerUtils = ({ spinner }) => {
  return <Fragment>{spinner.isLoading && <SpinnerOverlay />}</Fragment>;
};

SpinnerUtils.propTypes = {
  spinner: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  spinner: state.spinner
});

export default connect(mapStateToProps)(SpinnerUtils);
