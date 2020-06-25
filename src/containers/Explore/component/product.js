/* eslint-disable jsx-a11y/click-events-have-key-events */
/**
 *
 * About
 *
 */

import React, { memo, useEffect } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { connect } from 'react-redux';
import { compose, bindActionCreators } from 'redux';
import Utils from '../../../utils/common';
import * as Actions from '../actions';
// import Navigation from '../../../utils/navigation';

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
        <div key={keys} classNames="productElementWrap">
          <a href="store-inner.php">
            <div className="product-box productWrap">
              <img src={item.featuredImages[0].featuredImage} alt="" />
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
                  <i className={classnames('fa fa-clock-o', { red: item.isLike })} aria-hidden="true" />
                  <span>{Utils.formatDate(ticks)}</span>
                </p>
              </div>
            </div>
          </a>
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
