/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/label-has-for */
/**
 *
 * History
 *
 */

import React, { memo, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { compose, bindActionCreators } from 'redux';


import Utils from '../../utils/common';
import * as Actions from './actions';
import Header from '../../components/Header';
import Sidebar from '../../components/Sidebar';
import Footer from '../../components/Footer';
import Loader from '../../components/Loader';
import Navigation from '../../utils/navigation';
import './index.css';

export function History({
  historyData, getHistoryData, inProcess
}) {
  useEffect(() => {
    if (Utils.isUndefinedOrNullOrEmptyObject(historyData)) {
      getHistoryData();
    }
  }, [getHistoryData, historyData]);

  const videoPlay = (item) => {
    Navigation.push(`/sh/airvtingweb/video/${item._id}`);
  };

  const getVideoWrapper = () => {
    if (Utils.isUndefinedOrNullOrEmptyObject(historyData)) {
      return null;
    }
    const { postDetail } = historyData;
    return postDetail.map((item, index) => {
      const keys = `key-${index}`;
      const date = new Date(item.createdAt);
      const ticks = date.getTime();
      return (
        <div className="video-post video-post-list" key={keys}>
          <div className="video-post-thumbnail">
            <span className="play-btn-trigger" role="button" tabIndex={-1} onClick={() => videoPlay(item)} />
            <span className="video-post-time">{Utils.formatDateAndTime(ticks, 'h:MM TT')}</span>
            <img src={item.featuredImage} alt="" />
          </div>
          <div className="video-post-content">
            <button
              className="p-3 circle bg-secondary uk-align-right ml-2 uk-close"
              uk-tooltip="title: Clear Video ; pos: left"
              type="button"
            />
            <h3>{item.title}</h3>
            <span className="video-post-user">{item.owner.displayName}</span>
            <span className="video-post-date">
              {' '}
              {Utils.formatDate(ticks)}
              {' '}
            </span>
            <p>
              {' '}
              {item.owner.description}
            </p>
          </div>
        </div>
      );
    });
  };

  const getComponent = () => (
    <div className="main_content">
      <div className="main_content_inner">
        <h2 className="mt-lg-2 mb-sm-0"> Watched history </h2>
        <div className="section-small">
          <div className="uk-grid">
            <div className="uk-width-1-4@m uk-flex-last@m">
              <nav
                className="responsive-tab style-3 setting-menu uk-sticky"
                uk-sticky="top:30 ; offset:100; media:@m ;bottom:true; animation: uk-animation-slide-top"
              >
                <h4 className="mb-0 p-3 uk-visible@m"> History type</h4>
                <hr className="m-0" />
                <ul className="uk-form-controls">
                  <li>
                    <span className="radioButtonWrapper">
                      <label>
                        <input className="uk-radio" type="radio" name="radio1" />
                        <span className="checkmark ml-2"> Watch History </span>
                      </label>
                    </span>
                  </li>
                  <li>
                    <span className="radioButtonWrapper">
                      <label>
                        <input className="uk-radio" type="radio" name="radio1" />
                        <span className="checkmark ml-2"> Search History </span>
                      </label>
                    </span>
                  </li>
                  <li>
                    <span className="radioButtonWrapper">
                      <label>
                        <input className="uk-radio" type="radio" name="radio1" />
                        <span className="checkmark ml-2"> Comments </span>
                      </label>
                    </span>
                  </li>
                  <li>
                    <span className="radioButtonWrapper">
                      <label>
                        <input className="uk-radio" type="radio" name="radio1" />
                        <span className="checkmark ml-2"> Community </span>
                      </label>
                    </span>
                  </li>
                  <li>
                    <span className="radioButtonWrapper">
                      <label>
                        <input className="uk-radio" type="radio" name="radio1" />
                        <span className="checkmark ml-2"> Browse all History </span>
                      </label>
                    </span>
                  </li>
                </ul>
              </nav>
            </div>
            <div className="uk-width-3-4@m">{getVideoWrapper()}</div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );

  return (
    <div>
      <Helmet>
        <title>History</title>
        <meta name="description" content="Description of History" />
      </Helmet>
      <Sidebar />
      <Header />
      {getComponent()}
      <Loader inProcess={inProcess} />
    </div>
  );
}

History.propTypes = {
  historyData: PropTypes.object.isRequired,
  getHistoryData: PropTypes.func.isRequired,
  inProcess: PropTypes.bool.isRequired,
};

const mapStateToProps = ({ history: { historyData, inProcess } }) => ({ historyData, inProcess });

const mapDispatchToProps = dispatch => bindActionCreators(Actions, dispatch);

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(History);
