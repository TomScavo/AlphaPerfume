import React, { Fragment, useEffect } from 'react';

const DataProtect = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <Fragment>
      <section className="login main-container m-auto py-5 text-left d-flex justify-content-center">
        <div className="register-form text-grey">
          <h2 className=" display-5 mb-3 px-4 py-3">数据保护章则</h2>
          <div className="register-form-group p-5">
            <div className="row ">
              个人信息保护政策（以下简称“隐私政策”）我们尊重您的隐私，并将尽力确保您的个人信息得到妥善保护。
            </div>
          </div>
        </div>
      </section>
    </Fragment>
  );
};
export default DataProtect;
