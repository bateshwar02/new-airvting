/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { memo, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import Utils from '../../../utils/common';


function Notification({ notification, getNotification }) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (Utils.isUndefinedOrNullOrEmptyObject(notification)) {
      getNotification();
    }
    if (!Utils.isUndefinedOrNullOrEmptyObject(notification)) {
      setCount(notification.items.length);
    }
  }, [notification]);

  const getNotificationWrap = () => {
    if (Utils.isUndefinedOrNullOrEmptyObject(notification)) {
      return null;
    }
    const { items } = notification;

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
      // const date2 = new Date();
      // const diff = Math.abs(date1.getTime() - date2.getTime());
      // const hours = new Date(diff).getHours();
      return (
        <li key={keys} className="notifications-not-read">
          <span className="notificationWrapper">
            <span className="notification-icon">
              <i className="icon-feather-thumbs-up" />
            </span>
            <span className="notification-text">
              <strong>{item.notifier.displayName}</strong>
              <br />
              <span className="message">
                {item.notifyMessage}
              </span>

              {/* <span className="text-primary"> Learn Prototype Faster</span> */}
              <br />
              {' '}
              <span className="time-ago">
                {/* {hours}
                {' '}
                hours ago
                {' '} */}

                {Utils.formatDateAndTime(date1.getTime())}
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
    return (<span className="alertIcon">{notification.totalCount}</span>);
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
          <Link to="/notifications/false">
            <span>
              <i className="icon-feather-settings" uk-tooltip="title: Show All Notifications  ; pos: left" />
            </span>
          </Link>

        </div>
        <div className="dropdown-notifications-content" data-simplebar>
          <ul>
            {getNotificationWrap()}
          </ul>
        </div>
        <div className="dropdown-notifications-footer">
          { count > 3 && (
          <Link to="/notifications/false">
            <span>
              {' '}
              Show All
              {' '}
              <i className="icon-line-awesome-long-arrow-right" />
              {' '}
            </span>
          </Link>
          ) }
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
