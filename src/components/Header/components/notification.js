/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { memo, useEffect } from 'react';
import PropTypes from 'prop-types';
import Utils from '../../../utils/common';


function Notification({ notification, getNotification }) {
  useEffect(() => {
    if (Utils.isUndefinedOrNullOrEmptyObject(notification)) {
      getNotification();
    }
  }, []);

  const getNotificationWrap = () => {
    const { items } = notification;
    if (Utils.isUndefinedOrNullOrEmptyList(items)) {
      return null;
    }
    return items.map((item, index) => {
      const keys = `key-${index}`;
      const date1 = new Date(item.createdAt);
      const date2 = new Date();
      const diff = Math.abs(date1.getTime() - date2.getTime());
      const hours = new Date(diff).getHours();
      if (Number(index) < 10) {
        return null;
      }
      return (
        <li key={keys} className="notifications-not-read">
          <span className="notificationWrapper">
            <span className="notification-icon">
              <i className="icon-feather-thumbs-up" />
            </span>
            <span className="notification-text">
              <strong>{item.notifier.displayName}</strong>
              {item.notifyMessage}
              <span className="text-primary"> Learn Prototype Faster</span>
              <br />
              {' '}
              <span className="time-ago">
                {hours}
                {' '}
                hours ago
                {' '}
              </span>
            </span>
          </span>
        </li>
      );
    });
  };

  const getNotificationCount = () => {
    if (Utils.isUndefinedOrNullOrEmpty(notification.totalCount)) {
      return null;
    }
    return (<span>{notification.totalCount}</span>);
  };

  return (
    <>
      <span role="button" tabIndex={0} onClick={() => false} className="opts_icon">
        <i className="uil-bell" />
        {getNotificationCount()}
      </span>
      <div uk-dropdown="pos: top-right;mode:click ; animation: uk-animation-slide-bottom-small" className="dropdown-notifications">
        <div className="dropdown-notifications-headline">
          <h4>Notifications </h4>
          <span>
            <i className="icon-feather-settings" uk-tooltip="title: Notifications settings ; pos: left" />
          </span>
        </div>
        <div className="dropdown-notifications-content" data-simplebar>
          <ul>
            {getNotificationWrap()}
          </ul>
        </div>
      </div>
    </>
  );
}

Notification.propTypes = {
  notification: PropTypes.object.isRequired,
  getNotification: PropTypes.func.isRequired,
};

export default memo(Notification);
