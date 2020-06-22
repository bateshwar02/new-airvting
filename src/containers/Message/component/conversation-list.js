/* eslint-disable jsx-a11y/click-events-have-key-events */
/**
 *
 * Message
 *
 */

import React, {
  memo, useState, useEffect
} from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose, bindActionCreators } from 'redux';
import * as Actions from '../actions';
import Utils from '../../../utils/common';
import Conversation from './conversionById';
import Loader from '../../../components/Loader';

export function conversationList({ getConversation, messageData, inProcess }) {
  const [msgId, setMsgId] = useState('');
  useEffect(() => {
    if (Utils.isUndefinedOrNullOrEmptyObject(messageData)) {
      getConversation();
    }
    if (!Utils.isUndefinedOrNullOrEmptyObject(messageData)) {
      const { conversationsDetail } = messageData;
      if (!Utils.isUndefinedOrNullOrEmptyList(conversationsDetail)) {
        setMsgId(conversationsDetail[0]._id);
      }
    }
  }, [messageData]);

  const messageList = () => {
    const { conversationsDetail } = messageData;
    if (Utils.isUndefinedOrNullOrEmptyObject(conversationsDetail)) {
      return null;
    }
    return conversationsDetail.map((item, index) => {
      const date = new Date(item.updatedAt);
      const ticks = date.getTime();
      const keys = `msg-${index}-${item._id}`;
      const messageObj = JSON.parse(item.messages[0].content);
      return (
        <li key={keys}>
          <span role="button" tabIndex={0} onClick={() => setMsgId(item._id)}>
            <div className="message-person-img">
              <img src={item.sender.featuredImage} alt="" />
            </div>
            <div className="message-persoin-text">
              <div className="message-persoin-total-message">{item.unReadCount}</div>
              <h6 className="message-persoin-name">{item.sender.displayName}</h6>
              <strong className="message-persoin-title">{item.title}</strong>
              <p className="message-text-message">{messageObj.message}</p>
              <p className="message-text-time">
                {Utils.formatDateAndTime(ticks, 'h:MM TT')}
              </p>
            </div>
          </span>
        </li>
      );
    });
  };

  console.log('msgId ===', msgId);

  return (
    <div className="uk-grid">
      <div className="uk-width-1-3 message-mobile-box">
        <div className="all-message-box">
          <ul>
            {messageList()}
          </ul>
        </div>
      </div>
      {!Utils.isUndefinedOrNullOrEmpty(msgId) && <Conversation msgId={msgId} />}
      <Loader inProcess={inProcess} />
    </div>
  );
}

conversationList.propTypes = {
  messageData: PropTypes.object.isRequired,
  getConversation: PropTypes.func.isRequired,
  inProcess: PropTypes.bool.isRequired,
};


const mapStateToProps = ({ message: { messageData, inProcess } }) => ({ messageData, inProcess });
const mapDispatchToProps = dispatch => bindActionCreators(Actions, dispatch);

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(conversationList);
