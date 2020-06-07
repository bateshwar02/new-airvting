/**
 *
 * About
 *
 */

import React, { memo } from 'react';

function LiveComment() {
  return (
    <div className="live-chat-slide">
      <ul className="chat-ul-box">
        <li className="chat-li-box">
          <a href="browse-channals.php">
            <span className="chat-img">
              <img src="assets/images/avatars/avatar-2.jpg" alt="" />
            </span>
            <div className="chat-text-box">
              <strong className="chat-name">Jonathan Madano</strong>
              <p>Okay.. Thanks for The Answer I will be waiting for your...</p>
            </div>
          </a>
        </li>
        <li className="chat-li-box">
          <a href="browse-channals.php">
            <span className="chat-img">
              <img src="assets/images/avatars/avatar-3.jpg" alt="" />
            </span>
            <div className="chat-text-box">
              <strong className="chat-name">Stella Johnson</strong>
              <p>Okay.. Thanks for The Answer I will be waiting for your...</p>
            </div>
          </a>
        </li>
        <li className="chat-li-box">
          <a href="browse-channals.php">
            <span className="chat-img">
              <img src="assets/images/avatars/avatar-4.jpg" alt="" />
            </span>
            <div className="chat-text-box">
              <strong className="chat-name">Jonathan Madano</strong>
              <p>Okay.. Thanks for The Answer I will be waiting for your...</p>
            </div>
          </a>
        </li>
        <li className="chat-li-box">
          <a href="browse-channals.php">
            <span className="chat-img">
              <img src="assets/images/avatars/avatar-5.jpg" alt="" />
            </span>
            <div className="chat-text-box">
              <strong className="chat-name">Jonathan Madano</strong>
              <p>Okay.. Thanks for The Answer I will be waiting for your...</p>
            </div>
          </a>
        </li>
        <li className="chat-li-box">
          <a href="browse-channals.php">
            <span className="chat-img">
              <img src="assets/images/avatars/avatar-1.jpg" alt="" />
            </span>
            <div className="chat-text-box">
              <strong className="chat-name">Alex Dolgove</strong>
              <p>Okay.. Thanks for The Answer I will be waiting for your...</p>
            </div>
          </a>
        </li>
      </ul>
      <div className="chat-inp-box">
        <div className="chat-box-con">
          <input type="text" name="" placeholder="Comments..." />
        </div>
        <div className="chat-send-icon">
          <i className="fa fa-paper-plane-o" aria-hidden="true" />
        </div>
      </div>
    </div>
  );
}

LiveComment.propTypes = {};

export default memo(LiveComment);
