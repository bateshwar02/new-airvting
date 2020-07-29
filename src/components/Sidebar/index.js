import cookie from 'cookies-js';
import React from 'react';
import { Link } from 'react-router-dom';
import classNames from 'classnames';
import Navigation from '../../utils/navigation';
import Followers from './components/followers';
import Utils from '../../utils/common';
import './sidebar.css';

function Sidebar() {
  const token = cookie.get('token');
  const userId = cookie.get('userId');

  const getLocationParams = () => {
    if (!window.location) {
      return '';
    }
    const location = window.location.pathname.split('/');
    return location[location.length - 1];
  };

  const getRouterValue = (params) => {
    const arr = params.split('/');
    return arr[arr.length - 1];
  };


  return (
    <div className="main_sidebar">
      <div className="side-overlay" uk-toggle="target: #wrapper ; cls: collapse-sidebar mobile-visible" />
      <div className="sidebar-header">
        <h4> Navigation</h4>
        <span className="btn-close" uk-toggle="target: #wrapper ; cls: collapse-sidebar mobile-visible" />
      </div>
      <div className="sidebar">
        <div className="sidebar_innr" data-simplebar>
          <div className="sections">
            <h3> Browse </h3>
            <ul>
              <li
                className={classNames({
                  active: getRouterValue(Navigation.live) === getLocationParams() || getLocationParams() === '',
                })}
              >
                <Link to={Navigation.live}>
                  <span>
                    <i className="icon-feather-wifi" />
                    {' '}
                    Live
                  </span>
                </Link>
              </li>
              <li
                className={classNames({
                  active: getRouterValue(Navigation.followers) === getLocationParams(),
                })}
              >
                <Link to={Navigation.followers}>
                  <i className="uil-users-alt" />
                  {' '}
                  follower
                </Link>
              </li>
              <li
                className={classNames({
                  active: getRouterValue(Navigation.following) === getLocationParams(),
                })}
              >
                <Link to={Navigation.following}>
                  <i className="uil-users-alt" />
                  {' '}
                  following
                </Link>
              </li>
              <li
                className={classNames({
                  active: getRouterValue(Navigation.likedVideos) === getLocationParams(),
                })}
              >
                <Link to={Navigation.likedVideos}>
                  <i className="uil-thumbs-up" />
                  {' '}
                  Liked Videos
                </Link>
              </li>
              <li
                className={classNames({
                  active: getRouterValue(Navigation.bookmark) === getLocationParams(),
                })}
              >
                <Link to={Navigation.bookmark}>
                  <i className="uil-bookmark" />
                  {' '}
                  Bookmark
                </Link>
              </li>
              <li
                className={classNames({
                  active: getRouterValue(Navigation.featured) === getLocationParams(),
                })}
              >
                <Link to={Navigation.featured}>
                  <i className="uil-layers" />
                  {' '}
                  Featured
                </Link>
              </li>
              <li
                className={classNames({
                  active: getRouterValue(Navigation.history) === getLocationParams(),
                })}
              >
                <Link to={Navigation.history}>
                  <i className="uil-history" />
                  {' '}
                  History
                </Link>
              </li>
            </ul>
          </div>
          {!Utils.isUndefinedOrNullOrEmpty(token) && !Utils.isUndefinedOrNullOrEmpty(userId) && <Followers /> }
          <div className="sections">
            <h3> PAGES </h3>
            <ul>
              <li
                className={classNames({
                  active: getRouterValue(Navigation.aboutUs) === getLocationParams(),
                })}
              >
                <Link to={Navigation.aboutUs}>
                  <i className="icon-material-outline-check" />
                  {' '}
                  About Us
                </Link>
              </li>
              <li
                className={classNames({
                  active: getRouterValue(Navigation.contact) === getLocationParams(),
                })}
              >
                <Link to={Navigation.contact}>
                  <i className="icon-material-outline-check" />
                  {' '}
                  Contact Us
                </Link>
              </li>
              <li
                className={classNames({
                  active: getRouterValue(Navigation.setting) === getLocationParams(),
                })}
              >
                <Link to={Navigation.setting}>
                  <i className="icon-material-outline-check" />
                  {' '}
                  Setting
                </Link>
              </li>
              <li
                className={classNames({
                  active: getRouterValue(Navigation.privacyPolice) === getLocationParams(),
                })}
              >
                <Link to={Navigation.privacyPolice}>
                  <i className="icon-material-outline-check" />
                  {' '}
                  Privacy Policy
                </Link>
              </li>
              <li
                className={classNames({
                  active: getRouterValue(Navigation.termsCondition) === getLocationParams(),
                })}
              >
                <Link to={Navigation.termsCondition}>
                  <i className="icon-material-outline-check" />
                  {' '}
                  Terms - Conditions
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
