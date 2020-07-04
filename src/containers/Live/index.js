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
    if(window) {
      console.log('window ==== ', window);
        var publisher = new window.red5prosdk.RTCPublisher();
        // Initialize
        publisher.init({
            protocol: 'ws',
            port:5080,
            host: '18.140.72.26',
            app: 'live',
            streamName: 'mystream',
            rtcConfiguration: {
              iceServers: [{urls: 'stun:stun2.l.google.com:19302'}],
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
              video:{
                width: {
                  max: 1920,
                  ideal: 1280,
                  min: 640
                },
                width: {
                  max: 1080,
                  ideal: 720,
                  min: 360
                },
                frameRate: {
                  min: 8,
                  max: 24
                }
              }
            }
          })
          .then(function() {
            // Invoke the publish action.
            return publisher.publish();
          })
          .catch(function(error) {
            // A fault occurred while trying to initialize and publish the stream.
            console.error(error);
          });
          
    }



    // (function(red5prosdk) {
    //   'use strict';

    //   var rtcPublisher = new red5prosdk.RTCPublisher();
    //   var rtcSubscriber = new red5prosdk.RTCSubscriber();
    //   var config = {
    //     protocol: 'ws',
    //     host: '18.140.72.26',
    //     port: 5080,
    //     app: 'live',
    //     streamName: 'mystream1zssdusgf98436568436',
    //     rtcConfiguration: {
    //       iceServers: [{urls: 'stun:stun2.l.google.com:19302'}],
    //       iceCandidatePoolSize: 2,
    //       bundlePolicy: 'max-bundle'
    //     } // See https://developer.mozilla.org/en-US/docs/Web/API/RTCPeerConnection/RTCPeerConnection#RTCConfiguration_dictionary
    //   };

    //   function subscribe () {
    //     rtcSubscriber.init(config)
    //       .then(function () {
    //         return rtcSubscriber.subscribe();
    //       })
    //       .then(function () {
    //         console.log('Playing!');
    //       })
    //       .catch(function (err) {
    //         console.log('Could not play: ' + err);
    //       });
    //   }

    //   rtcPublisher.init(config)
    //     .then(function () {
    //       // On broadcast started, subscribe.
    //       rtcPublisher.on(red5prosdk.PublisherEventTypes.PUBLISH_START, subscribe);
    //       return rtcPublisher.publish();
    //     })
    //     .then(function () {
    //       console.log('Publishing!');
    //     })
    //     .catch(function (err) {
    //       console.error('Could not publish: ' + err);
    //     });

    // }(window.red5prosdk));
  
}, []);

const getContent = () => (
    <div className="main_content content-expand">
        <div className="main_content_inner">
            <div className="go-live-bxo">
                <div className="uk-grid">
                    <div className="videoPublishWrapper">
                        <div className="golive-video-img" style={{ position: 'relative' }}>
                            <video id="red5pro-publisher" autoPlay muted></video>
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
        <Header isLogin />
        {getContent()}
    </div>
);
}

Live.propTypes = {};


const mapStateToProps = ({ live }) => ({live });

const mapDispatchToProps = dispatch => bindActionCreators(Actions, dispatch);

const withConnect = connect(
mapStateToProps,
mapDispatchToProps,
);

export default compose(
withConnect,
memo,
)(Live);
