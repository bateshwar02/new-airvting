/* eslint-disable jsx-a11y/click-events-have-key-events */
/**
 *
 * Share
 *
 */

import React, { memo } from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import Modal from '../Modal';
import './index.css';

function Share({ onClose, url }) {
  const data = [
    { name: 'Whatsapp', icon: 'whatsapp.svg', key: 'whatsapp' },
    { name: 'Facebook', icon: 'facebook.svg', key: 'facebook' },
    { name: 'Twitter', icon: 'twitter.svg', key: 'twitter' },
    { name: 'Email', icon: 'google-plus.svg', key: 'email' },
  ];
  const shareIt = (type) => {
    let shareUrl = null;

    switch (type) {
      case 'facebook':
        shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${url}`;
        break;
      case 'twitter':
        shareUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(`Airviting Posts: ${url}`)}`;
        break;
      case 'email':
        shareUrl = `mailto:?subject=${encodeURIComponent('Airvting Posts')}&body=${encodeURIComponent(
          `Airviting Posts Link : ${url}`,
        )}`;
        break;
      case 'whatsapp':
        shareUrl = `whatsapp://send?text=${encodeURIComponent(`Airviting Posts: ${url}`)}`;
        break;
      default:
        shareUrl = null;
        break;
    }
    if (shareUrl) {
      window.location.href = shareUrl;
    }
  };

  const getWrapper = () => data.map((item, index) => {
    const indeKey = `index-${index}`;
    return (
      <div className={classNames(`${item.name}Wrapper container`)} onClick={() => shareIt(item.key)} key={indeKey} role="button" tabIndex={0}>
        <span className="icon">
          {' '}
          <img src={`assets/icons/${item.icon}`} style={{ height: '48px', width: '48px' }} alt="" />
        </span>
        <span className="name">{item.name}</span>
      </div>
    );
  });
  const shareContent = () => <div className="shareWrapper">{getWrapper()}</div>;

  return (
    <>
      <Modal modalClass="shearModal" onCancel={() => onClose(false)} modalHeader="" modalContent={shareContent()} hasFooter={false} />
    </>
  );
}

Share.propTypes = {
  onClose: PropTypes.func.isRequired,
  url: PropTypes.string.isRequired,
};

export default memo(Share);
