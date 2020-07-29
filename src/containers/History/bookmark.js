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

export function Bookmark({
  bookmarkData, getbookmarkData, inProcess
}) {
  useEffect(() => {
    if (Utils.isUndefinedOrNullOrEmptyObject(bookmarkData)) {
      getbookmarkData();
    }
  }, [bookmarkData]);

  const videoPlay = (item) => {
    Navigation.push(`/sh/airvtingweb/video/${item._id}`);
  };

  const getVideoWrapper = () => {
    if (Utils.isUndefinedOrNullOrEmptyObject(bookmarkData)) {
      return null;
    }
    const { postDetail } = bookmarkData;
    return postDetail.map((item, index) => {
      const keys = `key-${index}`;
      const date = new Date(item.createdAt);
      const ticks = date.getTime();
      return (
        <div className="video-post video-post-list" key={keys}>
          <div className="video-post-thumbnail">
            <span className="play-btn-trigger" role="button" tabIndex={0} onClick={() => videoPlay(item)} />
            <span className="video-post-time">{Utils.formatDateAndTime(ticks, 'h:MM TT')}</span>
            <img src={item.featuredImage} alt="" />
          </div>
          <div className="video-post-content">
            <h3>
              {item.title}
              {' '}
            </h3>
            <span className="video-post-user">{item.owner.displayName}</span>
            <span className="video-post-views">
              {!Utils.isUndefinedOrNullOrEmpty(item.viewers) && item.viewers !== 0 && `${item.viewers} views`}
            </span>
            <span className="video-post-date">
              {' '}
              {Utils.formatDate(ticks)}
              {' '}
            </span>
            <p>
              {' '}
              {item.description}
            </p>
          </div>
        </div>
      );
    });
  };

  const getComponent = () => (
    <div className="main_content">
      <div className="main_content_inner">
        <h2 className="mt-lg-2 mb-sm-0"> Bookmark </h2>
        <div className="section-small">
          <div className="uk-grid">
            <div className="videoWrapper">{getVideoWrapper()}</div>
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

Bookmark.propTypes = {
  bookmarkData: PropTypes.object.isRequired,
  getbookmarkData: PropTypes.func.isRequired,
  inProcess: PropTypes.bool.isRequired,
};

const mapStateToProps = ({ history: { bookmarkData, inProcess } }) => ({ bookmarkData, inProcess });

const mapDispatchToProps = dispatch => bindActionCreators(Actions, dispatch);

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(Bookmark);
