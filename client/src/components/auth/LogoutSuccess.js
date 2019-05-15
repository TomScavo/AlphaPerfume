import React, { useEffect } from 'react';
import { Redirect } from 'react-router-dom';

const LogoutSuccess = props => {
  useEffect(() => {
    setTimeout(() => {
      props.history.push('/');
    }, 3000);
  }, []);

  return (
    <div className="py-5">
      <h3>您已注销</h3>
      <p>您已退出，3秒钟内会回到首页。</p>
    </div>
  );
};

export default LogoutSuccess;
