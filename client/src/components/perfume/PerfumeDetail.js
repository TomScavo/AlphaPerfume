import React, { Fragment, Component } from 'react';
import PropTypes from 'prop-types';
import { getPerfumeItem } from '../../actions/perfume';
import { addToCart } from '../../actions/cart';
import Spinner from '../utils/Spinner';
import { connect } from 'react-redux';
import classnames from 'classnames';

class PerfumeDetail extends Component {
  state = {
    currentML: '2',
    currentPrice: 0,
    isCollapes: true
  };

  onBuyClick = () => {
    if (!this.props.isAuthenticated) {
      return this.props.history.push('/cart');
    }
    const itemId = this.props.match.params.perfumeId;
    console.log(this.props.perfume.item.handle);
    this.props.addToCart(
      {
        ml: this.state.currentML,
        price: this.state.currentPrice,
        handle: this.props.perfume.item.handle,
        id: itemId,
        name: this.props.perfume.item.name
      },
      this.props.history
    );
  };

  onPriceChick = ml => {
    if (ml === 2) {
      this.setState({
        currentML: '2',
        currentPrice: this.props.perfume.item.type.two.price,
        isCollapes: true
      });
    } else if (ml === 5) {
      this.setState({
        currentML: '5',
        currentPrice: this.props.perfume.item.type.five.price,
        isCollapes: true
      });
    } else {
      this.setState({
        currentML: '10',
        currentPrice: this.props.perfume.item.type.ten.price,
        isCollapes: true
      });
    }
  };

  onCollapeClick = () => {
    if (this.state.isCollapes) {
      this.setState({ isCollapes: false });
    } else {
      this.setState({ isCollapes: true });
    }
  };

  componentWillMount() {
    window.scrollTo(0, 0);
    let perfumeId = this.props.match.params.perfumeId;
    this.props.getPerfumeItem(perfumeId);
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.perfume.item.type) {
      this.setState({ currentPrice: nextProps.perfume.item.type.two.price });
    }
  }

  render() {
    return (
      <Fragment>
        {this.props.perfume.isLoading || !this.props.perfume.item.handle ? (
          <Spinner />
        ) : (
          <section className="py-5">
            <div className="row  pb-4">
              <div className="col-md-8">
                <div className="container pb-3">
                  <img
                    className="detail-img-wrap"
                    src={require(`../../img/items/${
                      this.props.perfume.item.handle
                    }.jpg`)}
                    alt=""
                  />
                </div>
              </div>
              <div className="col-md-4 text-left">
                <div className="container">
                  <h3 className=" pb-5 border-bottom border-grey">
                    {this.props.perfume.item.name}
                  </h3>

                  <div className="border-bottom border-grey detail-wrap">
                    <div
                      className="d-flex justify-content-between py-3 border-bottom border-grey"
                      onClick={this.onCollapeClick}
                    >
                      <span>{this.state.currentML}ml</span>
                      <div className="d-flex align-items-center">
                        <span className="px-3">
                          ￥{this.state.currentPrice}
                        </span>
                        <i className="fas fa-chevron-down" />
                      </div>
                    </div>
                    <div
                      className={classnames(
                        'item-detail-collapse border-bottom border-grey',
                        {
                          show: !this.state.isCollapes
                        }
                      )}
                    >
                      <div
                        className="d-flex justify-content-between py-3"
                        onClick={() => {
                          this.onPriceChick(2);
                        }}
                      >
                        <span>2ml</span>
                        <div className="d-flex align-items-center">
                          <span className="px-3">
                            ￥{this.props.perfume.item.type.two.price}
                          </span>
                        </div>
                      </div>
                      <div
                        className="d-flex justify-content-between py-3"
                        onClick={() => {
                          this.onPriceChick(5);
                        }}
                      >
                        <span>5ml</span>
                        <div className="d-flex align-items-center">
                          <span className="px-3">
                            ￥{this.props.perfume.item.type.five.price}
                          </span>
                        </div>
                      </div>
                      <div
                        className="d-flex justify-content-between py-3"
                        onClick={() => {
                          this.onPriceChick(10);
                        }}
                      >
                        <span>10ml</span>
                        <div className="d-flex align-items-center">
                          <span className="px-3">
                            ￥{this.props.perfume.item.type.ten.price}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="py-5 d-flex justify-content-center ">
                    <button
                      onClick={this.onBuyClick}
                      className=" submit-button mt-3"
                    >
                      <i className="fas fa-shopping-bag text-white pr-2" />
                      <span>加入购物车</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div className="container">
              <h5 className="border-bottom border-grey py-3">说明</h5>
              <div className="container">
                <p className="py-5 mb-5 text-left text-justify">
                  {this.props.perfume.item.description}
                </p>
              </div>
            </div>
          </section>
        )}
      </Fragment>
    );
  }
}

PerfumeDetail.propTypes = {
  perfume: PropTypes.object.isRequired,
  getPerfumeItem: PropTypes.func.isRequired,
  addToCart: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool.isRequired
};

const mapStateToProps = state => ({
  perfume: state.perfume,
  isAuthenticated: state.auth.isAuthenticated
});

export default connect(
  mapStateToProps,
  { getPerfumeItem, addToCart }
)(PerfumeDetail);
