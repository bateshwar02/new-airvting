/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { memo } from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import { compose, bindActionCreators } from 'redux';
import Utils from '../../../utils/common';
import Navigation from '../../../utils/navigation';
import * as Actions from '../action';

function PostData({
  id, addBookMark, updateShareUrl, updateShare, searchData
}) {
  const videoPlay = (item) => {
    Navigation.push(`/sh/airvtingweb/video/${item._id}`);
  };

  const shareAction = (postId) => {
    const shareUrl = `https://vridhisoftech.co.in/sh/airvtingweb/video/${postId}`;
    updateShareUrl(shareUrl);
    updateShare(true);
  };

  const categoryChildData = () => {
    const { postDetail } = searchData;
    if (Utils.isUndefinedOrNullOrEmptyList(postDetail)) {
      return null;
    }

    return postDetail.map((item, index) => {
      const keys = `keys-${index}-${id}-${item.title}`;
      const date = new Date(item.createdAt);
      const ticks = date.getTime();
      return (
        <li key={keys}>
          <div className="video-post">
            <div className="video-post-thumbnail">
              {item.isLive && <span className="video-post-count">Live </span>}
              <span className="play-btn-trigger" role="button" tabIndex={0} onClick={() => videoPlay(item)} />
              <span className="btn-option">
                <i className="icon-feather-more-vertical" />
              </span>
              <div className="dropdown-option-nav" uk-dropdown="pos: bottom-right ;mode : hover ;animation: uk-animation-slide-bottom-small">
                <ul>
                  <li>
                    <span role="button" tabIndex={0} onClick={() => addBookMark({ id: item._id })}>
                      {' '}
                      <i className="uil-bookmark" />
                      {' '}
                      Add Bookmark
                    </span>
                  </li>
                  <li>
                    <span
                      role="button"
                      tabIndex={0}
                      onClick={() => shareAction(item._id)}
                    >
                      {' '}
                      <i className="uil-share-alt" />
                      {' '}
                      Share Your Friends
                    </span>
                  </li>
                </ul>
              </div>
              <span className="videoImageWrapper">
                <img src={item.featuredImage} alt="" />
              </span>
            </div>
            <div className="video-post-content">
              <h3>
                {' '}
                {item.title}
                {' '}
              </h3>
              <img src={item.owner.featuredImage} alt="" />
              <span className="video-post-user">{item.owner.displayName}</span>
              <span className="video-post-views">
                {item.owner.viewers}
                {' '}
                views
              </span>
              <span className="video-post-date">
                {' '}
                {Utils.formatDate(ticks)}
                {' '}
              </span>
            </div>
          </div>
        </li>
      );
    });
  };

  return (
    <div className="video-grid-slider mt-4" uk-slider="finite: true">
      <ul className="uk-slider-items uk-child-width-1-4@m uk-child-width-1-3@s uk-grid postDataWrap">
        {categoryChildData()}
      </ul>
    </div>
  );
}

PostData.propTypes = {
  addBookMark: PropTypes.func.isRequired,
  id: PropTypes.string.isRequired,
  updateShareUrl: PropTypes.func.isRequired,
  updateShare: PropTypes.func.isRequired,
  searchData: PropTypes.object.isRequired,
};

const mapStateToProps = ({ home: { searchData } }) => ({ searchData });

const mapDispatchToProps = dispatch => bindActionCreators(Actions, dispatch);

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(PostData);
