/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/label-has-for */
/**
 *
 * Live
 *
 */

import React, { memo } from 'react';
// import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { compose, bindActionCreators } from 'redux';


import * as Actions from './actions';
import Header from '../../components/Header';
import Sidebar from '../../components/Sidebar';
import Footer from '../../components/Footer';
import General from './components/general';
// import Billing from './components/billing';
import Password from './components/password';
import Earning from './components/earning';
import DeleteAccount from './components/delete-account';
import './index.css';

function Setting() {
  const getContent = () => (
    <div className="main_content">
      <div className="bg-gradient-warning uk-height-small uk-position-absolute uk-width-1-1" />
      <div className="main_content_inner">
        <div className="section-small text-center uk-light">
          <h1> account Setting </h1>
        </div>
        <div className="m-auto uk-position-relative  uk-grid">
          <div className="uk-width-1-4@m uk-flex-last@ pl-sm-0">
            <nav
              className="responsive-tab style-3 setting-menu"
              uk-sticky="top:30 ; offset:100; media:@m ;bottom:true; animation: uk-animation-slide-top"
            >
              <h4 className="mb-0 p-3 uk-visible@m"> Setting Navigation </h4>
              <hr className="m-0 uk-visible@m" />
              <ul className="uk-tab-left" uk-tab="connect: #component-tab-left; animation: uk-animation-fade">
                <li className="uk-active">
                  <span className="menuSpan">
                    {' '}
                    <i className="uil-cog" />
                    {' '}
                    General
                    {' '}
                  </span>
                </li>
                <li>
                  <span className="menuSpan">
                    {' '}
                    <i className="uil-unlock-alt" />
                    {' '}
                    Password
                    {' '}
                  </span>
                </li>
                <li>
                  <span className="menuSpan">
                    {' '}
                    <i className="uil-dollar-alt" />
                    {' '}
                    Earning
                  </span>
                </li>
                <li>
                  <span className="menuSpan">
                    {' '}
                    <i className="uil-trash-alt" />
                    {' '}
                    Delete account
                  </span>
                </li>
              </ul>
            </nav>
          </div>

          <div className="uk-width-3-4@m mt-sm-3 pl-sm-0">
            <div className="uk-width-expand@m">
              <ul id="component-tab-left" className="uk-switcher">
                <li>
                  <div className="uk-card-default rounded">
                    <General />
                  </div>
                  {/* <div className="uk-card-default rounded mt-4">
                    <Billing />
                  </div> */}
                </li>

                <li>
                  <div className="uk-card-default rounded">
                    <Password />
                  </div>
                </li>
                <li>
                  <div className="uk-card-default rounded">
                    <Earning />
                  </div>
                </li>
                <li>
                  <div className="uk-card-default rounded">
                    <DeleteAccount />
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );

  return (
    <>
      <Helmet>
        <title>Settings</title>
        <meta name="description" content="Description of Followers" />
      </Helmet>
      <Header />
      <Sidebar />
      {getContent()}
    </>
  );
}

Setting.propTypes = {};


const mapStateToProps = ({ live }) => ({ live });
const mapDispatchToProps = dispatch => bindActionCreators(Actions, dispatch);

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(Setting);
