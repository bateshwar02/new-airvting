/* eslint-disable jsx-a11y/click-events-have-key-events */
/**
 *
 * Message
 *
 */

import React, { memo, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose, bindActionCreators } from 'redux';
import * as Actions from '../actions';
import Utils from '../../../utils/common';
import Loader from '../../../components/Loader';

export function conversationList({ getNotification, notificationData, inProcess }) {
  useEffect(() => {
    if (Utils.isUndefinedOrNullOrEmptyObject(notificationData)) {
      getNotification();
    }
  }, [notificationData]);

  const notificationList = () => {
    if (Utils.isUndefinedOrNullOrEmptyObject(notificationData)) {
      return null;
    }
    const { items } = notificationData;

    if (Utils.isUndefinedOrNullOrEmptyList(items)) {
      return (
        <li>
          <span className="notificationWrapper">
            <div className="notification-text notification-msg-text">
              <p>No Notification</p>
            </div>
          </span>
        </li>
      );
    }

    return items.map((item, index) => {
      const keys = `key-${index}`;
      const date1 = new Date(item.createdAt);
      const date2 = new Date();
      const diff = Math.abs(date1.getTime() - date2.getTime());
      const hours = new Date(diff).getHours();
      return (
        <li key={keys} className="notifications-not-read">
          <span className="notificationWrapper">
            <div className="notifierWrap">
              <div className="notifier">
                <span className="notification-icon">
                  <img src={item.notifier.featuredImage} alt="" style={{ width: '42px', height: '42px', borderRadius: '50%' }} />
                </span>
                <span className="notification-text">
                  <strong>{item.notifier.displayName}</strong>
                </span>
              </div>
              <div className="message">
                <span className="message-text">
                  {item.notifyMessage}
                </span>
              </div>
            </div>
            <div className="timer">
              <span className="notification-text">
                <span className="time-ago">
                  {hours}
                  {' '}
                  hours ago
                  {' '}
                </span>
              </span>
            </div>
          </span>
        </li>
      );
    });
  };

  return (
    <div className="uk-grid">
      <div className="message-mobile-box">
        <div className="all-message-box">
          <ul>
            {notificationList()}
          </ul>
        </div>
      </div>
      <Loader inProcess={inProcess} />
    </div>
  );
}

conversationList.propTypes = {
  notificationData: PropTypes.object.isRequired,
  getNotification: PropTypes.func.isRequired,
  inProcess: PropTypes.bool.isRequired,
};


const mapStateToProps = ({ message: { notificationData, inProcess } }) => ({ notificationData, inProcess });
const mapDispatchToProps = dispatch => bindActionCreators(Actions, dispatch);

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(conversationList);
