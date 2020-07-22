/* eslint-disable jsx-a11y/media-has-caption */
/**
 *
 * Video
 *
 */

import React, { memo, useEffect } from 'react';
import PropTypes from 'prop-types';
// import styled from 'styled-components';

function Video({ stream }) {
  useEffect(() => {
    if (window) {
      const subscriber = new window.red5prosdk.RTCSubscriber();
      // Initialize
      subscriber.init({
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
        mediaElementId: 'red5pro-subscriber',
        subscriptionId: 'mystream' + Math.floor(Math.random() * 0x10000).toString(16),
        videoEncoding: 'NONE',
        audioEncoding: 'NONE'
      })
        .then((subscriber) => {
          console.log('subscriber ===', subscriber);
          // `subcriber` is the WebRTC Subscriber instance.
          return subscriber.subscribe();
        })
        .then((subscriber) => {
        // subscription is complete.
        // playback should begin immediately due to
        //   declaration of `autoplay` on the `video` element.
        })
        .catch((error) => {
        // A fault occurred while trying to initialize and playback the stream.
          console.error(error);
        });
    }
  }, []);

  return (
    <div className="videoPublishWrapper">
      <div className="golive-video-img" style={{ position: 'relative' }}>
        {/* <video id="red5pro-subscriber" width="640" height="400" poster="assets/images/default.jpg" controls> </video> */}
        <video id="red5pro-subscriber" width="640" height="400" controls> </video>
        {/* <video id="red5pro-subscriber" controls> </video> */}
      </div>
    </div>
  );
}

Video.propTypes = {
  stream: PropTypes.string.isRequired
};

export default memo(Video);
