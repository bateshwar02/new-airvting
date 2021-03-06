/**
 *
 * My Gift
 *
 */

import React, { memo, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose, bindActionCreators } from 'redux';
import Utils from '../../../utils/common';
import * as Actions from '../actions';

function Mygift({ myGift, myGiftData, storeProccess }) {
  useEffect(() => {
    if (Utils.isUndefinedOrNullOrEmptyObject(myGift)) {
      myGiftData();
    }
  }, []);


  const getContent = () => {
    if (Utils.isUndefinedOrNullOrEmptyObject(myGift)) {
      return null;
    }
    const { giftDetail } = myGift;
    if (Utils.isUndefinedOrNullOrEmptyList(giftDetail)) {
      return (<div className="gifts-icon"> No Data </div>);
    }
    return giftDetail.map((item, index) => {
      const keys = `index-key-${index}`;
      return (
        <div className="gifts-icon" key={keys}>
          <img src={item.featuredImage} alt="" />
          <p>{Utils.capitalize(item.title)}</p>
        </div>
      );
    });
  };

  return (
    <li>
      {getContent()}
      {storeProccess && (
      <div className="loaderWrapper dataWrap">
        <div className="customLoader" />
      </div>
      )}
    </li>
  );
}

Mygift.propTypes = {
  myGift: PropTypes.object.isRequired,
  myGiftData: PropTypes.func.isRequired,
};


const mapStateToProps = ({ detailsVideos: { myGift, storeProccess } }) => ({ myGift, storeProccess });
const mapDispatchToProps = dispatch => bindActionCreators(Actions, dispatch);

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(Mygift);
