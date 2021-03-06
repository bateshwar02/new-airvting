/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/label-has-for */
/**
 *
 * History
 *
 */

import React, { memo } from 'react';
import { Helmet } from 'react-helmet';

import Utils from '../../utils/common';
import Header from '../../components/Header';
import Sidebar from '../../components/Sidebar';
import Footer from '../../components/Footer';
import Navigation from '../../utils/navigation';
import './index.css';

export function History() {
  const videoPlay = (item) => {
    Navigation.push(`/sh/airvtingweb/video/${item._id}`);
  };

  const getVideoWrapper = () => {
    let parseData = [];
    const historyData1 = localStorage.getItem('historyData');
    if (!Utils.isUndefinedOrNullOrEmpty(historyData1)) {
      parseData = JSON.parse(historyData1);
    }

    if (Utils.isUndefinedOrNullOrEmptyList(parseData)) {
      return null;
    }

    return parseData.map((item, index) => {
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
        <h2 className="mt-lg-2 mb-sm-0"> Watched history </h2>
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
    </div>
  );
}

export default memo(History);
