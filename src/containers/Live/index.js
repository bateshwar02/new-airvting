/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/label-has-for */
/**
 *
 * Live
 *
 */

import React, { memo, useEffect } from 'react';
// import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { compose, bindActionCreators } from 'redux';


import * as Actions from './actions';
import Header from '../../components/Header';
import Sidebar from '../../components/Sidebar';
import Footer from '../../components/Footer';

export function Live() {
  useEffect(() => {
    // const peerConnections = {};
    // const config = {
    //     iceServers: [
    //         {
    //             urls: ['stun:stun.l.google.com:19302'],
    //         },
    //     ],
    // };
    // const socket = io(window.location.origin);
    // const video = document.querySelector('video');
    // const constraints = { video: true, audio: true };
    // navigator.mediaDevices
    //     .getUserMedia(constraints)
    //     .then(stream => {
    //         video.srcObject = stream;
    //         socket.emit('broadcaster');
    //     })
    //     .catch(error => {
    //         console.log('Device undefined ', error);
    //     });
    // socket.on('watcher', id => {
    //     const peerConnection = new RTCPeerConnection(config);
    //     peerConnections[id] = peerConnection;
    //     const stream = video.srcObject;
    //     stream.getTracks().forEach(track => peerConnection.addTrack(track, stream));
    //     peerConnection.onicecandidate = event => {
    //         if (event.candidate) {
    //             socket.emit('candidate', id, event.candidate);
    //         }
    //     };
    //     peerConnection
    //         .createOffer()
    //         .then(sdp => peerConnection.setLocalDescription(sdp))
    //         .then(() => {
    //             socket.emit('offer', id, peerConnection.localDescription);
    //         });
    // });
    // socket.on('answer', (id, description) => {
    //     peerConnections[id].setRemoteDescription(description);
    // });
    // socket.on('candidate', (id, candidate) => {
    //     peerConnections[id].addIceCandidate(new RTCIceCandidate(candidate));
    // });
    // socket.on('disconnectPeer', id => {
    //     peerConnections[id].close();
    //     delete peerConnections[id];
    // });
  });

  const getContent = () => (
    <div className="main_content content-expand">
      <div className="main_content_inner">
        <div className="go-live-bxo">
          <div className="uk-grid">
            <div className="uk-width-1-2@m">
              <div className="golive-video-img" style={{ position: 'relative' }}>
                <video className="golive-video-img-w" playsInline autoPlay muted />
                {/* <img src="assets/images/video-thumbal/golive.jpg" className="golive-video-img-w" alt="" /> */}
                <div className="chat-video-gift-box golive-gift-popup-box ">
                  <ul className="uk-tab gift-tab-box" data-uk-tab="{connect:'#my-id'}">
                    <li className="uk-active">
                      <a href="/store">
                        <i className="icon-feather-gift" />
                        {' '}
                        Gift Store
                      </a>
                    </li>
                    <li>
                      <a href="/store">
                        <i className="icon-feather-heart" />
                        {' '}
                        My Gift
                      </a>
                    </li>
                    <li className="tootal-coin">
                      <i className="icon-brand-bitcoin" />
                      {' '}
                      3480
                    </li>
                  </ul>
                  <ul id="my-id" className="uk-switcher uk-margin ">
                    <li className="gift-icon-all">
                      {/* <a href="/store" id="autoplayer"></a> */}
                      <div className="gifts-icon gilf-active-icon">
                        <img src="assets/images/video-thumbal/star.png" alt="" />
                        <p>star</p>
                        <p>
                          <i className="icon-brand-bitcoin" />
                          {' '}
                          1
                        </p>
                      </div>
                      <div className="gifts-icon">
                        <img src="assets/images/video-thumbal/ring.png" alt="" />
                        <p>Ring</p>
                        <p>
                          <i className="icon-brand-bitcoin" />
                          {' '}
                          12
                        </p>
                      </div>
                      <div className="gifts-icon">
                        <img src="assets/images/video-thumbal/drink.png" alt="" />
                        <p>Champagne</p>
                        <p>
                          <i className="icon-brand-bitcoin" />
                          {' '}
                          15
                        </p>
                      </div>
                      <div className="gifts-icon">
                        <img src="assets/images/video-thumbal/headphone.png" alt="" />
                        <p>headphone</p>
                        <p>
                          <i className="icon-brand-bitcoin" />
                          {' '}
                          21
                        </p>
                      </div>
                    </li>
                    <li>
                      <div className="gifts-icon gilf-active-icon">
                        <img src="assets/images/video-thumbal/star.png" alt="" />
                        <p>star</p>
                      </div>
                      <div className="gifts-icon">
                        <img src="assets/images/video-thumbal/ring.png" alt="" />
                        <p>Ring</p>
                      </div>
                      <div className="gifts-icon">
                        <img src="assets/images/video-thumbal/drink.png" alt="" />
                        <p>Champagne</p>
                      </div>
                      <div className="gifts-icon">
                        <img src="assets/images/video-thumbal/headphone.png" alt="" />
                        <p>headphone</p>
                      </div>
                    </li>
                    <li>Content 3</li>
                  </ul>
                </div>
                <div className="chat-vedio-icon-box golive-gift-box">
                  <div className="w50">
                    <p>
                      <i className="icon-feather-eye" />
                      {' '}
                      2.3k views
                    </p>
                    <div className="w50 text-right">
                      <ul className="gift-section">
                        <a href="store.php">
                          <li>
                            <img src="assets/images/video-thumbal/Shopping-icon.png" alt="" />
                          </li>
                        </a>
                        <a href="/thumb">
                          <li id="show">
                            <img src="assets/images/video-thumbal/gift-icon.png" alt="" />
                          </li>
                        </a>
                        <a href="my-token.php">
                          <li>
                            <img src="assets/images/video-thumbal/star-icon2.png" alt="" />
                          </li>
                        </a>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className=" uk-width-1-2@m">
              <div className="golive-option-box">
                <form className="uk-form">
                  <div className="golive-say-somthing">
                    <img src="assets/images/avatars/avatar-3.jpg" alt="" />
                    <input type="text" name="say-somthing" placeholder="say somthing" alt="" />
                  </div>
                  <select className="uk-select">
                    <option>Tag</option>
                    <option>option 2</option>
                    <option>option 3</option>
                  </select>
                  <select className="uk-select">
                    <option>Store</option>
                    <option>option 2</option>
                    <option>option 3</option>
                  </select>
                  <select className="uk-select">
                    <option>Category</option>
                    <option>option 2</option>
                    <option>option 3</option>
                  </select>
                  <div className="golive-input">
                    <label htmlFor="time" className="frm-golive-label">
                      Discount Timer
                    </label>
                    <input type="time" name="discount-timer" />
                  </div>
                  <div className="golive-input">
                    <label htmlFor="discount" className="frm-golive-label">
                      Discount Amount
                    </label>
                    <input type="text" name="discount-Amount" />
                  </div>
                  <div className="golive-input">
                    <label htmlFor="stock" className="frm-golive-label">
                      Stock Availability
                    </label>
                    <input type="text" name="Stock-availability" />
                  </div>
                </form>
                <div className="golive-btn">
                  <div className="uk-flex uk-flex-center mb-3">
                    <a href="video.php" className="button default ">
                      <i className="icon-feather-video mr-2" />
                      {' '}
                      Go live
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );

  return (
    <div>
      <Helmet>
        <title>Live</title>
        <meta name="description" content="Description of Live" />
      </Helmet>
      <Sidebar />
      <Header />
      {getContent()}
    </div>
  );
}

Live.propTypes = {};


const mapStateToProps = ({ live }) => ({ live });
const mapDispatchToProps = dispatch => bindActionCreators(Actions, dispatch);

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(Live);
