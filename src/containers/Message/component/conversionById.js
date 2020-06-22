/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, {
  memo, useState, useEffect
} from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose, bindActionCreators } from 'redux';
import * as Actions from '../actions';
import Utils from '../../../utils/common';


export function conversationById({
  getConversationById, conversionDataById, msgId, addReply
}) {
  const [content, setContent] = useState('');

  useEffect(() => {
    if (!Utils.isUndefinedOrNullOrEmpty(msgId)) {
      getConversationById(msgId);
    }
    setContent('');
  }, [msgId]);

  const onchange = (event) => {
    setContent(event.target.value);
  };

  const submitReply = (id) => {
    if (!Utils.isUndefinedOrNullOrEmpty(content)) {
      const formData = {};
      const contentObj = {
        height: 0, type: 'text', width: 0, message: content
      };
      formData.content = contentObj;
      addReply(formData, id);
    }
  };

  const messageList = (data, imgage) => {
    if (Utils.isUndefinedOrNullOrEmptyList(data)) {
      return null;
    }
    return data.map((item, index) => {
      const date = new Date(item.updatedAt);
      const ticks = date.getTime();
      const keys = `msg-${index}`;
      const contentData = JSON.parse(item.content);
      return (
        <li key={keys}>
          <div className="single-message-left">
            <div className="single-message-text-time">{Utils.formatDateAndTime(ticks)}</div>
            <span>
              <div className="single-message-person-img">
                <img src={imgage} alt="" />
              </div>
              <div className="single-message-persoin-text-left">
                <p className="message-text-message">{contentData.message}</p>
              </div>
            </span>
          </div>
        </li>
      );
    });
  };

  const childData = () => {
    const { conversationsDetail } = conversionDataById;
    if (Utils.isUndefinedOrNullOrEmptyObject(conversationsDetail)) {
      return null;
    }
    const {
      title, sender, messages, _id
    } = conversationsDetail;
    return (
      <div className="single-message-box">
        <div className="single-message-box-main-name">
          <h3>{sender.displayName}</h3>
          <p>{title}</p>
        </div>
        <ul>
          {messageList(messages, sender.featuredImage)}
        </ul>
        <div className="single-message-input-box">
          <input type="text" placeholder="Comments.." name="message-enter-text" onChange={onchange} value={content} />
          <span className="reply" onClick={() => submitReply(_id)} role="button" tabIndex={0}><i className="fa fa-paper-plane-o" /></span>
        </div>
      </div>
    );
  };

  return (
    <div className="uk-width-2-3 single-message-mobile-box">
      {childData()}
    </div>
  );
}

conversationById.propTypes = {
  conversionDataById: PropTypes.object.isRequired,
  getConversationById: PropTypes.func.isRequired,
  msgId: PropTypes.string.isRequired,
  addReply: PropTypes.func.isRequired,
};


const mapStateToProps = ({ message: { conversionDataById, inProcess } }) => ({ conversionDataById, inProcess });
const mapDispatchToProps = dispatch => bindActionCreators(Actions, dispatch);

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(conversationById);
