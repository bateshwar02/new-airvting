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
  // useEffect(() => {
  //   if (window) {
  //     const subscriber = new window.red5prosdk.RTCSubscriber();
  //     // Initialize
  //     subscriber.init({
  //       protocol: 'ws',
  //       port: 5080,
  //       host: '52.77.219.22',
  //       app: 'live',
  //       streamName: stream,
  //       rtcConfiguration: {
  //         iceServers: [{ urls: 'stun:stun2.l.google.com:19302' }],
  //         iceCandidatePoolSize: 2,
  //         bundlePolicy: 'max-bundle'
  //       },
  //       mediaElementId: 'red5pro-subscriber',
  //       subscriptionId: stream,
  //       videoEncoding: 'NONE',
  //       audioEncoding: 'NONE'
  //     })
  //       .then((subscribers) => {
  //         console.log('subscriber ===', subscribers);
  //         // `subcriber` is the WebRTC Subscriber instance.
  //         return subscriber.subscribe();
  //       })
  //       .then((subs) => {
  //         console.log(subs);
  //         // subscription is complete.
  //         // playback should begin immediately due to
  //         //   declaration of `autoplay` on the `video` element.
  //       })
  //       .catch((error) => {
  //         // A fault occurred while trying to initialize and playback the stream.
  //         console.error(error);
  //       });
  //   }
  // }, []);

  useEffect(() => {
    (function (red5prosdk) {
      // Create a new instance of the WebRTC subcriber.
      const subscriber = new red5prosdk.RTCSubscriber();

      // Initialize
      subscriber.init({
        protocol: 'ws',
        port: 5080,
        host: 'localhost',
        app: 'live',
        streamName: 'test-stream',
        rtcConfiguration: {
          iceServers: [{ urls: 'stun:stun2.l.google.com:19302' }],
          iceCandidatePoolSize: 2,
          bundlePolicy: 'max-bundle'
        }, // See https://developer.mozilla.org/en-US/docs/Web/API/RTCPeerConnection/RTCPeerConnection#RTCConfiguration_dictionary
        mediaElementId: 'red5pro-subscriber',
        subscriptionId: 'test-stream' + Math.floor(Math.random() * 0x10000).toString(16),
        videoEncoding: 'NONE',
        audioEncoding: 'NONE'
      })
        .then(subscriber => subscriber.subscribe())
        .then((subscriber) => {
        // subscription is complete.
        // playback should begin immediately due to
        //   declaration of `autoplay` on the `video` element.
        })
        .catch((error) => {
        // A fault occurred while trying to initialize and playback the stream.
          console.error(error);
        });
    }(window.red5prosdk));
  }, []);

  return (
    <div className="videoPublishWrapper">
      <div className="golive-video-img" style={{ position: 'relative' }}>
        {/* <video id="red5pro-subscriber" width="640" height="400" poster="assets/images/default.jpg" controls> </video> */}

        <video
          id="red5pro-subscriber"
          className="red5pro-media red5pro-media-background"
          autoPlay
          controls
        />
      </div>
    </div>
  );
}

Video.propTypes = {
  stream: PropTypes.string.isRequired
};

export default memo(Video);
