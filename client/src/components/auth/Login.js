import React, { Fragment, useState, useEffect } from 'react';
import classnames from 'classnames';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { login } from '../../actions/auth';

const Login = ({ auth, errors, login }) => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const { email, password } = formData;

  const onChange = e =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async e => {
    e.preventDefault();
    login({ email, password });
  };

  if (auth.isAuthenticated) {
    return <Redirect to="/profile" />;
  }
  return (
    <Fragment>
      <section className="login py-5 text-left d-flex justify-content-center">
        <div className="register-form text-grey">
          <h2 className=" display-5 mb-3 px-4 py-3">登录或创建帐户</h2>
          <div className="register-form-group p-4 pt-5">
            <div className="row ">
              <div className="col-md-6 px-5">
                <p>账号密码登录</p>
                <form onSubmit={onSubmit}>
                  <div
                    className={classnames('form-input-item', {
                      'form-input-error': errors.email
                    })}
                  >
                    <input
                      placeholder="邮箱"
                      onChange={onChange}
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
                      onChange={onChange}
                      value={password}
                      name="password"
                      type="password"
                    />
                    <p className="invalid-feedback small">{errors.password}</p>
                  </div>
                  <div className="d-flex justify-content-end">
                    <input
                      type="submit"
                      className="submit-button my-3"
                      value="登陆"
                    />
                  </div>
                </form>
              </div>
              <div className="col-md-6 px-3 create-user-link">
                <p>注册Alpha账户</p>
                <p className="small pb-4">
                  注册Alpha账号以便追踪您的订单，
                  管理收货地址，获取更多个性化信息
                </p>
                <Link to="register">
                  <button className="btn btn-outline-dark btn-block mt-5">
                    创建账户
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Fragment>
  );
};

Login.propTypes = {
  login: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { login }
)(Login);
