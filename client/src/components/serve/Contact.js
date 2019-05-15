import React, { Fragment, useEffect } from 'react';

const Contact = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <Fragment>
      <section className="login main-container m-auto py-5 text-left d-flex justify-content-center">
        <div className="register-form text-grey w-100">
          <h2 className=" display-5 mb-3 px-4 py-3">Contact us</h2>
          <div className="register-form-group p-5">
            <div className="w-100 ">
              <p className="py-3">Administrator: Alpha</p>
              <p>WeChat: a982736481(Alpha)</p>
              <p>E-mail: tomscavo960@hotmail.com</p>
              <p>Tel: 17764507147</p>
              <p />
            </div>
          </div>
        </div>
      </section>
    </Fragment>
  );
};
export default Contact;
