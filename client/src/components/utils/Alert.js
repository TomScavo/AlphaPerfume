import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { clearAlert } from '../../actions/alert';

class Alert extends Component {
  state = {
    show: false,
    isSuccess: false,
    msg: ''
  };

  componentWillReceiveProps(nextProps) {
    if (nextProps.alert.isRender) {
      this.setState({
        show: true,
        isSuccess: nextProps.alert.isSuccess,
        msg: nextProps.alert.msg
      });
      setTimeout(() => {
        this.setState({ show: false, isSuccess: false, msg: '' });
        this.props.clearAlert();
      }, 3000);
    }
  }
  render() {
    return (
      <div>
        {this.state.show ? (
          <div
            className={`alert ${
              this.state.isSuccess ? 'alert-success' : 'alert-danger'
            }`}
          >
            <p className="ms-none">{this.state.msg}</p>
          </div>
        ) : (
          ''
        )}
      </div>
    );
  }
}

Alert.propTypes = {
  alert: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  alert: state.alert
});

export default connect(
  mapStateToProps,
  { clearAlert }
)(Alert);
