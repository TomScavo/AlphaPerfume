import React, { Fragment, Component } from 'react';
import InputItem from '../utils/InputItem';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { addPerfume } from '../../actions/perfume';

class Perfume extends Component {
  state = {
    gender: 'male',
    name: '',
    handle: '',
    description: '',
    twoPrc: '',
    twoLeft: '',
    fivePrc: '',
    fiveLeft: '',
    tenPrc: '',
    tenLeft: '',
    isSubmitSuccess: false
  };

  onSubmit = async e => {
    e.preventDefault();
    const {
      name,
      handle,
      gender,
      description,
      twoPrc,
      twoLeft,
      fivePrc,
      fiveLeft,
      tenPrc,
      tenLeft
    } = this.state;
    const payload = {
      name,
      handle,
      description,
      gender,
      twoPrc,
      twoLeft,
      fivePrc,
      fiveLeft,
      tenPrc,
      tenLeft
    };
    this.props.addPerfume(payload);
  };
  onChange = e => this.setState({ [e.target.name]: e.target.value });
  componentWillReceiveProps(nextProps) {
    console.log(nextProps.perfume);
    if (nextProps.perfume.isAddSuccess) {
      this.setState({
        name: '',
        handle: '',
        description: '',
        gender: 'male',
        twoPrc: '',
        twoLeft: '',
        fivePrc: '',
        fiveLeft: '',
        tenPrc: '',
        tenLeft: '',
        isSubmitSuccess: false
      });
    }
  }

  render() {
    const {
      name,
      handle,
      description,
      gender,
      twoPrc,
      twoLeft,
      fivePrc,
      fiveLeft,
      tenPrc,
      tenLeft
    } = this.state;
    const { onSubmit, onChange } = this;
    return (
      <div className="main-container m-auto">
        <form className="text-left" onSubmit={onSubmit}>
          <InputItem
            placeholder={'handle'}
            name={handle}
            errors={this.props.errors.handle}
            onChange={onChange}
          />
          <select name="gender" value={gender} onChange={onChange}>
            <option value="male">male</option>
            <option value="female">female</option>
          </select>
          <InputItem
            placeholder={'name'}
            name={name}
            errors={this.props.errors.name}
            onChange={onChange}
          />

          <InputItem
            placeholder={'description'}
            errors={this.props.errors.description}
            name={description}
            onChange={onChange}
          />
          <InputItem
            placeholder={'twoPrc'}
            type={'number'}
            errors={this.props.errors.twoPrc}
            name={twoPrc}
            onChange={onChange}
          />
          <InputItem
            placeholder={'twoLeft'}
            errors={this.props.errors.twoLeft}
            type={'number'}
            name={twoLeft}
            onChange={onChange}
          />
          <InputItem
            placeholder={'fivePrc'}
            errors={this.props.errors.fivePrc}
            type={'number'}
            name={fivePrc}
            onChange={onChange}
          />
          <InputItem
            placeholder={'fiveLeft'}
            errors={this.props.errors.fiveLeft}
            type={'number'}
            name={fiveLeft}
            onChange={onChange}
          />
          <InputItem
            type={'number'}
            errors={this.props.errors.tenPrc}
            placeholder={'tenPrc'}
            name={tenPrc}
            onChange={onChange}
          />
          <InputItem
            type={'number'}
            errors={this.props.errors.tenLeft}
            placeholder={'tenLeft'}
            name={tenLeft}
            onChange={onChange}
          />
          <div className="d-flex justify-content-end">
            <input type="submit" className="submit-button my-3" value="提交" />
          </div>
        </form>
      </div>
    );
  }
}

Perfume.propTypes = {
  errors: PropTypes.object.isRequired,
  perfume: PropTypes.object.isRequired,
  addPerfume: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  errors: state.errors,
  perfume: state.perfume
});

export default connect(
  mapStateToProps,
  { addPerfume }
)(Perfume);
