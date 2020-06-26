/* eslint-disable jsx-a11y/click-events-have-key-events */
/**
 *
 * Product
 *
 */

import React, { memo, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import Utils from '../../../utils/common';
import ApiService from '../api';
// import Navigation from '../../../utils/navigation';

function Product({ id }) {
  const [childData, setChildData] = useState([]);
  const [isProcess, setIsProcess] = useState(false);

  useEffect(() => {
    if (Utils.isUndefinedOrNullOrEmptyList(childData)) {
      ApiService.getDataByCategory(id).then((response) => {
        if (response.success) {
          setChildData(response.data.postDetail);
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
  id: PropTypes.string.isRequired,
};

export default memo(Product);
