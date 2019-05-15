import React, { Fragment, useEffect } from 'react';
import ProfileAside from './ProfileAside';
import { Link } from 'react-router-dom';

const Order = props => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <Fragment>
      <main className="py-3">
        <p className="border-bottom pb-2 border-secondary">我的订单</p>
        <div className="main-container m-auto py-3 text-grey">
          <div className="row">
            <div className="col-lg-3 p-3">
              <ProfileAside props={props} isProfile={false} />
            </div>
            <div className="col-lg-9 p-3">
              <div className="border border-secondary p-4  small">
                <p className="text-left mt-3">订单信息</p>
                <div className="pt3">
                  <p>暂无顶单</p>
                  <Link to="/">
                    <p className="text-info">去购物</p>
                  </Link>
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

export default Order;
