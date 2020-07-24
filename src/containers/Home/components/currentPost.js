import React, { memo, useEffect } from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import { compose, bindActionCreators } from 'redux';
import Utils from '../../../utils/common';
import * as Actions from '../action';

function CurrentPost({ currentPost, getCurrentPost }) {
  useEffect(() => {
    if (Utils.isUndefinedOrNullOrEmptyObject(currentPost)) {
      getCurrentPost();
    }
  }, [currentPost]);

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
