import React, { Fragment, useEffect } from 'react';
import ProfileAside from './ProfileAside';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getAddress } from '../../actions/profile';

const UserInfo = props => {
  const { name } = props;
  useEffect(() => {
    window.scrollTo(0, 0);
    getAddress();
  }, []);
  return (
    <Fragment>
      <main className="py-3">
        <p className="border-bottom pb-2 border-secondary">我的帐户</p>
        <div className="main-container m-auto py-3 text-grey">
          <div className="row">
            <div className="col-lg-3 p-3">
              <ProfileAside props={props} isProfile={false} />
            </div>
            <div className="col-lg-9 p-3">
              <div className="border border-secondary p-4  small">
                <p className="text-left mt-3">会员信息</p>
                <div className="d-flex justify-content-around pt-3">
                  <div>
                    <p>姓名</p>
                    <p>{Boolean(name) && name}</p>
                  </div>
                  <div>
                    <p>会员积分</p>
                    <p>0</p>
                  </div>
                  <div>
                    <p>会员类型</p>
                    <p>大众会员</p>
                  </div>
                  <div>
                    <p>到期日期</p>
                    <p> 2200/12/23 </p>
                  </div>
                </div>
              </div>
              {/* <div className="border border-secondary mt-3 p-4 small">awd</div> */}
            </div>
          </div>
        </div>
      </main>
    </Fragment>
  );
};

UserInfo.propTypes = {
  name: PropTypes.string.isRequired
};

const mapStateToProps = state => ({
  name: state.address.name
});

export default connect(mapStateToProps)(UserInfo);
