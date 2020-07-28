/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { memo, useEffect } from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import { compose, bindActionCreators } from 'redux';
import Utils from '../../../utils/common';
import * as Actions from '../action';
// import Navigation from '../../../utils/navigation';

function CurrentPost({ currentPost, getCurrentPost }) {
  useEffect(() => {
    if (Utils.isUndefinedOrNullOrEmptyObject(currentPost)) {
      getCurrentPost();
    }
  }, [currentPost]);

  // const videoPlay = (item) => {
  //   Navigation.push(`/sh/airvtingweb/video/${item._id}`);
  // };


  const getDataWrapper = () => {
    const { postDetail } = currentPost;
    if (Utils.isUndefinedOrNullOrEmptyList(postDetail)) {
      return null;
    }

    return postDetail.map((item, index) => {
      const keys = `${index}-${item._id}`;
      return (
        <li key={`current-post${keys}`}>
          <div className="slide-box">
            <div className="live-vid-slide">
              <video className="currentVideo" poster={item.featuredImage} controls>
                <source src={item.mediaUrl} type="video/mp4" />
                <track src="captions_en.vtt" kind="captions" srcLang="en" label="english_captions" />
              </video>
            </div>
          </div>
        </li>

      // <li key={keys}>
      //   <div className="video-post">
      //     <div className="video-post-thumbnail">
      //       <span className="play-btn-trigger" role="button" tabIndex={0} onClick={() => videoPlay(item)} />
      //       <span className="btn-option">
      //         <i className="icon-feather-more-vertical" />
      //       </span>
      //       <span className="videoImageWrapper">
      //         <img src={item.featuredImage} alt="" />
      //       </span>
      //     </div>
      //   </div>
      // </li>
      );
    });
  };

  return (
    <>
      {getDataWrapper()}
    </>
  );
}

CurrentPost.propTypes = {
  currentPost: PropTypes.object.isRequired,
  getCurrentPost: PropTypes.func.isRequired,
};

const mapStateToProps = ({ home: { currentPost } }) => ({ currentPost });

const mapDispatchToProps = dispatch => bindActionCreators(Actions, dispatch);

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(CurrentPost);
