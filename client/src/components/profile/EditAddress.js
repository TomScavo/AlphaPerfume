import React, { Fragment, Component } from 'react';
import ProfileAside from './ProfileAside';
import classnames from 'classnames';
import address from './address.json';
import { connect } from 'react-redux';
import { editAddress } from '../../actions/profile';
import PropTypes from 'prop-types';

class EditAddress extends Component {
  state = {
    name: '',
    number: '',
    province: '',
    city: '',
    area: '',
    detail: '',
    currentProvince: '',
    currentCitys: [],
    currentAreas: [],
    errors: {}
  };
  componentWillMount() {
    window.scrollTo(0, 0);
    if (this.props.address.hasAddress) {
      const { name, number, province, city, area, detail } = this.props.address;
      let currentCitys = [];
      for (let key in address[province]) {
        currentCitys.push(key);
      }

      let currentAreas = address[province][city];

      this.setState({
        name,
        number,
        province,
        city,
        area,
        detail,
        currentProvince: province,
        currentCitys,
        currentAreas
      });
    }
  }
  componentDidMount() {}
  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
  }
  onTextChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  //on province change
  onChange = e => {
    let currentCitys = [];
    for (let key in address[e.target.value]) {
      currentCitys.push(key);
    }
    let currentAreas = address[e.target.value][currentCitys[0]];

    this.setState({
      currentProvince: e.target.value,
      currentCitys,
      currentAreas,
      province: e.target.value,
      city: currentCitys[0],
      area: currentAreas[0]
    });
  };

  onCityChange = e => {
    let currentAreas = address[this.state.currentProvince][e.target.value];
    this.setState({
      currentAreas,
      city: e.target.value,
      area: currentAreas[0]
    });
  };
  onAreaChange = e => {
    this.setState({ area: e.target.value });
  };

  onClick = e => {
    e.preventDefault();
    const { name, number, province, city, area, detail } = this.state;
    console.log(name, number, province, city, area, detail);
    this.props.editAddress(
      { name, number, province, city, area, detail },
      this.props.history
    );
    // console.log(name, number, province, city, area, detail);
  };

  render() {
    let errors = this.state.errors;
    return (
      <Fragment>
        <main className="py-3">
          <p className="border-bottom pb-2 border-secondary">添加地址</p>
          <div className="main-container m-auto py-3 text-grey">
            <div className="row">
              <div className="col-lg-3 p-3">
                <ProfileAside props={this.props} isProfile={false} />
              </div>
              <div className="col-lg-9 p-3">
                <div className="border border-secondary p-4 text-left small">
                  <p className=" my-3">添加新地址</p>

                  <form onSubmit={this.onSubmit}>
                    <p className="border-bottom border-grey">联系信息</p>
                    <div
                      className={classnames('form-input-item', {
                        'form-input-error': errors.name
                      })}
                    >
                      <label htmlFor="name" className="d-inline-block pr-4">
                        名字*
                      </label>
                      <input
                        name="name"
                        value={this.state.name}
                        onChange={e => {
                          this.onTextChange(e);
                        }}
                        className="address-input"
                        type="text"
                      />
                      <p className="invalid-feedback small">{errors.name}</p>
                    </div>
                    <div
                      className={classnames('form-input-item', {
                        'form-input-error': errors.number
                      })}
                    >
                      <label htmlFor="name" className="d-inline-block pr-4">
                        电话*
                      </label>
                      <input
                        name="number"
                        value={this.state.number}
                        onChange={e => {
                          this.onTextChange(e);
                        }}
                        className="address-input"
                        type="text"
                      />
                      <p className="invalid-feedback small">{errors.number}</p>
                    </div>
                    <p className="border-bottom border-grey pt-5">地址</p>
                    <div className="row">
                      <div className="col-md-4">
                        <select
                          onChange={e => {
                            this.onChange(e);
                          }}
                          value={this.state.province || '选择省份'}
                          name="province"
                          title="州/省"
                          className={classnames('validate-select', {
                            'select-error': errors.province
                          })}
                        >
                          <option selected disabled>
                            选择省份
                          </option>
                          <option>上海</option>
                          <option>云南省</option>
                          <option>内蒙古自治区</option>
                          <option>北京</option>
                          <option>吉林省</option>
                          <option>四川省</option>
                          <option>天津</option>
                          <option>宁夏回族自治区</option>
                          <option>安徽省</option>
                          <option>山东省</option>
                          <option>山西省</option>
                          <option>广东省</option>
                          <option>广西壮族自治区</option>
                          <option>新疆维吾尔自治区</option>
                          <option>江苏省</option>
                          <option>江西省</option>
                          <option>河北省</option>
                          <option>河南省</option>
                          <option>浙江省</option>
                          <option>海南省</option>
                          <option>湖北省</option>
                          <option>湖南省</option>
                          <option>甘肃省</option>
                          <option>福建省</option>
                          <option>西藏自治区</option>
                          <option>贵州省</option>
                          <option>辽宁省</option>
                          <option>重庆</option>
                          <option>陕西省</option>
                          <option>青海省</option>
                          <option>黑龙江省</option>
                        </select>
                      </div>
                      <div className="col-md-4">
                        <select
                          onChange={e => {
                            this.onCityChange(e);
                          }}
                          value={this.state.city || '城市'}
                          name="city"
                          className={classnames('validate-select', {
                            'select-error': errors.province
                          })}
                        >
                          <option disabled selected>
                            城市
                          </option>
                          {this.state.currentCitys.map(city => (
                            <option key={city}>{city}</option>
                          ))}
                        </select>
                      </div>
                      <div className="col-md-4">
                        <select
                          onChange={e => {
                            this.onAreaChange(e);
                          }}
                          value={this.state.area || '区域'}
                          name="area"
                          className={classnames('validate-select', {
                            'select-error': errors.province
                          })}
                        >
                          <option disabled selected>
                            区域
                          </option>
                          {this.state.currentAreas.map(area => (
                            <option key={area}>{area}</option>
                          ))}
                        </select>
                      </div>
                    </div>

                    <div
                      className={classnames('form-input-item mt-3', {
                        'form-input-error': errors.detail
                      })}
                    >
                      <label htmlFor="name" className="d-inline-block pr-4">
                        详细地址*
                      </label>
                      <input
                        name="detail"
                        value={this.state.detail}
                        onChange={e => {
                          this.onTextChange(e);
                        }}
                        className="address-input"
                        type="text"
                      />
                      <p className="invalid-feedback small">{errors.detail}</p>
                    </div>
                    <div className="d-flex justify-content-end">
                      <button
                        className="submit-button my-3"
                        onClick={this.onClick}
                      >
                        提交
                      </button>
                    </div>
                  </form>
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

EditAddress.propTypes = {
  editAddress: PropTypes.func.isRequired,
  address: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  address: state.address,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { editAddress }
)(EditAddress);
