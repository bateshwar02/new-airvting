import React, { memo } from 'react';
import PropTypes from 'prop-types';
import FacebookLogin from 'react-facebook-login';
import Utils from '../../utils/common';
import './index.css';

function Facebook({ socialLogin }) {
  const responseFacebook = (response) => {
    if (Utils.isUndefinedOrNullOrEmptyObject(response)) {
      return;
    }
    const formData = {};
    formData.birth = '';
    formData.email = !Utils.isUndefinedOrNullOrEmpty(response.email) ? response.email : '';
    formData.featuredImage = !Utils.isUndefinedOrNullOrEmpty(response.picture.data.url) ? response.picture.data.url : '';
    formData.firstName = !Utils.isUndefinedOrNullOrEmpty(response.name) ? response.name : '';
    formData.lastName = '';
    formData.phoneNumber = '';
    formData.socialId = !Utils.isUndefinedOrNullOrEmpty(response.userId) ? response.userId : '';
    formData.socialToken = !Utils.isUndefinedOrNullOrEmpty(response.accessToken) ? response.accessToken : '';
    formData.socialType = 'facebook';
    formData.username = !Utils.isUndefinedOrNullOrEmpty(response.name) ? response.name : '';
    socialLogin(formData);
  };

  return (
    <div className="facebookWrapper">
      <FacebookLogin
        appId="251306312866915"
        autoLoad={false}
        fields="name,email,picture"
        callback={responseFacebook}
        cssClass="facebook-button"
      />
    </div>
  );
}

Facebook.propTypes = {
  socialLogin: PropTypes.func.isRequired,
};

export default memo(Facebook);
