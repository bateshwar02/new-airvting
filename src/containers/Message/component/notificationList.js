/* eslint-disable jsx-a11y/aria-role */
/* eslint-disable jsx-a11y/no-noninteractive-tabindex */
/* eslint-disable jsx-a11y/tabindex-no-positive */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/**
 *
 * Message
 *
 */

import React, { memo, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { connect } from 'react-redux';
import { compose, bindActionCreators } from 'redux';
import * as Actions from '../actions';
import Utils from '../../../utils/common';
import Loader from '../../../components/Loader';

export function conversationList({
  getNotification, notificationData, inProcess, match, deleteAll, readNotifications
}) {
  const [tabMenu] = useState([{ name: 'Inbox', value: true }, { name: 'Activity', value: false }]);
  const [defaultValue, setDefault] = useState(false);

  useEffect(() => {
    const { params } = match;
    if (Utils.isUndefinedOrNullOrEmptyObject(notificationData)) {
      const status = Utils.isUndefinedOrNull(params.status) ? params.status : false;
      getNotification(status);
      setDefault(status);
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
              <p>No Data Found</p>
            </div>
          </span>
        </li>
      );
    }

    return items.map((item, index) => {
      const keys = `key-${index}`;
      const date1 = new Date(item.createdAt);
      // console.log('date1 ==== ', date1.getTime());
      // const date2 = new Date();
      // const diff = Math.abs(date1.getTime() - date2.getTime());
      // const hours = new Date(diff).getHours();
      return (
        <li key={keys} className="notifications-not-read">
          <span className="notificationWrapper" role="button" tabIndex={0} onClick={() => { readNotifications(item._id, defaultValue); }}>
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
                  {/* {hours} */}
                  {Utils.formatDateAndTime(date1.getTime())}
                  {' '}
                  {/* hours ago */}
                  {' '}
                </span>
              </span>
            </div>
          </span>
        </li>
      );
    });
  };

  const getTabAction = (status) => {
    setDefault(status);
    getNotification(status);
  };


  const menuList = data => data.map((item, index) => {
    const idx = `content-${index}`;
    return (
      <span
        className={classNames('actionButton', { active: defaultValue === item.value })}
        key={idx}
        onClick={() => getTabAction(item.value)}
        role="button"
        tabIndex={0}
      >
        {item.name}
      </span>
    );
  });

  const menuTab = () => (
    <div className="buttonWrapper menuWrap actionWrap">
      <div className="listWrapper marginLeft">{menuList(tabMenu)}</div>
      <div className="deleteButtonWrapp">
        <span className="actionButton" role="butoon" tabIndex={1} onClick={() => deleteAll(defaultValue)}> Delete All </span>
      </div>
    </div>
  );

  return (
    <div className="uk-grid">
      {menuTab()}
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
  match: PropTypes.object.isRequired,
  deleteAll: PropTypes.func.isRequired,
  readNotifications: PropTypes.func.isRequired,
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
