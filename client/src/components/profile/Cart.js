import React, { Fragment, useEffect } from 'react';
import classnames from 'classnames';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import ProfileAside from './ProfileAside';
import { getCart, changeSum, deleteCart } from '../../actions/cart';
import alertFail from '../../actions/alert';

import SpinnerOverlay from '../utils/SpinnerOverlay';

const Cart = props => {
  const { cart, getCart, changeSum, deleteCart, alertFail } = props;
  const onAmountClick = (type, id, ml) => {
    if (type === 'decrease') {
      changeSum({ id, isIncrease: false, ml });
    } else {
      changeSum({ id, isIncrease: true, ml });
    }
  };
  const onDeleteClick = id => {
    deleteCart(id);
  };
  const getSum = () => {
    let sum = 0;
    for (let i = 0; i < cart.items.length; i++) {
      sum += cart.items[i].format.price * cart.items[i].format.amount;
    }
    return sum;
  };
  const onPayClick = () => {
    alertFail(false, '支付功能暂未开放敬请期待');
  };
  useEffect(() => {
    window.scrollTo(0, 0);
    getCart();
  }, [getCart]);
  return (
    <Fragment>
      <main className="py-3">
        <p className="border-bottom pb-2 border-secondary">我的购物车</p>
        <div className="main-container m-auto py-3 text-grey">
          <div className="row">
            <div className="col-lg-3 p-3">
              <ProfileAside props={props} isProfile={false} />
            </div>
            <div className="col-lg-9 p-3">
              <div
                className={classnames('border border-secondary  p-4  small', {
                  'border-bottom-0': cart.items.length
                })}
              >
                <p className="text-left mt-3">商品列表</p>
                {Boolean(cart.items.length) && (
                  <Fragment>
                    {cart.isLoading && <SpinnerOverlay />}
                    {cart.items.map(item => (
                      <div key={item._id} className="cart-item-wrap py-4">
                        <Link
                          className="cart-item-img"
                          to={`/perfumeDetail/${item.perfume}`}
                        >
                          <img
                            src={require(`../../img/items/${item.handle}.jpg`)}
                            alt=""
                          />
                        </Link>
                        <div className="cart-item-name justify-content-center d-flex align-items-center">
                          <div>
                            <p className="text-capitalize">{item.name}</p>
                            <p>{item.format.ml}ml</p>
                          </div>
                        </div>

                        <div className="cart-item-button d-flex justify-content-between align-items-center">
                          <i
                            onClick={() => {
                              onAmountClick(
                                'decrease',
                                item.perfume,
                                item.format.ml
                              );
                            }}
                            className="fas fa-minus-circle"
                          />
                          <span>{item.format.amount}</span>
                          <i
                            onClick={() => {
                              onAmountClick(
                                'increase',
                                item.perfume,
                                item.format.ml
                              );
                            }}
                            className="fas fa-plus-circle"
                          />
                        </div>
                        <div className="cart-item-sum d-flex justify-content-center align-items-center">
                          <span className="p-3">
                            ￥{item.format.price * item.format.amount}
                          </span>
                          <span
                            className="cursor"
                            onClick={() => {
                              onDeleteClick(item._id);
                            }}
                          >
                            删除
                          </span>
                        </div>
                      </div>
                    ))}
                  </Fragment>
                )}
                {!cart.items.length && (
                  <div className="pt3">
                    <p>这里是空的</p>
                    <Link to="/">
                      <p className="text-info">去购物</p>
                    </Link>
                  </div>
                )}
              </div>
              {Boolean(cart.items.length) && (
                <Fragment>
                  <p className="py-4 bg-grey">总计 : ￥{getSum()}</p>
                  <div className="d-flex justify-content-center">
                    <button
                      onClick={onPayClick}
                      className=" submit-button mt-3"
                    >
                      <span>结 账</span>
                    </button>
                  </div>
                </Fragment>
              )}
            </div>
          </div>
        </div>
      </main>
    </Fragment>
  );
};

Cart.propTypes = {
  cart: PropTypes.object.isRequired,
  getCart: PropTypes.func.isRequired,
  changeSum: PropTypes.func.isRequired,
  deleteCart: PropTypes.func.isRequired,
  alertFail: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  cart: state.cart
});

export default connect(
  mapStateToProps,
  { getCart, changeSum, deleteCart, alertFail }
)(Cart);
