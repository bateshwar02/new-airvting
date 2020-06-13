import React, { memo, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Utils from '../../../utils/common';


function Message({ message, getMessage }) {
  useEffect(() => {
    if (Utils.isUndefinedOrNullOrEmptyObject(message)) {
      getMessage();
    }
  }, []);

  const getMessageWrap = () => {
    const { items } = message;
    if (Utils.isUndefinedOrNullOrEmptyList(items)) {
      return null;
    }
    return items.map((item, index) => {
      const keys = `key-${index}`;
      const date1 = new Date(item.createdAt);
      const date2 = new Date();
      const diff = Math.abs(date1.getTime() - date2.getTime());
      const hours = new Date(diff).getHours();
      return (
        <li key={keys}>
          <span className="notificationWrapper">
            <span className="notification-avatar">
              <img src={item.notifier.featuredImage} alt="" />
            </span>
            <div className="notification-text notification-msg-text">
              <strong>{item.notifier.displayName}</strong>
              <p>{item.notifyMessage}</p>
              <span className="time-ago">
                {' '}
                {hours}
                {' '}
                hours ago
                {' '}
              </span>
            </div>
          </span>
        </li>
      );
    });
  };

  const getMessageCount = () => {
    if (Utils.isUndefinedOrNullOrEmpty(message.totalCount)) {
      return null;
    }
    return (<span>{message.totalCount}</span>);
  };

  return (
    <>
      <span className="opts_icon">
        <i className="uil-envelope-alt" />
        {getMessageCount()}
      </span>
      <div uk-dropdown="pos: top-right;mode:click ; animation: uk-animation-slide-bottom-small" className="dropdown-notifications">
        <div className="dropdown-notifications-headline">
          <h4>Messages</h4>
          <span>
            <i className="icon-feather-settings" uk-tooltip="title: Message settings ; pos: left" />
          </span>
        </div>
        <div className="dropdown-notifications-content data-simplebar">
          <ul>
            {getMessageWrap()}
          </ul>
        </div>
        <div className="dropdown-notifications-footer">
          <Link to="/message">
            <span>
              {' '}
              sell all
              {' '}
              <i className="icon-line-awesome-long-arrow-right" />
              {' '}
            </span>
          </Link>
        </div>
      </div>
    </>
  );
}

Message.propTypes = {
  message: PropTypes.object.isRequired,
  getMessage: PropTypes.func.isRequired,
};

export default memo(Message);
