/* eslint-disable jsx-a11y/click-events-have-key-events */
/**
 *
 * Product
 *
 */

import React, { memo, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose, bindActionCreators } from 'redux';
import Utils from '../../../utils/common';
import * as Actions from '../actions';
import Navigation from '../../../utils/navigation';

function Product({
  getProductData, productData
}) {
  useEffect(() => {
    if (Utils.isUndefinedOrNullOrEmptyObject(productData)) {
      getProductData();
    }
  }, []);

  const getContent = () => {
    if (Utils.isUndefinedOrNullOrEmptyObject(productData)) {
      return null;
    }

    const { productDetail } = productData;
    if (Utils.isUndefinedOrNullOrEmptyObject(productDetail)) {
      return null;
    }
    return productDetail.map((item, index) => {
      const keys = `${index}-keys`;
      const date = new Date(item.createdAt);
      const ticks = date.getTime();

      return (
        <div key={keys} className="productElementWrap" onClick={() => Navigation.push(`/sh/airvtingweb/product-details/${item._id}`)}>
          <span>
            <div className="product-box productWrap">
              <img src={!Utils.isUndefinedOrNullOrEmptyList(item.featuredImages) && item.featuredImages[0].featuredImage} alt="" />
              <div className="product-text">
                <h3 className="product-title">{item.title}</h3>
                <span className="like-icon">
                  <i className="fa fa-heart" aria-hidden="true" />
                </span>
                <p className="product-price">
                  $
                  {item.priceSale}
                </p>
                <p className="time-ago">
                  <i className="fa fa-clock-o" aria-hidden="true" />
                  <span>
                    {' '}
                    {Utils.formatDate(ticks)}
                  </span>
                </p>
              </div>
            </div>
          </span>
        </div>
      );
    });
  };

  return (
    <div className="sections-small">
      <div className="uk-child-width-1-4@m uk-child-width-1-3@s uk-grid">
        {getContent()}
      </div>
    </div>
  );
}

Product.propTypes = {
  productData: PropTypes.object.isRequired,
  getProductData: PropTypes.func.isRequired,
};


const mapStateToProps = ({ explore: { productData } }) => ({ productData });
const mapDispatchToProps = dispatch => bindActionCreators(Actions, dispatch);

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(Product);
