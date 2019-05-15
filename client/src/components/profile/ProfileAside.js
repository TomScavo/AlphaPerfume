import React from 'react';
import { Link } from 'react-router-dom';
import { logout } from '../../actions/auth';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

const ProfileAside = ({ props, isProfile, logout }) => {
  const onLogout = () => {
    logout(props);
  };
  return (
    <div
      className={`border border-secondary p-4 small ${
        !isProfile ? 'not-profile-aside' : ''
      }`}
    >
      <p
        onClick={onLogout}
        className="text-left pb-3 text-grey border-bottom border-secondary cursor"
      >
        退出登录
      </p>
      <div className="p-rel px-3 pb-3">
        <i className="fas fa-user profile-icon" />

        <p className="text-left mt-2">我的设置</p>
        <Link to="/userinfo">
          <p className="text-left mt-2 text-grey">会员信息</p>
        </Link>
        <Link to="address">
          <p className="text-left mt-2 text-grey">管理地址</p>
        </Link>
      </div>
      <div className="p-rel px-3 pb-3">
        <i className="fas fa-shopping-bag profile-icon" />
        <Link to="order">
          <p className="text-left mt-2 text-grey">我的订单</p>
        </Link>
      </div>
      <div className="p-rel px-3">
        <i className="fas fa-shopping-cart profile-icon" />
        <Link to="cart">
          <p className="text-left mt-2 text-grey">购物车</p>
        </Link>
      </div>
    </div>
  );
};

ProfileAside.protoTypes = {
  logout: PropTypes.func.isRequired
};

export default connect(
  null,
  { logout }
)(ProfileAside);
