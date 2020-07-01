/* eslint-disable jsx-a11y/click-events-have-key-events */
/**
 *
 * Product
 *
 */

import React, { memo, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
// import classnames from 'classnames';
import Utils from '../../../utils/common';
import ApiService from '../api';
import Navigation from '../../../utils/navigation';

function Product({ id, productLikedAction }) {
  const [childData, setChildData] = useState([]);
  const [isProcess, setIsProcess] = useState(false);

  useEffect(() => {
    if (Utils.isUndefinedOrNullOrEmptyList(childData)) {
      ApiService.getProductCategoryData(id).then((response) => {
        if (response.success) {
          setChildData(response.data.productDetail);
          setIsProcess(true);
        }
      }).catch((error) => {
        setIsProcess(true);
        console.log(error);
      });
    }
  }, []);
  const getContent = () => {
    if (Utils.isUndefinedOrNullOrEmptyList(childData) && !isProcess) {
      return (
        <div className="loaderWrapper">
          <div className="customLoader" />
        </div>
      );
    }

    return childData.map((item, index) => {
      const keys = `${index}-${item.productCategories[0].categoryId}`;
      const date = new Date(item.createdAt);
      const ticks = date.getTime();

      return (
        <div key={keys} className="productElementWrap" onClick={() => Navigation.push(`/sh/airvtingweb/product-details/${item._id}`)}>
          <span>
            <div className="product-box productWrap">
              <img src={!Utils.isUndefinedOrNullOrEmptyList(item.featuredImages) ? item.featuredImages[0].featuredImage : 'assets/images/default.jpg'} alt="" />
              <div className="product-text">
                <h3 className="product-title">{item.title}</h3>
                <span className="like-icon" onClick={() => productLikedAction(item._id)}>
                  <i className="fa fa-heart" aria-hidden="true" />
                </span>
                <p className="product-price">
                  $
                  {Utils.getRoundOfValue(item.priceSale, 2)}
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
    <>
      {getContent()}
    </>
  );
}

Product.propTypes = {
  id: PropTypes.string.isRequired,
  productLikedAction: PropTypes.func.isRequired,
};

export default memo(Product);
