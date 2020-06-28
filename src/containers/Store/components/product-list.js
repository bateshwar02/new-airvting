/**
 *
 * Product List
 *
 */

import React, { memo } from 'react';
// import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose, bindActionCreators } from 'redux';
// import Utils from '../../../utils/common';
import * as Actions from '../actions';

function ProductList() {
//   useEffect(() => {
//     if (Utils.isUndefinedOrNullOrEmptyObject(aitTokenList)) {
//       getAirToken();
//     }
//   }, [aitTokenList]);


  const getContent = () => (
    <div className="uk-child-width-1-4@m uk-child-width-1-3@s uk-grid">
      <div className="prodWrap">
        <a href="store-inner.php">
          <div className="product-box">
            <img src="assets\images\store-img\t1.jpg" alt="" />
            <div className="product-text">
              <h3 className="product-title">Navy-off-Shoulder</h3>
              <span className="like-icon">
                <i className="fa fa-heart" aria-hidden="true" />
              </span>
              <p className="product-price">$142.50</p>
              <p className="time-ago">
                <i className="fa fa-clock-o" aria-hidden="true" />
                <span>2 days ago</span>
              </p>
            </div>
          </div>
        </a>
      </div>

      <div className="prodWrap">
        <a href="store-inner.php">
          <div className="product-box">
            <img src="assets\images\store-img\t1.jpg" alt="" />
            <div className="product-text">
              <h3 className="product-title">Navy-off-Shoulder</h3>
              <span className="like-icon">
                <i className="fa fa-heart" aria-hidden="true" />
              </span>
              <p className="product-price">$142.50</p>
              <p className="time-ago">
                <i className="fa fa-clock-o" aria-hidden="true" />
                <span>2 days ago</span>
              </p>
            </div>
          </div>
        </a>
      </div>

      <div className="prodWrap">
        <a href="store-inner.php">
          <div className="product-box">
            <img src="assets\images\store-img\t1.jpg" alt="" />
            <div className="product-text">
              <h3 className="product-title">Navy-off-Shoulder</h3>
              <span className="like-icon">
                <i className="fa fa-heart" aria-hidden="true" />
              </span>
              <p className="product-price">$142.50</p>
              <p className="time-ago">
                <i className="fa fa-clock-o" aria-hidden="true" />
                <span>2 days ago</span>
              </p>
            </div>
          </div>
        </a>
      </div>

      <div className="prodWrap">
        <a href="store-inner.php">
          <div className="product-box">
            <img src="assets\images\store-img\t1.jpg" alt="" />
            <div className="product-text">
              <h3 className="product-title">Navy-off-Shoulder</h3>
              <span className="like-icon">
                <i className="fa fa-heart" aria-hidden="true" />
              </span>
              <p className="product-price">$142.50</p>
              <p className="time-ago">
                <i className="fa fa-clock-o" aria-hidden="true" />
                <span>2 days ago</span>
              </p>
            </div>
          </div>
        </a>
      </div>

      <div className="prodWrap">
        <a href="store-inner.php">
          <div className="product-box">
            <img src="assets\images\store-img\t1.jpg" alt="" />
            <div className="product-text">
              <h3 className="product-title">Navy-off-Shoulder</h3>
              <span className="like-icon">
                <i className="fa fa-heart" aria-hidden="true" />
              </span>
              <p className="product-price">$142.50</p>
              <p className="time-ago">
                <i className="fa fa-clock-o" aria-hidden="true" />
                <span>2 days ago</span>
              </p>
            </div>
          </div>
        </a>
      </div>

      <div className="prodWrap">
        <a href="store-inner.php">
          <div className="product-box">
            <img src="assets\images\store-img\t1.jpg" alt="" />
            <div className="product-text">
              <h3 className="product-title">Navy-off-Shoulder</h3>
              <span className="like-icon">
                <i className="fa fa-heart" aria-hidden="true" />
              </span>
              <p className="product-price">$142.50</p>
              <p className="time-ago">
                <i className="fa fa-clock-o" aria-hidden="true" />
                <span>2 days ago</span>
              </p>
            </div>
          </div>
        </a>
      </div>

      <div className="prodWrap">
        <a href="store-inner.php">
          <div className="product-box">
            <img src="assets\images\store-img\t1.jpg" alt="" />
            <div className="product-text">
              <h3 className="product-title">Navy-off-Shoulder</h3>
              <span className="like-icon">
                <i className="fa fa-heart" aria-hidden="true" />
              </span>
              <p className="product-price">$142.50</p>
              <p className="time-ago">
                <i className="fa fa-clock-o" aria-hidden="true" />
                <span>2 days ago</span>
              </p>
            </div>
          </div>
        </a>
      </div>
    </div>
  );

  return (
    <div className="store-box-div">
      <h3> Products </h3>
      <div className="sections-small">
        {getContent()}
      </div>
    </div>
  );
}

// ProductList.propTypes = {
//   aitTokenList: PropTypes.object.isRequired,
//   getAirToken: PropTypes.func.isRequired,
// };


const mapStateToProps = ({ store }) => ({ store });
const mapDispatchToProps = dispatch => bindActionCreators(Actions, dispatch);

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(ProductList);
