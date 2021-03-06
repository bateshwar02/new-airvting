/* eslint-disable react/jsx-no-duplicate-props */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/label-has-for */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/anchor-is-valid */
/**
 *
 * DetailsVideos
 *
 */

import React, {
  memo, useEffect, useState
} from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { compose, bindActionCreators } from 'redux';
import * as Actions from './actions';
import Header from '../../components/Header/index';
import Sidebar from '../../components/Sidebar/index';
import Footer from '../../components/Footer';
import Utils from '../../utils/common';
import Navigation from '../../utils/navigation';
import Comment from './components/addComment';
import GetComment from './components/getComment';
// import LiveChat from './components/liveComment';
import Loader from '../../components/Loader';
import Mygift from './components/myGift';
import Storegift from './components/storeGift';
import './index.css';

export function DetailsVideos({
  match, getVideoDetails, videoData, inProcess, followAction, actionInProcess, fallowInProcess, userData, likeAction, getComment
}) {
  const { id } = match.params;
  const [isOpen, setOpen] = useState(false);
  const [gift, setGift] = useState('storeGift');
  const [isFollow, setFollow] = useState(false);

  useEffect(() => {
    if (Utils.isUndefinedOrNullOrEmpty(id)) {
      Navigation.push('/sh/airvtingweb/');
      return;
    }
    if (!Utils.isUndefinedOrNullOrEmpty(id) && Utils.isUndefinedOrNullOrEmptyObject(videoData)) {
      getVideoDetails(id);
    }
    if (!Utils.isUndefinedOrNullOrEmptyObject(videoData)) {
      let videoDataArr = [];
      const historyData = localStorage.getItem('historyData');
      if (!Utils.isUndefinedOrNullOrEmpty(historyData)) {
        const parseData = JSON.parse(historyData);
        let filterd = [];
        if (!Utils.isUndefinedOrNullOrEmptyList(parseData)) {
          filterd = parseData.filter(val => val._id !== videoData._id);
        }
        videoDataArr = [videoData, ...filterd];
      } else {
        videoDataArr = [videoData];
      }
      localStorage.setItem('historyData', JSON.stringify(videoDataArr));
    }
  }, [videoData]);

  const {
    _id, mediaUrl, owner, title, viewers, createdAt, totalLikes, isLike
  } = videoData;

  const date = new Date(createdAt);
  const ticks = date.getTime();

  const ownerProfile = () => {
    if (Utils.isUndefinedOrNullOrEmptyObject(owner)) {
      return null;
    }
    return (
      <div className="uk-flex uk-flex-between uk-flex-middle uk-grid">
        <div className="user-details-card uk-width-expand">
          <Link to={`/browser-channel/${owner._id}`} className="uk-flex">
            <div className="user-details-card-avatar">
              {!Utils.isUndefinedOrNullOrEmpty(owner.featuredImage) && <img src={owner.featuredImage} alt="" style={{ width: '48px', height: '48px' }} /> }
            </div>
            <div className="user-details-card-name">
              {!Utils.isUndefinedOrNullOrEmpty(owner.displayName) && owner.displayName }
              <span>
                {' '}
                {Utils.formatDate(ticks)}
                {' '}
              </span>
            </div>
          </Link>
        </div>
        <div className="uk-width-auto uk-flex">
          <div className="btn-subscribe">
            <div className="follow-follwing-channal-btn">
              <div>
                {(owner.isFollow || isFollow) && (
                <div className="toggle3">
                  <button onClick={() => { followAction(owner.userId, isFollow); setFollow(false); }} className="button default circle px-5 btn-subs channal-btn followButton " type="button">
                    Unfollow
                    {fallowInProcess && (
                    <div className="loaderWrapper">
                      <div className="customLoader" />
                    </div>
                    )}
                  </button>
                </div>
                )}

                { (!owner.isFollow || !isFollow) && (
                <div className="toggle3">
                  <button onClick={() => { followAction(owner.userId, isFollow); setFollow(true); }} className="button default circle px-5 btn-subs channal-btn followButton " type="button">
                    Follow
                    {fallowInProcess && (
                    <div className="loaderWrapper">
                      <div className="customLoader" />
                    </div>
                    )}
                  </button>
                </div>
                ) }
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const noVideoFound = () => (
    <span className="noVideoAlert"> Sorry There is no video for this post. </span>
  );

  const getComponent = () => (
    <div className="main_content">
      <div className="main_content_inner">
        <div
          className="uk-position-relative uk-visible-toggle uk-light"
          tabIndex="-1"
          uk-slideshow="animation: push ;min-height: 200; max-height: 350 ;autoplay: t rue"
        >
          <ul className="uk-slideshow-items slide-mobile-item rounded">
            <li>
              <div className="slide-box">
                <div className="live-vid-slide">
                  {!Utils.isUndefinedOrNullOrEmpty(mediaUrl) && <iframe title={title} width="100%" height="400" src={mediaUrl} frameBorder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowFullScreen /> }
                  {(Utils.isUndefinedOrNullOrEmpty(mediaUrl) && !Utils.isUndefinedOrNullOrEmptyObject(videoData)) && noVideoFound()}
                </div>
                <div className={classNames('chat-video-gift-box', { isShow: isOpen })}>
                  <ul className="uk-tab gift-tab-box" data-uk-tab="{connect:'#my-id'}">
                    <li className="uk-active">
                      <span role="button" tabIndex={0} onClick={() => setGift('storeGift')}>
                        <i className="icon-feather-gift" />
                        {' '}
                        Gift Store
                      </span>
                    </li>
                    <li>
                      <span role="button" role="button" tabIndex={0} onClick={() => setGift('myStore')}>
                        <i className="icon-feather-heart" />
                        {' '}
                        My Gift
                      </span>
                    </li>
                    {/* <li className="tootal-coin">
                      <i className="icon-brand-bitcoin" />
                      {' '}
                      3480
                    </li> */}
                  </ul>
                  <ul id="my-id" className="uk-switcher uk-margin ">
                    {gift === 'myStore' && <Mygift />}
                    {gift === 'storeGift' && <Storegift />}
                  </ul>
                </div>
                <div className="chat-vedio-icon-box">
                  <div className="w50">
                    <p>
                      <i className="icon-feather-eye" />
                      {viewers}
                      {' '}
                      views
                    </p>
                  </div>
                  <div className="w50 text-right">
                    <ul className="gift-section">
                      <span onClick={() => Navigation.push('/sh/airvtingweb/store')} role="button" tabIndex={0}>
                        <li><img src="assets/images/video-thumbal/Shopping-icon.png" alt="" /></li>
                      </span>
                      <span role="button" tabIndex={0} onClick={() => { setOpen(!isOpen); }}>
                        <li id="show"><img src="assets/images/video-thumbal/gift-icon.png" alt="" /></li>
                      </span>
                      <span onClick={() => Navigation.push('/sh/airvtingweb/token')} role="button" tabIndex={0}>
                        <li><img src="assets/images/video-thumbal/star-icon2.png" alt="" /></li>
                      </span>
                    </ul>
                  </div>
                </div>
                {/* {isLive && <LiveChat />} */}
              </div>
            </li>
          </ul>
        </div>
        <div className="uk-width-2-3@m">
          <div className="video-info mt-3">
            <div className="video-info-title">
              <h1>
                {' '}
                {title}
              </h1>
            </div>
            <div className="uk-flex uk-flex-between">
              {/* <div className="video-info-details">
                <span>60,723,169 views </span>
              </div> */}
              <div className="video-likes">
                <div className="like-btn" uk-tooltip={`I ${isLike ? 'unlike' : 'like'} it`} onClick={() => { likeAction(_id, isLike); }}>
                  {isLike ? <i className="uil-thumbs-down" /> : <i className="uil-thumbs-up" /> }
                  <span className="likes">{totalLikes}</span>
                </div>
                <div className="video-info-element">
                  <div className="views-bar" />
                  <div className="views-bar blue" style={{ width: '0%' }} />
                </div>
              </div>
            </div>
            {ownerProfile()}
            <hr className="mt-0 mb-2" />
            <h2> Description</h2>
            <p>
              {' '}
              {!Utils.isUndefinedOrNullOrEmptyObject(owner) && owner.description}
            </p>

            <div className="about-ch-sec mb-lg-6">
              <div className="abt-rw">
                <h4>Category : </h4>
                <ul>
                  <li><span>Education</span></li>
                </ul>
              </div>
              <div className="abt-rw tgs">
                <h4>Tags : </h4>
                {/* <ul>
                  <li><a href="/" title="">#Education</a></li>
                  <li><a href="/" title="">#Programming </a></li>
                  <li><a href="/" title="">#Design</a></li>
                  <li><a href="/" title="">#Courses</a></li>
                </ul> */}
              </div>
            </div>
          </div>
          <hr />
          {!Utils.isUndefinedOrNullOrEmpty(_id) && <GetComment /> }
          {!Utils.isUndefinedOrNullOrEmpty(_id) && <Comment actionInProcess={actionInProcess} id={_id} getComment={getComment} userData={userData} /> }
        </div>
      </div>
      <Footer />
    </div>
  );

  return (
    <div>
      <Helmet>
        <title>DetailsVideos</title>
        <meta name="description" content="Description of DetailsVideos" />
      </Helmet>
      <Header />
      <Sidebar />
      {getComponent()}
      {inProcess && <Loader inProcess={inProcess} />}
    </div>
  );
}

DetailsVideos.propTypes = {
  match: PropTypes.object.isRequired,
  getVideoDetails: PropTypes.func.isRequired,
  videoData: PropTypes.object.isRequired,
  inProcess: PropTypes.bool.isRequired,
  followAction: PropTypes.func.isRequired,
  actionInProcess: PropTypes.bool.isRequired,
  fallowInProcess: PropTypes.bool.isRequired,
  userData: PropTypes.object.isRequired,
  likeAction: PropTypes.func.isRequired,
  getComment: PropTypes.func.isRequired,
};


const mapStateToProps = ({
  detailsVideos: {
    videoData, inProcess, commentData, actionInProcess, fallowInProcess
  }, userDetails: { userData }
}) => ({
  videoData, inProcess, commentData, actionInProcess, fallowInProcess, userData
});

const mapDispatchToProps = dispatch => bindActionCreators(Actions, dispatch);

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(DetailsVideos);
