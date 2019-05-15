import React, { Fragment, Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import ProfileAside from './ProfileAside';
import { connect } from 'react-redux';
import { getAddress } from '../../actions/profile';
import Spinner from '../utils/Spinner';

class Address extends Component {
  componentWillMount() {
    window.scrollTo(0, 0);
    const init = async () => {
      await this.props.getAddress();
      if (!this.props.address.hasAddress) {
        this.props.history.push('/editaddress');
      }
    };
    init();
  }

  render() {
    const {
      name,
      number,
      province,
      city,
      area,
      detail,
      isLoading
    } = this.props.address;
    return (
      <Fragment>
        <main className="py-3">
          <p className="border-bottom pb-2 border-secondary">管理地址 </p>
          <div className="main-container m-auto py-3 text-grey">
            <div className="row">
              <div className="col-lg-3 p-3">
                <ProfileAside history={this.props.history} isProfile={false} />
              </div>
              <div className="col-lg-9 p-3">
                <div className="border border-secondary p-4 text-left small">
                  <div className="row">
                    <div className="col-lg-6">
                      <p className="text-left mt-3 border-bottom border-grey">
                        默认地址
                      </p>
                      {isLoading ? <Spinner size={1.5} /> : ''}
                      <p>{this.props.address.name}</p>
                      <p>{`${province}${city}${area}${detail}`}</p>
                      <p>{`电话号码: ${number}`}</p>
                    </div>
                    <div className="col-lg-6 pt-5">
                      <Link to="/editaddress">
                        <p className="text-info">修改地址</p>
                      </Link>
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
  }
}

Address.propTypes = {
  address: PropTypes.object.isRequired,
  getAddress: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  address: state.address
});

export default connect(
  mapStateToProps,
  { getAddress }
)(Address);
