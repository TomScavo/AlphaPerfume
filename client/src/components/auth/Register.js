import React, { Component, Fragment } from 'react';
import classnames from 'classnames';
import { connect } from 'react-redux';
import { register } from '../../actions/auth';
import { Link, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';

class Register extends Component {
  state = {
    email: '',
    password: '',
    password2: '',
    errors: {}
  };

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
  }

  onChange = e => this.setState({ [e.target.name]: e.target.value });

  onSubmit = async e => {
    const { email, password, password2 } = this.state;
    e.preventDefault();
    this.props.register({ email, password, password2 }, this.props.history);
  };
  componentDidMount() {
    window.scrollTo(0, 0);
  }

  render() {
    if (this.props.auth.isAuthenticated) {
      this.props.history.push('/profile');
    }
    const { email, password, password2, errors } = this.state;
    return (
      <Fragment>
        <section className="login py-5 text-left d-flex justify-content-center">
          <div className="register-form text-grey">
            <h2 className=" display-5 mb-3 px-3">创建帐户</h2>
            <div className="register-form-group p-4 pt-5">
              <div className="row ">
                <div className="col-md-6 px-4 py-3">
                  <p>邮箱账号注册</p>
                  <form onSubmit={e => this.onSubmit(e)}>
                    <div
                      className={classnames('form-input-item', {
                        'form-input-error': errors.email
                      })}
                    >
                      <input
                        placeholder="邮箱"
                        onChange={this.onChange}
                        value={email}
                        name="email"
                        type="text"
                      />
                      <p className="invalid-feedback small">{errors.email}</p>
                    </div>
                    <div
                      className={classnames('form-input-item', {
                        'form-input-error': errors.password
                      })}
                    >
                      <input
                        placeholder="密码"
                        onChange={this.onChange}
                        value={password}
                        name="password"
                        type="password"
                      />
                      <p className="invalid-feedback small">
                        {errors.password}
                      </p>
                    </div>
                    <div
                      className={classnames('form-input-item', {
                        'form-input-error': errors.password2
                      })}
                    >
                      <input
                        placeholder="确认密码"
                        onChange={this.onChange}
                        value={password2}
                        name="password2"
                        type="password"
                      />
                      <p className="invalid-feedback small">
                        {errors.password2}
                      </p>
                    </div>
                    <div className="d-flex justify-content-end">
                      <input
                        type="submit"
                        className="submit-button my-3"
                        value="注册"
                      />
                    </div>
                  </form>
                </div>
                <div className="col-md-6 px-3 create-user-link">
                  <p>关注Alpha微信公众号享更多优惠</p>
                  <div className="py-4 d-flex justify-content-center">
                    <img
                      className="w-50 h-50 d-block"
                      src={require('../../img/qr.jpg')}
                      alt=""
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </Fragment>
    );
  }
}

Register.propTypes = {
  register: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { register }
)(Register);
