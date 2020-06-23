/**
 *
 * Store Gift
 *
 */

import React, { memo, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose, bindActionCreators } from 'redux';
import Utils from '../../../utils/common';
import * as Actions from '../actions';

function Mygift({ storGift, storeGiftData, storeProccess }) {
  useEffect(() => {
    if (Utils.isUndefinedOrNullOrEmptyObject(storGift)) {
      storeGiftData();
    }
  }, []);


  const getContent = () => {
    if (Utils.isUndefinedOrNullOrEmptyObject(storGift)) {
      return null;
    }
    const { giftDetail } = storGift;
    if (Utils.isUndefinedOrNullOrEmptyList(giftDetail)) {
      return (<div className="gifts-icon"> No Data </div>);
    }
    return giftDetail.map((item, index) => {
      const keys = `index-key-${index}`;

      return (
        <div className="gifts-icon" key={keys}>
          <img src={item.featuredImage} alt="" />
          <p>{Utils.capitalize(item.title)}</p>
          {/* <p>
            <i className="icon-brand-bitcoin" />
            {' '}
            15
          </p> */}
        </div>
      );
    });
  };

  return (
    <li>
      {getContent()}
      {storeProccess && (
      <div className="loaderWrapper">
        <div className="customLoader" />
      </div>
      )}
    </li>
  );
}

Mygift.propTypes = {
  storGift: PropTypes.object.isRequired,
  storeGiftData: PropTypes.func.isRequired,
};


const mapStateToProps = ({ detailsVideos: { storGift, storeProccess } }) => ({ storGift, storeProccess });
const mapDispatchToProps = dispatch => bindActionCreators(Actions, dispatch);

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(Mygift);
