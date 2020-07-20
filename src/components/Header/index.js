/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { memo, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Link, NavLink } from 'react-router-dom';
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
  userData, logout, addProductAction, notification, getNotification, message, getMessage, inProcess, verfyEmail, updateSearch
}) {
  const [userProfileImg, setUserProfileImage] = useState('assets/images/avatars/avatar-1.jpg');
  useEffect(() => {
    if (!Utils.isUndefinedOrNullOrEmptyObject(userData)) {
      const { userDetail } = userData;
      if (!Utils.isUndefinedOrNullOrEmptyObject(userDetail) && !Utils.isUndefinedOrNullOrEmpty(userDetail.coverImage)) {
        setUserProfileImage(userDetail.featuredImage);
      }
    }
  }, [userData]);
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

  const withoutLoginContent = () => (
    <div className="head_user">
      <NavLink
        to={Navigation.home}
        activeStyle={{
          fontWeight: 'bold',
          color: 'red'
        }}
      >
        <span className="custom-link">  Home </span>
      </NavLink>
      <NavLink
        to={Navigation.explore}
        activeStyle={{
          fontWeight: 'bold',
          color: 'red'
        }}
      >
        <span className="custom-link"> Explore </span>
      </NavLink>
      <NavLink
        to={Navigation.store}
        activeStyle={{
          fontWeight: 'bold',
          color: 'red'
        }}
      >
        <span className="custom-link"> Store </span>
      </NavLink>
      <NavLink
        to={Navigation.login}
        activeStyle={{
          fontWeight: 'bold',
          color: 'red'
        }}
      >
        <span className="custom-link"> Login </span>
      </NavLink>
    </div>
  );

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
            <img src="assets/images/wallet.png" className="walletIcon" alt="" />
            My Wallet
          </Link>
        </li>
        <li>
          <Link to="/cart">
            <i className="icon-material-outline-add-shopping-cart" />
            My Cart
            {/* <div className="my-cart-hadder-total">10</div> */}
          </Link>
        </li>
        <li>
          <Link to="/cards">
            <i className="icon-material-outline-credit-card" />
            My Cards
          </Link>
        </li>

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


  const withLoginContent = () => (
    <div className="head_user">
      <Link to={Navigation.home}>
        <span className="custom-link">  Home </span>
      </Link>
      <Link to={Navigation.explore}>
        <span className="custom-link"> Explore </span>
      </Link>
      <NavLink
        to={Navigation.store}
        activeStyle={{
          fontWeight: 'bold',
          color: 'red'
        }}
      >
        <span className="custom-link"> Store </span>
      </NavLink>

      <span className="header-menu custom-link" onClick={() => { addProductAction(true); }}> Add Product </span>
      <MessageComp message={message} getMessage={getMessage} />
      <Notification notification={notification} getNotification={getNotification} />
      <span role="button" tabIndex={0} onClick={() => false} className="opts_account">
        <img src={userProfileImg} alt="" />
      </span>
      {userProfile()}
    </div>
  );

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
            {/* <ul aria-expanded="false">
              <li>
                <a href="void(0)" className="btn-upload uk-visible@s" aria-expanded="true">
                  {' '}
                  <i className="uil-cloud-upload" />
                  Upload
                </a>
              </li>
            </ul> */}

            {/* <div
              uk-dropdown="pos: top-right;mode:click ; animation: uk-animation-slide-bottom-small"
              className="dropdown-notifications uk-dropdown uk-dropdown-top-right"
              style={{ left: '718px', top: '-383px' }}
            >
              <div className="dropdown-notifications-headline">
                <h4 className="text-left">Upload Video/Photo</h4>
              </div>
              <div className="dropdown-notifications-content uk-flex uk-flex-middle uk-flex-center text-center">
                <div className="uk-flex uk-flex-column choose-upload  text-center">
                  <img src="assets/images/upload.png" width="70" className="m-auto" alt="" />
                  <p className="my-3">
                    {' '}
                    Do you have a video wants to share us
                    {' '}
                    <br />
                    {' '}
                    please upload her ..
                  </p>
                  <div uk-form-custom="" className="uk-form-custom">
                    <input type="file" />
                    <a href="void(0)" className="button soft-warning small">
                      {' '}
                      Choose file
                    </a>
                  </div>

                  <a
                    href="void(0)"
                    className="uk-text-muted mt-3 uk-link"
                    uk-toggle="target: .choose-upload ;  animation: uk-animation-slide-right-small, uk-animation-slide-left-medium; queued: true"
                  >
                    Or Import Video
                    {' '}
                  </a>
                </div>

                <div className="uk-flex uk-flex-column choose-upload" hidden="">
                  <i className="uil-import icon-large text-muted" />
                  <p className="my-3">
                    {' '}
                    Import videos from YouTube
                    {' '}
                    <br />
                    {' '}
                    Copy / Paste your video link here
                    {' '}
                  </p>
                  <form className="uk-grid-small uk-grid">
                    <div className="uk-width-expand">
                      <input type="text" className="uk-input uk-form-small" placeholder="Paste link" />
                    </div>
                    <div className="uk-width-auto">
                      <button type="submit" className="button soft-warning">
                        {' '}
                        Import
                        {' '}
                      </button>
                    </div>
                  </form>
                  <a
                    href="void(0)"
                    className="uk-text-muted mt-3 uk-link"
                    uk-toggle="target: .choose-upload ; animation: uk-animation-slide-left-small, uk-animation-slide-right-medium; queued: true"
                  >
                    Or Upload Video
                    {' '}
                  </a>
                </div>
              </div>
              <hr className="m-0" />
              <div className="text-center uk-text-small py-2 uk-text-muted"> Your Video size Must be Maxmium 999MB</div>
            </div> */}


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
};

const mapStateToProps = ({
  userDetails: {
    userData, notification, message, inProcess
  }
}) => ({
  userData, notification, message, inProcess
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
