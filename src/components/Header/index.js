/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { memo, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { compose, bindActionCreators } from 'redux';
import Utils from '../../utils/common';
import * as Actions from '../../containers/App/action';
import Navigation from '../../utils/navigation';
import Search from '../search';
import './header.css';

function Header({ userData, logout, addProductAction }) {
  let userProfileImg = 'assets/images/avatars/avatar-1.jpg';
  useEffect(() => {
    if (!Utils.isUndefinedOrNullOrEmptyObject(userData)) {
      const { userDetail } = userData;
      if (!Utils.isUndefinedOrNullOrEmptyObject(userDetail) && !Utils.isUndefinedOrNullOrEmpty(userDetail.coverImage)) {
        userProfileImg = userDetail.featuredImage;
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
      <Link to={Navigation.home}>
        <span className="custom-link">  Home </span>
      </Link>
      <Link to={Navigation.explore}>
        <span className="custom-link"> Explore </span>
      </Link>

      <Link to={Navigation.store}>
        <span className="custom-link"> Store </span>
      </Link>

      <Link to={Navigation.login}>
        <span className="custom-link"> Login </span>
      </Link>

    </div>
  );

  const userProfile = () => (
    <div uk-dropdown="pos: top-right;mode:click ; animation: uk-animation-slide-bottom-small" className="dropdown-notifications small">
      <span>
        <div className="dropdown-user-details">
          <div className="dropdown-user-avatar">
            {(!Utils.isUndefinedOrNullOrEmptyObject(userDetail) && !Utils.isUndefinedOrNullOrEmpty(userDetail.coverImage)) ? <img src={userDetail.coverImage} alt="" /> : <img src="assets/images/avatars/avatar-1.jpg" alt="" />}
          </div>
          <div className="dropdown-user-name">
            {!Utils.isUndefinedOrNullOrEmptyObject(userDetail) && userDetail.displayName}
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
          <Link to="/cart">
            <i className="icon-material-outline-add-shopping-cart" />
            My Cart
            <div className="my-cart-hadder-total">10</div>
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

      {/* <Link to={Navigation.store}>
        <span className="custom-link"> Store </span>
      </Link> */}

      <span className="header-menu" onClick={() => { addProductAction(true); }}> Add Product </span>
      <span role="button" tabIndex={0} onClick={() => false} className="opts_icon">
        <i className="uil-envelope-alt" />
        {' '}
        <span>4</span>
      </span>

      <div uk-dropdown="pos: top-right;mode:click ; animation: uk-animation-slide-bottom-small" className="dropdown-notifications">
        <div className="dropdown-notifications-headline">
          <h4>Messages</h4>
          <span>
            <i className="icon-feather-settings" uk-tooltip="title: Message settings ; pos: left" />
          </span>
        </div>
        <div className="dropdown-notifications-content data-simplebar">
          <ul>
            <li>
              <span className="notificationWrapper">
                <span className="notification-avatar">
                  <img src="assets/images/avatars/avatar-2.jpg" alt="" />
                </span>
                <div className="notification-text notification-msg-text">
                  <strong>Jonathan Madano</strong>
                  <p>Okay.. Thanks for The Answer I will be waiting for your...</p>
                  <span className="time-ago"> 2 hours ago </span>
                </div>
              </span>
            </li>
            <li>
              <span className="notificationWrapper">
                <span className="notification-avatar">
                  <img src="assets/images/avatars/avatar-3.jpg" alt="" />
                </span>
                <div className="notification-text notification-msg-text">
                  <strong>Stella Johnson</strong>
                  <p> Alex will explain you how to keep your videos privatly and all that...</p>
                  <span className="time-ago"> 7 hours ago </span>
                </div>
              </span>
            </li>
            <li>
              <span className="notificationWrapper">
                <span className="notification-avatar">
                  <img src="assets/images/avatars/avatar-1.jpg" alt="" />
                </span>
                <div className="notification-text notification-msg-text">
                  <strong>Alex Dolgove</strong>
                  <p> Alia just joined Messenger! Be the first to send a welcome message..</p>
                  <span className="time-ago"> 19 hours ago </span>
                </div>
              </span>
            </li>
            <li>
              <span className="notificationWrapper">
                <span className="notification-avatar">
                  <img src="assets/images/avatars/avatar-4.jpg" alt=" " />
                </span>
                <div className="notification-text notification-msg-text">
                  <strong>Adrian Mohani</strong>
                  <p> Okay.. Thanks for The Answer I will be waiting for your... </p>
                  <span className="time-ago"> Yesterday </span>
                </div>
              </span>
            </li>
          </ul>
        </div>
        <div className="dropdown-notifications-footer">
          <span>
            {' '}
            sell all
            {' '}
            <i className="icon-line-awesome-long-arrow-right" />
            {' '}
          </span>
        </div>
      </div>

      <span role="button" tabIndex={0} onClick={() => false} className="opts_icon">
        <i className="uil-bell" />
        {' '}
        <span>3</span>
      </span>
      <div uk-dropdown="pos: top-right;mode:click ; animation: uk-animation-slide-bottom-small" className="dropdown-notifications">
        <div className="dropdown-notifications-headline">
          <h4>Notifications </h4>
          <span>
            <i className="icon-feather-settings" uk-tooltip="title: Notifications settings ; pos: left" />
          </span>
        </div>
        <div className="dropdown-notifications-content" data-simplebar>
          <ul>
            <li className="notifications-not-read">
              <span className="notificationWrapper">
                <span className="notification-icon">
                  <i className="icon-feather-thumbs-up" />
                </span>
                <span className="notification-text">
                  <strong>Adrian Mohani</strong>
                  {' '}
                  Like Your Comment On Video
                  <span className="text-primary">Learn Prototype Faster</span>
                  <br />
                  {' '}
                  <span className="time-ago"> 9 hours ago </span>
                </span>
              </span>
            </li>
            <li>
              <span className="notificationWrapper">
                <span className="notification-icon">
                  <i className="icon-feather-star" />
                </span>
                <span className="notification-text">
                  <strong>Alex Dolgove</strong>
                  {' '}
                  Added New Review In Video
                  <span className="text-primary">Full Stack PHP Developer</span>
                  <br />
                  {' '}
                  <span className="time-ago"> 19 hours ago </span>
                </span>
              </span>
            </li>
            <li>
              <span className="notificationWrapper">
                <span className="notification-icon">
                  <i className="icon-feather-message-circle" />
                </span>
                <span className="notification-text">
                  <strong>Stella Johnson</strong>
                  {' '}
                  Replay Your Comments in
                  <span className="text-primary">Adobe XD Tutorial</span>
                  <br />
                  {' '}
                  <span className="time-ago"> 12 hours ago </span>
                </span>
              </span>
            </li>
            <li>
              <span className="notificationWrapper">
                <span className="notification-icon">
                  <i className="icon-feather-share-2" />
                </span>
                <span className="notification-text">
                  <strong>Adrian Mohani</strong>
                  {' '}
                  Like Your Comment On Video
                  <span className="text-primary">Learn Prototype Faster</span>
                  <br />
                  {' '}
                  <span className="time-ago"> Yesterday </span>
                </span>
              </span>
            </li>
          </ul>
        </div>
      </div>

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
              <li>
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
              </li>
            </ul>
          </div>
        </div>

        <div className="with-50 text-right">
          <div className="top-bar-link">
            <ul>
              <li>
                <a href={Navigation.goLive}>
                  <i className="icon-feather-wifi" />
                  Go Live
                </a>
              </li>
            </ul>
            <ul aria-expanded="false">
              <li>
                <a href="void(0)" className="btn-upload uk-visible@s" aria-expanded="true">
                  {' '}
                  <i className="uil-cloud-upload" />
                  Upload
                </a>
              </li>
            </ul>
            <div
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
            </div>
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
        <Search />
        {!Utils.isUndefinedOrNullOrEmptyObject(userData) && withLoginContent()}
        {Utils.isUndefinedOrNullOrEmptyObject(userData) && withoutLoginContent()}
      </header>
    </div>
  );
}

Header.propTypes = {
  userData: PropTypes.object.isRequired,
  logout: PropTypes.func.isRequired,
  addProductAction: PropTypes.func.isRequired,
};

const mapStateToProps = ({ userDetails: { userData } }) => ({ userData });

const mapDispatchToProps = dispatch => bindActionCreators(Actions, dispatch);

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(Header);
