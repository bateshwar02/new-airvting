/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/label-has-for */
/**
 *
 * Live
 *
 */

import React, { memo, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { compose, bindActionCreators } from 'redux';
import Utils from '../../utils/common';

import * as Actions from './actions';
import Header from '../../components/Header';
import Sidebar from '../../components/Sidebar';
import Footer from '../../components/Footer';
import AddPosts from './addPost';
import './index.css';

export function Live({ postData, userData }) {
  console.log('postData ===== ', postData);
  const [image, setImage] = useState('');
  const clearCanvas = (targetElement, canvasElement) => {
    const context = canvasElement.getContext('2d');
    context.fillStyle = '#a1a1a1';
    context.fillRect(0, 0, targetElement.offsetWidth, targetElement.offsetHeight);
  };

  const drawOnCanvas = (targetElement, canvasElement) => {
    const context = canvasElement.getContext('2d');
    canvasElement.width = targetElement.offsetWidth;
    canvasElement.height = targetElement.offsetHeight;
    context.drawImage(targetElement, 0, 0, targetElement.offsetWidth, targetElement.offsetHeight);
    const c = document.getElementById('capture-canvas');
    const d = c.toDataURL('image/png');
    setImage(d);
    console.log('image=====', d);
  };

  const captureImage = () => {
    if (document) {
      const videoElement = document.getElementById('red5pro-publisher');
      const canvasElement = document.getElementById('capture-canvas');
      clearCanvas(videoElement, canvasElement);
      drawOnCanvas(videoElement, canvasElement);
    }
  };

  useEffect(() => {
    if (Utils.isUndefinedOrNullOrEmptyObject(postData)) {
      return;
    }
    if (Utils.isUndefinedOrNullOrEmptyObject(userData)) {
      return;
    }
    if (window) {
      const publisher = new window.red5prosdk.RTCPublisher();
      // Initialize
      publisher.init({
        // protocol: 'wss',
        // port: 443,

        protocol: 'ws',
        port: 5080,
        host: '52.77.219.22',
        app: 'live',
        streamName: 'bnm-streaming1',
        rtcConfiguration: {
          iceServers: [{ urls: 'stun:stun2.l.google.com:19302' }],
          iceCandidatePoolSize: 2,
          bundlePolicy: 'max-bundle'
        }, // See https://developer.mozilla.org/en-US/docs/Web/API/RTCPeerConnection/RTCPeerConnection#RTCConfiguration_dictionary
        streamMode: 'live',
        mediaElementId: 'red5pro-publisher',
        bandwidth: {
          audio: 56,
          video: 512
        },
        mediaConstraints: {
          audio: true,
          video: {
            // width: {
            //   exact: 640
            // },
            height: {
              //   exact: 480
              exact: 560
            },
            frameRate: {
              min: 8,
              max: 24
            }
          }
        }
      })
        .then(() => publisher.publish())
        .catch((error) => {
          // A fault occurred while trying to initialize and publish the stream.
          console.error(error);
        });
    }
  }, []);

  const getContent = () => (
    <div className="main_content content-expand">
      <div className="main_content_inner">
        <div className="go-live-bxo">
          <div className="uk-grid">
            <div className="videoPublishWrapper">
              <div className="golive-video-img" style={{ position: 'relative' }}>
                <video id="red5pro-publisher" autoPlay muted />
              </div>
            </div>
          </div>
        </div>
        <canvas id="capture-canvas" />
        <img src={image} alt="" />
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
      <AddPosts />
    </div>
  );
}

Live.propTypes = {
  postData: PropTypes.object.isRequired,
  userData: PropTypes.object.isRequired,
};


const mapStateToProps = ({ live: { postData }, userDetails: { userData } }) => ({ postData, userData });

const mapDispatchToProps = dispatch => bindActionCreators(Actions, dispatch);

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(Live);
