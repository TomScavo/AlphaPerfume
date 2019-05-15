import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <Fragment>
      <footer className="bg-black text-white">
        <div className="container p-5">
          <h3 className="py-4 mb-4">网上专享服务</h3>
          <div className="row">
            <div className="col-md-4">
              <i className="fas fa-box-open fa-3x text-white py-5" />
              <p>免费送货</p>
              <p> 所有订单皆享免费送货</p>
            </div>
            <div className="col-md-4">
              <i className="fas fa-undo fa-3x text-white py-5" />
              <p>7天无理由退货</p>
              <p>所有订单签收日起7天内可享无理由退货</p>
            </div>
            <div className="col-md-4">
              <i className="fas fa-gift fa-3x text-white py-5" />
              <p>馈赠的艺术</p>
              <p>订购作品采用礼盒包装，并可加入个性化讯息</p>
            </div>
          </div>
        </div>
        <div className="bg-white text-black contact py-5">
          <ul>
            <li className="py-3">
              <Link to="/contact">联系我们</Link>
            </li>
            <li className="py-3">
              <Link to="/deliver">配送及退货</Link>
            </li>
            <li className="py-3">
              <Link to="/useinfo">使用条款</Link>
            </li>
            <li className="py-3">
              <Link to="/dataprotect">数据保护章程</Link>
            </li>
          </ul>
        </div>
        <div className="copyright bg-white text-black py-4 ">
          Copyright &copy; {new Date().getFullYear()} Alpha Fragrance
        </div>
      </footer>
    </Fragment>
  );
};

export default Footer;
