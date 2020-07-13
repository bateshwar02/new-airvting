/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/label-has-for */
/**
 *
 * Live
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
import AddPosts from './addPost';
import './index.css';

export function Live({postData, userData}) {
  useEffect(() => {
   
    if(Utils.isUndefinedOrNullOrEmptyObject(postData)){
       return;
    }
    if (window) {
      console.log('window ==== ', window);
      const publisher = new window.red5prosdk.RTCPublisher();
      // Initialize
      publisher.init({
        protocol: 'ws',
        port: 5080,
        host: '52.77.219.22',
        app: 'live',
        streamName: `${userData.userDetail._id}-${postData.title}`,
        rtcConfiguration: {
          iceServers: [{ urls: 'stun:stun2.l.google.com:19302' }],
          iceCandidatePoolSize: 2,
          bundlePolicy: 'max-bundle'
        }, // See https://developer.mozilla.org/en-US/docs/Web/API/RTCPeerConnection/RTCPeerConnection#RTCConfiguration_dictionary
        streamMode: 'append',
        mediaElementId: 'red5pro-publisher',
        bandwidth: {
          audio: 56,
          video: 512
        },
        mediaConstraints: {
          audio: true,
          video: {
            width: {
              max: 1920,
              ideal: 1280,
              min: 640
            },
            height: {
              max: 1080,
              ideal: 720,
              min: 360
            },
            frameRate: {
              min: 8,
              max: 24
            },
            bandwidth: 50000,
            quality: 80,
            profile: 'baseline',
            level: '3.1'
          }
        }
      })
        .then(() => publisher.publish())
        .catch((error) => {
          // A fault occurred while trying to initialize and publish the stream.
          console.error(error);
        });

        setTimeout(()=>{captureImage()}, 4000);

    }
  }, [postData]);

  const clearCanvas = (targetElement, canvasElement) => {
    var context = canvasElement.getContext('2d');
    context.fillStyle = '#a1a1a1';
    context.fillRect(0, 0, targetElement.offsetWidth, targetElement.offsetHeight);
  }
  
  const drawOnCanvas = (targetElement, canvasElement) => {
    var context = canvasElement.getContext('2d');
    canvasElement.width = targetElement.offsetWidth;
    canvasElement.height = targetElement.offsetHeight;
    context.drawImage(targetElement, 0, 0, targetElement.offsetWidth, targetElement.offsetHeight);
    console.log('context=====', context);
    }
  
  const captureImage = ()=> {
    console.log('context=====1');
    if(document){
      console.log('context=====2');
      const videoElement = document.getElementById('red5pro-publisher');
      const canvasElement = document.getElementById('capture-canvas');
      clearCanvas(videoElement, canvasElement);
      drawOnCanvas(videoElement, canvasElement);
    }
  }  
  

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
        <canvas id="capture-canvas"></canvas>
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


const mapStateToProps = ({ live: {postData} , userDetails: { userData } }) => ({ postData, userData });

const mapDispatchToProps = dispatch => bindActionCreators(Actions, dispatch);

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(Live);
