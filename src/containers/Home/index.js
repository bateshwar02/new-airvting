/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable no-undef */
/* eslint-disable no-underscore-dangle */
import React, { memo } from 'react';
import { Helmet } from 'react-helmet';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose, bindActionCreators } from 'redux';
import * as Actions from './action';
import Header from '../../components/Header';
import Sidebar from '../../components/Sidebar';
import Footer from '../../components/Footer/index';
import Loader from '../../components/Loader';
import Category from './components/category';
import Share from '../../components/Share';


function HomePage({
  inProcess, updateShare, url, isShare
}) {
  const getHomeContent = () => (
    <div className="main_content">
      <div className="main_content_inner">
        <div
          className="uk-position-relative uk-visible-toggle uk-light"
          tabIndex="-1"
          uk-slideshow="animation: push ;min-height: 200; max-height: 350 ;autoplay: t rue"
        >
          <ul className="uk-slideshow-items rounded">
            <li>
              <div className="slide-box">
                <div className="live-vid-slide">
                  <iframe
                    width="100%"
                    height="400"
                    src="https://www.youtube.com/embed/3TaMrlrvmOc"
                    frameBorder="0"
                    allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    title="Youtube"
                  />
                </div>
                <div className="live-chat-slide">
                  <ul className="chat-ul-box">
                    <li className="chat-li-box">
                      <a href="browse-channals.php">
                        <span className="chat-img">
                          <img src="assets/images/avatars/avatar-2.jpg" alt="" />
                        </span>
                        <div className="chat-text-box">
                          <strong className="chat-name">Jonathan Madano</strong>
                          <p>Okay.. Thanks for The Answer I will be waiting for your...</p>
                        </div>
                      </a>
                    </li>
                    <li className="chat-li-box">
                      <a href="browse-channals.php">
                        <span className="chat-img">
                          <img src="assets/images/avatars/avatar-3.jpg" alt="" />
                        </span>
                        <div className="chat-text-box">
                          <strong className="chat-name">Stella Johnson</strong>
                          <p>Okay.. Thanks for The Answer I will be waiting for your...</p>
                        </div>
                      </a>
                    </li>
                    <li className="chat-li-box">
                      <a href="browse-channals.php">
                        <span className="chat-img">
                          <img src="assets/images/avatars/avatar-4.jpg" alt="" />
                        </span>
                        <div className="chat-text-box">
                          <strong className="chat-name">Jonathan Madano</strong>
                          <p>Okay.. Thanks for The Answer I will be waiting for your...</p>
                        </div>
                      </a>
                    </li>
                    <li className="chat-li-box">
                      <a href="void(0)">
                        <span className="chat-img">
                          <img src="assets/images/avatars/avatar-5.jpg" alt="" />
                        </span>
                        <div className="chat-text-box">
                          <strong className="chat-name">Jonathan Madano</strong>
                          <p>Okay.. Thanks for The Answer I will be waiting for your...</p>
                        </div>
                      </a>
                    </li>
                    <li className="chat-li-box">
                      <a href="browse-channals.php">
                        <span className="chat-img">
                          <img src="assets/images/avatars/avatar-1.jpg" alt="" />
                        </span>
                        <div className="chat-text-box">
                          <strong className="chat-name">Alex Dolgove</strong>
                          <p>Okay.. Thanks for The Answer I will be waiting for your...</p>
                        </div>
                      </a>
                    </li>
                  </ul>
                  <div className="chat-inp-box">
                    <div className="chat-box-con">
                      <input type="text" name="" placeholder="Comments..." />
                    </div>
                    <div className="chat-send-icon">
                      <i className="fa fa-paper-plane-o" aria-hidden="true" />
                    </div>
                  </div>
                </div>
              </div>
            </li>
            <li>
              <div className="slide-box">
                <div className="live-vid-slide">
                  <iframe
                    width="100%"
                    height="400"
                    src="https://www.youtube.com/embed/3TaMrlrvmOc"
                    frameBorder="0"
                    allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    title="Youtube"
                  />
                </div>
                <div className="live-chat-slide">
                  <ul className="chat-ul-box">
                    <li className="chat-li-box">
                      <a href="browse-channals.php">
                        <span className="chat-img">
                          <img src="assets/images/avatars/avatar-2.jpg" alt="" />
                        </span>
                        <div className="chat-text-box">
                          <strong className="chat-name">Jonathan Madano</strong>
                          <p>Okay.. Thanks for The Answer I will be waiting for your...</p>
                        </div>
                      </a>
                    </li>
                    <li className="chat-li-box">
                      <a href="browse-channals.php">
                        <span className="chat-img">
                          <img src="assets/images/avatars/avatar-3.jpg" alt=" " />
                        </span>
                        <div className="chat-text-box">
                          <strong className="chat-name">Stella Johnson</strong>
                          <p>Okay.. Thanks for The Answer I will be waiting for your...</p>
                        </div>
                      </a>
                    </li>
                    <li className="chat-li-box">
                      <a href="browse-channals.php">
                        <span className="chat-img">
                          <img src="assets/images/avatars/avatar-4.jpg" alt="" />
                        </span>
                        <div className="chat-text-box">
                          <strong className="chat-name">Jonathan Madano</strong>
                          <p>Okay.. Thanks for The Answer I will be waiting for your...</p>
                        </div>
                      </a>
                    </li>
                    <li className="chat-li-box">
                      <a href="void(0)">
                        <span className="chat-img">
                          <img src="assets/images/avatars/avatar-5.jpg" alt="" />
                        </span>
                        <div className="chat-text-box">
                          <strong className="chat-name">Jonathan Madano</strong>
                          <p>Okay.. Thanks for The Answer I will be waiting for your...</p>
                        </div>
                      </a>
                    </li>
                    <li className="chat-li-box">
                      <a href="void(0)">
                        <span className="chat-img">
                          <img src="assets/images/avatars/avatar-1.jpg" alt="" />
                        </span>
                        <div className="chat-text-box">
                          <strong className="chat-name">Alex Dolgove</strong>
                          <p>Okay.. Thanks for The Answer I will be waiting for your...</p>
                        </div>
                      </a>
                    </li>
                  </ul>
                  <div className="chat-inp-box">
                    <div className="chat-box-con">
                      <input type="text" name="" placeholder="Comments..." />
                    </div>
                    <div className="chat-send-icon">
                      <i className="fa fa-paper-plane-o" aria-hidden="true" />
                    </div>
                  </div>
                </div>
              </div>
            </li>
          </ul>
          {/* <a className="uk-position-center-left-out uk-position-small uk-hidden-hover slidenav-prev" href="void(0)" uk-slideshow-item="previous"></a>
                    <a className="uk-position-center-right-out uk-position-small uk-hidden-hover slidenav-next" href="void(0)" uk-slideshow-item="next"></a> */}
        </div>
        <Category />

        {/* <div className="section-small">
          <div uk-slider="finite: true">
            <div className="grid-slider-header">
              <div>
                <h3> Find Channals </h3>
              </div>
              <div className="grid-slider-header-link">
                <a href="browse-channals.php" className="button transparent uk-visible@m">
                  {' '}
                  View all
                  {' '}
                </a>
              </div>
            </div>
            <ul className="uk-slider-items uk-child-width-1-4@m uk-child-width-1-2@s uk-grid mb-3">
              <li>
                <a href="browse-channals.php">
                  <div className="channal-card animate-this">
                    <div className="channal-card-thumbnail" style={{ background: 'url(assets/images/channals/img-3.jpg)' }} />
                    <div className="channal-card-body">
                      <div className="channal-card-creator">
                        <img src="assets/images/avatars/avatar-5.jpg" alt="" />
                      </div>
                      <h4>Intelligent </h4>
                      <p>
                        {' '}
                        <span>20K Subscribers . 26 Videos 11M views</span>
                        {' '}
                      </p>
                    </div>
                  </div>
                </a>
              </li>
              <li>
                <a href="browse-channals.php">
                  <div className="channal-card animate-this">
                    <div className="channal-card-thumbnail" style={{ background: 'url(assets/images/channals/img-5.jpg)' }} />
                    <div className="channal-card-body">
                      <div className="channal-card-creator">
                        <img src="/assets/images/avatars/avatar-3.jpg" alt="" />
                      </div>
                      <h4> Self Development</h4>
                      <p>
                        {' '}
                        <span>55K Subscribers . 16 Videos 6M views</span>
                        {' '}
                      </p>
                    </div>
                  </div>
                </a>
              </li>
              <li>
                <a href="browse-channals.php">
                  <div className="channal-card animate-this">
                    <div className="channal-card-thumbnail" style={{ background: 'url(assets/images/channals/img-2.jpg)' }} />
                    <div className="channal-card-body">
                      <div className="channal-card-creator">
                        <img src="/assets/images/avatars/avatar-2.jpg" alt="" />
                      </div>
                      <h4>Daily workout </h4>
                      <p>
                        {' '}
                        <span>98K Subscribers . 45 Videos 6M views</span>
                        {' '}
                      </p>
                    </div>
                  </div>
                </a>
              </li>
              <li>
                <a href="browse-channals.php">
                  <div className="channal-card animate-this">
                    <div className="channal-card-thumbnail" style={{ background: 'url(assets/images/channals/img-1.jpg)' }} />
                    <div className="channal-card-body">
                      <div className="channal-card-creator">
                        <img src="/assets/images/avatars/avatar-4.jpg" alt="" />
                      </div>
                      <h4> Newfox Media </h4>
                      <p>
                        {' '}
                        <span>55K Subscribers . 36 Videos 16M views</span>
                        {' '}
                      </p>
                    </div>
                  </div>
                </a>
              </li>
              <li>
                <a href="browse-channals.php">
                  <div className="channal-card animate-this">
                    <div className="channal-card-thumbnail" style={{ background: 'url(assets/images/channals/img-4.jpg)' }} />
                    <div className="channal-card-body">
                      <div className="channal-card-creator">
                        <img src="/assets/images/avatars/avatar-4.jpg" alt="" />
                      </div>
                      <h4>Ninja Medai </h4>
                      <p>
                        {' '}
                        <span>55K Subscribers . 36 Videos 16M views</span>
                        {' '}
                      </p>
                    </div>
                  </div>
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="section-header mt-5">
          <div className="section-header-left">
            <h4> Find Channals</h4>
            <p> Channals Your Friends are in . </p>
          </div>
          <div className="section-header-right">
            <a href="browse-channals.php" className="see-all">
              {' '}
              See all
            </a>
          </div>
        </div>

        <div className="uk-child-width-1-2@m uk-grid">
          <div>
            <div className="uk-grid-small uk-grid margin-bottom">
              <div className="uk-width-auto">
                <img src="assets/images/avatars/avatar-2.jpg" className="rounded-lg" width="80" alt="" />
              </div>
              <div className="uk-width-expand">
                <h4 className="mb-2 uk-text-truncate"> Jonathan Madano</h4>
                <p className="uk-text-small">
                  <span> 13 Members - </span>
                  <span> 15 Video per week</span>
                </p>
              </div>
              <div className="uk-width-auto">
                <a href="browse-channals.php" className="button light circle">
                  {' '}
                  <i className="uil-plus mr-2" />
                  Follow
                </a>
              </div>
            </div>
          </div>
          <div>
            <div className="uk-grid-small uk-grid margin-bottom">
              <div className="uk-width-auto">
                <img src="assets/images/avatars/avatar-4.jpg" className="rounded-lg" width="80" alt="" />
              </div>
              <div className="uk-width-expand">
                <h4 className="mb-2 uk-text-truncate"> Ninja Medai</h4>
                <p className="uk-text-small">
                  <span> 13 Members - </span>
                  <span> 15 Video per week</span>
                </p>
              </div>
              <div className="uk-width-auto">
                <a href="browse-channals.php" className="button light circle">
                  {' '}
                  <i className="uil-plus mr-2" />
                  Follow
                </a>
              </div>
            </div>
          </div>
          <div>
            <div className="uk-grid-small uk-grid margin-bottom">
              <div className="uk-width-auto">
                <img src="assets/images/avatars/avatar-3.jpg" className="rounded-lg" width="80" alt="" />
              </div>
              <div className="uk-width-expand">
                <h4 className="mb-2 uk-text-truncate"> Alex Dolgove</h4>
                <p className="uk-text-small">
                  <span> 13 Members - </span>
                  <span> 15 Video per week</span>
                </p>
              </div>
              <div className="uk-width-auto">
                <a href="browse-channals.php" className="button light circle">
                  <i className="uil-plus mr-2" />
                  Follow
                </a>
              </div>
            </div>
          </div>
          <div>
            <div className="uk-grid-small uk-grid uk-grid-margin margin-bottom">
              <div className="uk-width-auto">
                <img src="assets/images/avatars/avatar-1.jpg" className="rounded-lg" width="80" alt="" />
              </div>
              <div className="uk-width-expand">
                <h4 className="mb-2 uk-text-truncate"> Adrian Mohani </h4>
                <p className="uk-text-small">
                  <span> 13 Members - </span>
                  <span> 15 Video per week</span>
                </p>
              </div>
              <div className="uk-width-auto">
                <a href="browse-channals.php" className="button light circle">
                  {' '}
                  <i className="uil-plus mr-2" />
                  Follow
                </a>
              </div>
            </div>
          </div>
        </div>
         */}

        <Footer />
      </div>
    </div>
  );

  return (
    <div id="wrapper">
      <Helmet>
        <title>Airvting</title>
        <meta name="description" content="Description of Followers" />
      </Helmet>
      <Header />
      <Sidebar />
      {getHomeContent()}
      <Loader inProcess={inProcess} />
      {isShare && <Share onClose={updateShare} url={url} />}
    </div>
  );
}

HomePage.propTypes = {
  inProcess: PropTypes.bool.isRequired,
  updateShare: PropTypes.func.isRequired,
  url: PropTypes.string.isRequired,
  isShare: PropTypes.bool.isRequired,
};


const mapStateToProps = ({
  home: {
    categoryData, inProcess, isShare, url
  }, userDetails: { userData }
}) => ({
  userData, categoryData, inProcess, isShare, url
});

const mapDispatchToProps = dispatch => bindActionCreators(Actions, dispatch);

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(HomePage);
