/**
 *
 * MyChannel
 *
 */

import React, { memo, useState } from 'react';
import { Helmet } from 'react-helmet';

import Header from '../../components/Header';
import Sidebar from '../../components/Sidebar';
import Footer from '../../components/Footer';
import Modal from '../../components/Modal';
import AddMessage from './component/add-message';
import Conversation from './component/conversation-list';
import './index.css';

export function Message() {
  const [isOpenModal, setModalAction] = useState(false);

  const getContent = () => (
    <div className="main_content">
      <div className="main_content_inner ">
        <div className="message-page-content-box">
          <h2> MESSAGE </h2>
          <div className="add-new-message-box">
            <button className="button default add-new-message-btn" type="button" onClick={() => setModalAction(true)}>New Message</button>
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
      {isOpenModal && (
      <Modal
        onCancel={() => setModalAction(false)}
        modalContent={<AddMessage />}
        modalHeader={<h2 className="uk-modal-title">New Message</h2>}
      />
      )}

    </div>
  );
}

export default memo(Message);
