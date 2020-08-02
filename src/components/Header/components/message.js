import React, { memo, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Utils from '../../../utils/common';


function Message({ message, getMessage }) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (Utils.isUndefinedOrNullOrEmptyObject(message)) {
      getMessage();
    }
    if (!Utils.isUndefinedOrNullOrEmptyObject(message)) {
      setCount(message.items.length);
    }
  }, []);

  const getMessageWrap = () => {
    if (Utils.isUndefinedOrNullOrEmptyObject(message)) {
      return null;
    }
    const { items } = message;
    if (Utils.isUndefinedOrNullOrEmptyList(items)) {
      return (
        <li>
          <span className="notificationWrapper">
            <div className="notification-text notification-msg-text">
              <p>No message</p>
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
        <li key={keys}>
          <span className="notificationWrapper">
            <span className="notification-avatar">
              <img src={item.notifier.featuredImage} alt="" style={{ height: '42px', width: '42px' }} />
            </span>
            <div className="notification-text notification-msg-text">
              <strong>{item.notifier.displayName}</strong>
              <p>{item.notifyMessage}</p>
              <br />
              <span className="time-ago">
                {Utils.formatDateAndTime(date1.getTime())}
                {/* {' '}
                {hours}
                {' '}
                hours ago
                {' '} */}
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
    return (<span className="alertIcon">{message.totalCount}</span>);
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
          <span className="alertIcon">
            <i className="icon-feather-settings" uk-tooltip="title: Message settings ; pos: left" />
          </span>
        </div>
        <div className="dropdown-notifications-content data-simplebar">
          <ul>
            {getMessageWrap()}
          </ul>
        </div>

        <div className="dropdown-notifications-footer">
          { count > 3 && (
            <Link to="/message/true">
              <span>
                {' '}
                Show All
                {' '}
                <i className="icon-line-awesome-long-arrow-right" />
                {' '}
              </span>
            </Link>
          )}

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
