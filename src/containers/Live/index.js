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
import { compose, bindActionCreators } from 'redux';
import Utils from '../../utils/common';

import * as Actions from './actions';
// import Header from '../../components/Header';
// import Sidebar from '../../components/Sidebar';
// import Footer from '../../components/Footer';
// import AddPosts from './addPost';
import './index.css';

export function Live({ postData, userData }) {
  useEffect(() => {
    if (Utils.isUndefinedOrNullOrEmptyObject(userData)) {
      return;
    }
    (function (window, document, red5prosdk) {
      if (Utils.isUndefinedOrNull(window.red5proHandlePublisherEvent)) {
        return;
      }
      const configuration = {
        app: 'live',
        authentication: { enabled: false, username: 'user', password: 'pass' },
        bandwidth: { audio: 56, video: 750 },
        buffer: 0.5,
        cameraHeight: 480,
        cameraWidth: 640,
        embedHeight: 480,
        embedWidth: '100%',
        googleIce: [{ urls: 'stun:stun2.l.google.com:19302' }],
        host: '52.77.219.22',
        iceTransport: 'udp',
        keyFramerate: 3000,
        mediaConstraints: {
          audio: true,
          video: {
            frameRate: { min: 8, max: 30 },
            height: { min: 240, max: 480 },
            width: { min: 320, max: 640 }
          }
        },
        mozIce: [{ urls: 'stun:stun.services.mozilla.com:3478' }],
        muteOnAutoplayRestriction: true,
        port: 8554,
        proxy: 'streammanager',
        publisherFailoverOrder: 'rtc,rtmp',
        recordBroadcast: true,
        rtcConfiguration: {
          bundlePolicy: 'max-bundle',
          iceCandidatePoolSize: 2,
          iceServers: [{ urls: 'stun:stun2.l.google.com:19302' }],
          iceTransportPolicy: 'all',
          rtcpMuxPolicy: 'require',

        },
        stream1: 'stream1',
        stream2: 'stream2',
        streamManagerAPI: '4.0',
        streamManagerAccessToken: 'xyz123',
        streamMode: 'live',
        subscriberFailoverOrder: 'rtc,rtmp,hls',
        useAudio: true,
        useVideo: true,
        verboseLogging: true,
        version: '7.2.0-RC1'
      };

      const serverSettings = {
        hlsport: 5080,
        hlssport: 443,
        httpport: '5080',
        protocol: 'http',
        rtmpport: 1935,
        rtmpsport: 1936,
        wsport: 5080,
        wssport: 443,
      };

      red5prosdk.setLogLevel(configuration.verboseLogging ? red5prosdk.LOG_LEVELS.TRACE : red5prosdk.LOG_LEVELS.WARN);

      let targetPublisher;
      const updateStatusFromEvent = window.red5proHandlePublisherEvent; // defined in src/template/partial/status-field-publisher.hbs
      const streamTitle = {};
      const statisticsField = document.getElementById('statistics-field');
      const bitrateField = document.getElementById('bitrate-field');
      const packetsField = document.getElementById('packets-field');
      const resolutionField = document.getElementById('resolution-field');

      const { protocol } = serverSettings;

      const isSecure = protocol == 'https';
      function getSocketLocationFromProtocol() {
        return !isSecure
          ? { protocol: 'ws', port: serverSettings.wsport }
          : { protocol: 'wss', port: serverSettings.wssport };
      }

      let bitrate = 0;
      let packetsSent = 0;
      let frameWidth = 0;
      let frameHeight = 0;

      function updateStatistics(b, p, w, h) {
        statisticsField.classList.remove('hidden');
        bitrateField.innerText = b === 0 ? 'N/A' : Math.floor(b);
        packetsField.innerText = p;
        resolutionField.innerText = (w || 0) + 'x' + (h || 0);
      }

      function onBitrateUpdate(b, p) {
        bitrate = b;
        packetsSent = p;
        updateStatistics(bitrate, packetsSent, frameWidth, frameHeight);
      }

      function onResolutionUpdate(w, h) {
        frameWidth = w;
        frameHeight = h;
        updateStatistics(bitrate, packetsSent, frameWidth, frameHeight);
      }

      function onPublisherEvent(event) {
        console.log('[Red5ProPublisher] ' + event.type + '.');
        updateStatusFromEvent(event);
      }
      function onPublishFail(message) {
        console.error('[Red5ProPublisher] Publish Error :: ' + message);
      }
      function onPublishSuccess(publisher) {
        console.log('[Red5ProPublisher] Publish Complete.');
        try {
          const pc = publisher.getPeerConnection();
          const stream = publisher.getMediaStream();
          window.trackBitrate(pc, onBitrateUpdate);
          statisticsField.classList.remove('hidden');
          stream.getVideoTracks().forEach((track) => {
            const settings = track.getSettings();
            onResolutionUpdate(settings.width, settings.height);
          });
        } catch (e) {
          // no tracking for you!
        }
      }
      function onUnpublishFail(message) {
        console.error('[Red5ProPublisher] Unpublish Error :: ' + message);
      }
      function onUnpublishSuccess() {
        console.log('[Red5ProPublisher] Unpublish Complete.');
      }

      function getAuthenticationParams() {
        const auth = configuration.authentication;
        return auth && auth.enabled
          ? {
            connectionParams: {
              username: auth.username,
              password: auth.password
            }
          }
          : {};
      }

      function getUserMediaConfiguration() {
        return {
          mediaConstraints: {
            audio: configuration.useAudio ? configuration.mediaConstraints.audio : false,
            video: configuration.useVideo ? configuration.mediaConstraints.video : false
          }
        };
      }

      function getRTMPMediaConfiguration() {
        return {
          mediaConstraints: {
            audio: configuration.useAudio ? configuration.mediaConstraints.audio : false,
            video: configuration.useVideo ? {
              width: configuration.cameraWidth,
              height: configuration.cameraHeight
            } : false
          }
        };
      }

      function unpublish() {
        return new Promise(((resolve, reject) => {
          const publisher = targetPublisher;
          publisher.unpublish()
            .then(() => {
              onUnpublishSuccess();
              resolve();
            })
            .catch((error) => {
              const jsonError = typeof error === 'string' ? error : JSON.stringify(error, 2, null);
              onUnpublishFail('Unmount Error ' + jsonError);
              reject(error);
            });
        }));
      }

      const config = Object.assign({},
        configuration,
        {
          streamMode: configuration.recordBroadcast ? 'record' : 'live'
        },
        getAuthenticationParams(),
        getUserMediaConfiguration());

      const rtcConfig = Object.assign({}, config, {
        protocol: getSocketLocationFromProtocol().protocol,
        port: getSocketLocationFromProtocol().port,
        streamName: config.stream1,
      });
      const rtmpConfig = Object.assign({}, config, {
        protocol: 'rtmp',
        port: serverSettings.rtmpport,
        streamName: config.stream1,
        backgroundColor: '#000000',
        swf: '../../lib/red5pro/red5pro-publisher.swf',
        swfobjectURL: '../../lib/swfobject/swfobject.js',
        productInstallURL: '../../lib/swfobject/playerProductInstall.swf'
      }, getRTMPMediaConfiguration());
      let publishOrder = config.publisherFailoverOrder
        .split(',')
        .map(item => item.trim());

      if (window.query && window.query('view')) {
        publishOrder = [window.query('view')];
      }

      const publisher = new red5prosdk.Red5ProPublisher();
      publisher.setPublishOrder(publishOrder)
        .init({
          rtc: rtcConfig,
          rtmp: rtmpConfig
        })
        .then((publisherImpl) => {
          streamTitle.innerText = configuration.stream1;
          targetPublisher = publisherImpl;
          targetPublisher.on('*', onPublisherEvent);
          return targetPublisher.publish();
        })
        .then(() => {
          console.log('targetPublisher === ', targetPublisher);
          onPublishSuccess(targetPublisher);
        })
        .catch((error) => {
          const jsonError = typeof error === 'string' ? error : JSON.stringify(error, null, 2);
          console.error('[Red5ProPublisher] :: Error in publishing - ' + jsonError);
          onPublishFail(jsonError);
        });

      let shuttingDown = false;
      function shutdown() {
        if (shuttingDown) return;
        shuttingDown = true;
        function clearRefs() {
          if (targetPublisher) {
            targetPublisher.off('*', onPublisherEvent);
          }
          targetPublisher = undefined;
        }
        unpublish().then(clearRefs).catch(clearRefs);
        window.untrackBitrate();
      }
      window.addEventListener('pagehide', shutdown);
      window.addEventListener('beforeunload', shutdown);
    }(window, document, window.red5prosdk));
  }, []);


  const getContent = () => (
    <div className="centered">
      <video
        id="red5pro-publisher"
        className="red5pro-publisher"
        controls
        autoPlay
        playsInline
        muted
      />
    </div>
  );

  return (
    <div>
      {getContent()}
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
