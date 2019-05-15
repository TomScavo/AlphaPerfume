import React, { Fragment, useEffect } from 'react';

const UseInfo = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <Fragment>
      <section className="login main-container m-auto py-5 text-left d-flex justify-content-center">
        <div className="register-form text-grey">
          <h2 className=" display-5 mb-3 px-4 py-3">使用条款</h2>
          <div className="register-form-group p-5">
            <div className="row ">版权归属 © Alpha Fragrance</div>
          </div>
        </div>
      </section>
    </Fragment>
  );
};
export default UseInfo;
