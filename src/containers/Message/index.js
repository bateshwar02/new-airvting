/**
 *
 * MyChannel
 *
 */

import React, { memo, useState } from 'react';
// import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { compose, bindActionCreators } from 'redux';
import * as Actions from './actions';

import Header from '../../components/Header';
import Sidebar from '../../components/Sidebar';
import Footer from '../../components/Footer';
import Modal from '../../components/Modal';
import AddMessage from './component/add-message';
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
          <div className="uk-grid">
            <div className="uk-width-1-3 message-mobile-box">
              <div className="all-message-box">
                <ul>
                  <li>
                    <a href="">
                      <div className="message-person-img">
                        <img src="assets/images/avatars/avatar-2.jpg" alt="" />
                      </div>
                      <div className="message-persoin-text">
                        <div className="message-persoin-total-message">10</div>
                        <h6 className="message-persoin-name">Jonathan Madano</h6>
                        <strong className="message-persoin-title">Free for coffee?</strong>
                        <p className="message-text-message">Really excited  to try this place out.nice...</p>
                        <p className="message-text-time">5 min ago</p>
                      </div>
                    </a>
                  </li>
                  <li>
                    <a href="">
                      <div className="message-person-img">
                        <img src="assets/images/avatars/avatar-2.jpg" alt="" />
                      </div>
                      <div className="message-persoin-text">
                        <div className="message-persoin-total-message">6</div>
                        <h6 className="message-persoin-name">Jonathan Madano</h6>
                        <strong className="message-persoin-title">Free for coffee?</strong>
                        <p className="message-text-message">Really excited  to try this place out.nice...</p>
                        <p className="message-text-time">5 min ago</p>
                      </div>
                    </a>
                  </li>
                  <li>
                    <a href="">
                      <div className="message-person-img">
                        <img src="assets/images/avatars/avatar-2.jpg" alt="" />
                      </div>
                      <div className="message-persoin-text">
                        <div className="message-persoin-total-message">1</div>
                        <h6 className="message-persoin-name">Jonathan Madano</h6>
                        <strong className="message-persoin-title">Free for coffee?</strong>
                        <p className="message-text-message">Really excited  to try this place out.nice...</p>
                        <p className="message-text-time">5 min ago</p>
                      </div>
                    </a>
                  </li>
                  <li>
                    <a href="">
                      <div className="message-person-img">
                        <img src="assets/images/avatars/avatar-2.jpg" alt="" />
                      </div>
                      <div className="message-persoin-text">
                        <div className="message-persoin-total-message">1</div>
                        <h6 className="message-persoin-name">Jonathan Madano</h6>
                        <strong className="message-persoin-title">Free for coffee?</strong>
                        <p className="message-text-message">Really excited  to try this place out.nice...</p>
                        <p className="message-text-time">5 min ago</p>
                      </div>
                    </a>
                  </li>
                </ul>
              </div>
            </div>

            <div className="uk-width-2-3 single-message-mobile-box">
              <div className="single-message-box">
                <div className="single-message-box-main-name">
                  <h3>Jonathan Madano</h3>
                  <p>Free for coffee?</p>

                </div>
                <ul>
                  <li>
                    <div className="single-message-left">
                      <div className="single-message-text-time">jun 18,8:20pm</div>
                      <a href="">
                        <div className="single-message-person-img">
                          <img src="assets/images/avatars/avatar-2.jpg" alt="" />
                        </div>
                        <div className="single-message-persoin-text-left">
                          <p className="message-text-message">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,</p>
                        </div>
                      </a>
                    </div>
                  </li>
                  <li>
                    <div className="single-message-left color-box">
                      <div className="single-message-text-time">jun 18,8:20pm</div>
                      <a href="">
                        <div className="single-message-person-img">
                          <img src="assets/images/avatars/avatar-2.jpg" alt="" />
                        </div>
                        <div className="single-message-persoin-text-left">
                          <p className="message-text-message">Lorem Ipsum is simply dummy text of the industry. </p>
                          <p className="message-text-message">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,</p>
                        </div>
                      </a>
                    </div>
                  </li>
                  <li>
                    <div className="single-message-left">
                      <div className="single-message-text-time">jun 18,8:20pm</div>
                      <a href="">
                        <div className="single-message-person-img">
                          <img src="assets/images/avatars/avatar-2.jpg" alt="" />
                        </div>
                        <div className="single-message-persoin-text-left">
                          <p className="message-text-message">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,</p>
                        </div>
                      </a>
                    </div>
                  </li>
                </ul>
                <div className="single-message-input-box">
                  <input type="text" placeholder="Comments.." name="message-enter-text" />
                  <a href=""><i className="fa fa-paper-plane-o" /></a>
                </div>
              </div>
            </div>
          </div>
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

Message.propTypes = {
  // dispatch: PropTypes.func.isRequired,
};


const mapStateToProps = ({ message }) => ({ message });
const mapDispatchToProps = dispatch => bindActionCreators(Actions, dispatch);

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(Message);
