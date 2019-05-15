import React, { Fragment, Component } from 'react';
import { withRouter } from 'react-router';
import { Redirect } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { UserIcon, HanburgerIcon, ShoppingBag } from './NavbarIcon';
import { connect } from 'react-redux';
import { getSerachResult } from '../../actions/perfume';

import PropTypes from 'prop-types';

class Navbar extends Component {
  state = {
    search: '',
    isSerach: false,
    navExtend: false,
    isValid: false
  };

  onSearchClick = e => {
    e.preventDefault();
    if (this.state.search === '') {
      this.props.history.push('/allperfume');
      return;
    }
    this.props.getSerachResult(this.state.search, this.props.history);
  };

  onChange = e => {
    if (e.target.value.trim() !== '') {
      this.setState({ isValid: true });
    } else {
      this.setState({ isValid: false });
    }
    this.setState({ search: e.target.value });
  };

  onNavClick = () => {
    if (this.state.navExtend === false) {
      this.setState({ navExtend: true });
    } else {
      this.setState({ navExtend: false });
    }
  };
  render() {
    return (
      <Fragment>
        <header>
          <div className="container">
            <div className="header-content">
              <div className="header-left">
                <nav className="navbar-content">
                  <button onClick={this.onNavClick} className="header-button">
                    <HanburgerIcon />
                    <span className="pl-2 header-button-title">目录</span>
                  </button>
                </nav>
              </div>
              <div className="header-left-search">
                <form onSubmit={this.onSearchClick}>
                  <div className="input-group header-search">
                    <input
                      type="text"
                      onChange={this.onChange}
                      value={this.state.search}
                      name="search"
                      className="header-form"
                      placeholder=" 在alpha.cn上搜索"
                    />
                    <div className="input-group-append ">
                      <div
                        onClick={this.onSearchClick}
                        className={`input-group-text header-search-icon ${
                          this.state.isValid ? 'header-search-icon-input' : ''
                        }`}
                      >
                        <svg
                          data-name="Calque 1"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 18.99 18.98"
                        >
                          <path d="M19,18.06l-6.84-6.87a6.88,6.88,0,1,0-.92.92L18.08,19ZM6.85,12.46a5.63,5.63,0,1,1,5.64-5.62A5.63,5.63,0,0,1,6.85,12.46Z" />
                        </svg>
                      </div>
                    </div>
                  </div>
                </form>
              </div>
              <div className="header-center">
                <h1>
                  <Link className="link" to="/">
                    Alpha
                  </Link>
                </h1>
              </div>
              <div className="header-right d-flex justify-content-end">
                <UserIcon />
                <ShoppingBag />
              </div>
            </div>
          </div>
        </header>
        <section>
          <div
            onClick={this.onNavClick}
            className={`navbar-overlay ${
              this.state.navExtend ? '' : 'navbar-hidden'
            }`}
          />
          <div
            className={`navbar-sidebar ${
              this.state.navExtend ? 'navbar-sidebar-show' : ''
            }`}
          >
            <div className="navbar-sidebar-close mb-5">
              <button
                onClick={this.onNavClick}
                className="navbar-sidebar-button"
              >
                <div />
              </button>
            </div>
            <div className="navbar-sidebar-list">
              <ul>
                <Link to="/maleperfume">
                  <li onClick={this.onNavClick} className="py-3 my-5">
                    男士
                  </li>
                </Link>
                <Link to="/femaleperfume">
                  <li onClick={this.onNavClick} className="py-3 my-5">
                    女士
                  </li>
                </Link>
                <Link to="/allperfume">
                  <li onClick={this.onNavClick} className="py-3 my-5">
                    全部商品
                  </li>
                </Link>
              </ul>
            </div>
          </div>
        </section>
      </Fragment>
    );
  }
}

Navbar.propTypes = {
  getSerachResult: PropTypes.func.isRequired,
  history: PropTypes.object.isRequired
};

export default connect(
  null,
  { getSerachResult }
)(withRouter(Navbar));
