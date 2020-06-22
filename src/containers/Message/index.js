/**
 *
 * MyChannel
 *
 */

import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import { connect } from 'react-redux';
import { compose, bindActionCreators } from 'redux';

import Header from '../../components/Header';
import Sidebar from '../../components/Sidebar';
import Footer from '../../components/Footer';
import Modal from '../../components/Modal';
import AddMessage from './component/add-message';
import Conversation from './component/conversation-list';
import * as Actions from './actions';
import './index.css';

export function Message({ isAddMessage, addMessageAction }) {
  const getContent = () => (
    <div className="main_content">
      <div className="main_content_inner ">
        <div className="message-page-content-box">
          <h2> MESSAGE </h2>
          <div className="add-new-message-box">
            <button className="button default add-new-message-btn" type="button" onClick={() => addMessageAction(true)}>New Message</button>
          </div>
          <Conversation />
        </div>
      </div>
      <Footer />
    </div>

  );

  return (
    <div>
      <Helmet>
        <title>Message</title>
        <meta name="description" content="Description of MyChannel" />
      </Helmet>
      <Header />
      <Sidebar />
      {getContent()}
      {isAddMessage && (
      <Modal
        onCancel={() => addMessageAction(false)}
        modalContent={<AddMessage />}
        modalHeader={<h2 className="uk-modal-title">New Message</h2>}
        hasFooter={false}
        modalClass="add-message-modal"
      />
      )}

    </div>
  );
}

Message.propTypes = {
  isAddMessage: PropTypes.bool.isRequired,
  addMessageAction: PropTypes.func.isRequired,
};


const mapStateToProps = ({ message: { isAddMessage } }) => ({ isAddMessage });
const mapDispatchToProps = dispatch => bindActionCreators(Actions, dispatch);

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(Message);
