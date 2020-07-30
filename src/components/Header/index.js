/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { memo, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { compose, bindActionCreators } from 'redux';
import Utils from '../../utils/common';
import * as Actions from '../../containers/App/action';
import Navigation from '../../utils/navigation';
import Search from '../search';
import Notification from './components/notification';
import MessageComp from './components/message';
import Loader from '../Loader';
import './header.css';

function Header({
  userData, logout, addProductAction, notification, getNotification, message, getMessage, inProcess, verfyEmail, updateSearch, cartData, getCartData
}) {
  const [userProfileImg, setUserProfileImage] = useState('assets/images/avatars/avatar-1.jpg');
  const [cartCount, setCartCount] = useState(0);
  useEffect(() => {
    if (!Utils.isUndefinedOrNullOrEmptyObject(userData)) {
      const { userDetail } = userData;
      if (!Utils.isUndefinedOrNullOrEmptyObject(userDetail) && !Utils.isUndefinedOrNullOrEmpty(userDetail.coverImage)) {
        setUserProfileImage(userDetail.featuredImage);
      }
    }
  }, [userData]);

  useEffect(() => {
    if (Utils.isUndefinedOrNullOrEmptyObject(cartData)) {
      getCartData();
    }
    if (!Utils.isUndefinedOrNullOrEmptyObject(cartData)) {
      setCartCount(cartData.productDetail.length);
    }
  }, [cartData]);

  const { userDetail } = userData;
  const nightMode = () => {
    const isNightMode = localStorage.getItem('gmtNightMode');
    document.documentElement.classList.toggle('night-mode');
    if (isNightMode) {
      localStorage.removeItem('gmtNightMode');
      return;
    }
    localStorage.setItem('gmtNightMode', true);
  };

  const withoutLoginContent = () => {
    const path = window.location.pathname;
    const pathArray = [];
    if (!Utils.isUndefinedOrNullOrEmpty(path)) {
      pathArray.push(...path.split('/'));
    }

    const activeMenuValue = pathArray[pathArray.length - 1];
    return (
      <div className="head_user">
        <Link to={Navigation.home}>
          <span className={classnames('custom-link', { activeMenu: activeMenuValue === '' || activeMenuValue === 'undefined' })}>  Home </span>
        </Link>
        <Link to={Navigation.explore}>
          <span className={classnames('custom-link', { activeMenu: activeMenuValue === 'explore' })}> Explore </span>
        </Link>
        <Link to={Navigation.store}>
          <span className={classnames('custom-link', { activeMenu: activeMenuValue === 'store' })}> Store </span>
        </Link>
        <Link to={Navigation.login}>
          <span className={classnames('custom-link', { activeMenu: activeMenuValue === 'login' })}> Login </span>
        </Link>
      </div>
    );
  };

  const userProfile = () => (
    <div uk-dropdown="pos: top-right;mode:click ; animation: uk-animation-slide-bottom-small" className="dropdown-notifications small">
      <span>
        <div className="dropdown-user-details">
          <div className="dropdown-user-avatar">
            {(!Utils.isUndefinedOrNullOrEmptyObject(userDetail) && !Utils.isUndefinedOrNullOrEmpty(userDetail.coverImage)) ? <img src={userProfileImg} alt="" /> : <img src="assets/images/avatars/avatar-1.jpg" alt="" />}
          </div>
          <div className="dropdown-user-name">
            {!Utils.isUndefinedOrNullOrEmptyObject(userDetail) && userDetail.displayName}
            {userDetail.isVerified && (
            <span className="verified">
              Verified
              {' '}
              <i className="uil-check" />
              {' '}
            </span>
            )}
            {!userDetail.isVerified && <span onClick={verfyEmail} className="verify" role="button" tabIndex={0}>Verify</span>}
          </div>
        </div>
      </span>

      <ul className="dropdown-user-menu">
        <li>
          <Link to={`/browser-channel/${userDetail._id}`}>
            <i className="uil-user" />
            My Channel
          </Link>
        </li>
        <li>
          <Link to="/token">
            <i className="uil-wallet" />
            My Wallet
          </Link>
        </li>
        <li>
          <Link to="/cart">
            <i className="icon-material-outline-add-shopping-cart" />
            My Cart
            <div className="my-cart-hadder-total">{cartCount}</div>
          </Link>
        </li>
        {/* <li>
          <Link to="/cards">
            <i className="icon-material-outline-credit-card" />
            My Cards
          </Link>
        </li> */}

        <li>
          <Link to="/message">
            <i className="icon-material-baseline-mail-outline" />
            Messages
          </Link>
        </li>
        <li>

          <span id="night-mode" className="btn-night-mode profileMenu">
            <i className="icon-feather-moon" />
            {' '}
            Night mode
            <span className="btn-night-mode-switch" role="button" tabIndex={0} onClick={nightMode}>
              <span className="uk-switch-button" />
            </span>
          </span>
        </li>
        <li>
          <span className="profileMenu" role="button" onClick={logout} tabIndex={-1}>
            <i className="icon-feather-log-out" />
            {' '}
            Sign-out
          </span>
        </li>
      </ul>
    </div>
  );


  const withLoginContent = () => {
    const path = window.location.pathname;
    const pathArray = [];
    if (!Utils.isUndefinedOrNullOrEmpty(path)) {
      pathArray.push(...path.split('/'));
    }

    const activeMenuValue = pathArray[pathArray.length - 1];
    return (
      <div className="head_user">
        <Link to={Navigation.home}>
          <span className={classnames('custom-link', { activeMenu: activeMenuValue === '' || activeMenuValue === 'undefined' })}>  Home </span>
        </Link>
        <Link to={Navigation.explore}>
          <span className={classnames('custom-link', { activeMenu: activeMenuValue === 'explore' })}> Explore </span>
        </Link>
        <Link to={Navigation.store}>
          <span className={classnames('custom-link', { activeMenu: activeMenuValue === 'store' })}> Store </span>
        </Link>
        <span className="header-menu custom-link" onClick={() => { addProductAction(true); }}> Add Product </span>
        <MessageComp message={message} getMessage={getMessage} />
        <Notification notification={notification} getNotification={getNotification} />
        <span role="button" tabIndex={0} onClick={() => false} className="opts_account">
          <img src={userProfileImg} alt="" />
        </span>
        {userProfile()}
      </div>
    );
  };

  return (
    <div id="main_header">
      <div className="top-bar-box">
        <div className="with-50">
          <div className="social-icon">
            <ul>
              {/* <li>
                <a href="void(0)">
                  <i className="icon-brand-facebook" />
                </a>
              </li>
              <li>
                <a href="void(0)">
                  <i className="icon-brand-instagram" />
                </a>
              </li>
              <li>
                <a href="void(0)">
                  <i className="icon-brand-youtube" />
                </a>
              </li>
              <li>
                <a href="void(0)">
                  <i className="icon-brand-twitter" />
                </a>
              </li> */}
            </ul>
          </div>
        </div>

        {/* <div className="with-50 text-right"> */}
        <div className="text-right">
          <div className="top-bar-link">
            <ul>
              <li>
                <Link to={Navigation.live}>
                  <i className="icon-feather-wifi" />
                  Go Live
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <header>
        <i className="header-traiger uil-bars" uk-toggle="target: #wrapper ; cls: collapse-sidebar mobile-visible" />
        <div id="logo">
          <Link to="/sh/airvtingweb/">
            <span className="buttonWrapper" onClick={() => Navigation.push(Navigation.home)} role="button" tabIndex={0}>
              {' '}
              <img src="assets/images/logo.png" alt="" />
              {' '}
            </span>
          </Link>
          <span className="buttonWrapper" onClick={() => Navigation.push(Navigation.home)} role="button" tabIndex={0}>
            {' '}
            <img src="assets/images/logo-light.png" className="logo-inverse" alt="" />
          </span>
        </div>
        <Search updateSearch={updateSearch} />
        {!Utils.isUndefinedOrNullOrEmptyObject(userData) && withLoginContent()}
        {Utils.isUndefinedOrNullOrEmptyObject(userData) && withoutLoginContent()}
      </header>
      <Loader inProcess={inProcess} />
    </div>
  );
}

Header.propTypes = {
  userData: PropTypes.object.isRequired,
  logout: PropTypes.func.isRequired,
  addProductAction: PropTypes.func.isRequired,
  notification: PropTypes.object.isRequired,
  getNotification: PropTypes.func.isRequired,
  message: PropTypes.object.isRequired,
  getMessage: PropTypes.func.isRequired,
  inProcess: PropTypes.bool.isRequired,
  verfyEmail: PropTypes.func.isRequired,
  updateSearch: PropTypes.func.isRequired,
  cartData: PropTypes.object.isRequired,
  getCartData: PropTypes.func.isRequired,
};

const mapStateToProps = ({
  userDetails: {
    userData, notification, message, inProcess
  },
  carts: { cartData }
}) => ({
  userData, notification, message, inProcess, cartData
});

const mapDispatchToProps = dispatch => bindActionCreators(Actions, dispatch);

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(Header);
