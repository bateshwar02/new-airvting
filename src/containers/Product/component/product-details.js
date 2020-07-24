/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { memo, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose, bindActionCreators } from 'redux';
import Utils from '../../../utils/common';
import * as Actions from '../actions';
import Loader from '../../../components/Loader';
import Header from '../../../components/Header';
import Sidebar from '../../../components/Sidebar';
import Footer from '../../../components/Footer';
// import RelatedProduct from './relatedProduct';
// import Navigation from '../../../utils/navigation';

function ProductDetails({
  getProductDetails, inProcess, productDetails, match, addToCart
}) {
  const [productImg, setProdImg] = useState('');
  const [count, setCount] = useState(1);

  useEffect(() => {
    if (Utils.isUndefinedOrNullOrEmptyObject(productDetails)) {
      const { id } = match.params;
      if (!Utils.isUndefinedOrNullOrEmpty(id)) {
        getProductDetails(id);
      }
    }
  }, [productDetails]);

  const imgaeList = data => data.map((item, index) => {
    const key = `key-img-${index}`;
    return (
      <li key={key} onClick={() => setProdImg(item.featuredImage)}><img src={item.featuredImage} alt="" /></li>
    );
  });

  const addToCartProduct = (id) => {
    const objData = {};
    objData.products = [{ productId: id }];
    addToCart(objData);
  };

  const decreament = () => {
    if (count > 1) {
      setCount(Number(count) - 1);
    }
  };

  const increament = () => {
    setCount(Number(!Utils.isUndefinedOrNullOrEmpty(count) ? count : 1) + 1);
  };

  const getDetails = () => {
    if (Utils.isUndefinedOrNullOrEmptyObject(productDetails)) {
      return null;
    }

    return (
      <div className="uk-grid">
        <div className="left-side-col uk-width-1-2@m">
          <div className="store-inner-img">
            <div className=" relative-stroe-ineer-img">
              <ul>
                {imgaeList(productDetails.featuredImages)}
              </ul>
            </div>
            <div className="relative-stroe-ineer-main-img"><img style={{ height: '550px' }} src={!Utils.isUndefinedOrNullOrEmpty(productImg) ? productImg : productDetails.featuredImages[0].featuredImage} alt="" /></div>
          </div>
        </div>
        <div className="right-side-col uk-width-1-2@m">
          <div className="store-inner-text-box">
            <h3 className="product-title">{productDetails.title}</h3>
            <span>{!Utils.isUndefinedOrNullOrEmptyList(productDetails.productCategories) && productDetails.productCategories[0].title}</span>
            <div className="store-inner-price">
              {
                (!Utils.isUndefinedOrNullOrEmpty(productDetails.price) && productDetails.discount !== 0) && (
                <span className="discount-price">
                  <i className="icon-line-awesome-tag" />
                  $
                  {productDetails.price}
                </span>
                )

              }

              <span className="sale-price">
                $
                {productDetails.priceSale}
              </span>
            </div>
            {/* <div className="store-inner-stars">
              <h4>
                Reviews
                <span>( 210 )</span>
              </h4>
              <ul>
                <li><i className="icon-line-awesome-star" /></li>
                <li><i className="icon-line-awesome-star" /></li>
                <li><i className="icon-line-awesome-star" /></li>
                <li><i className="icon-line-awesome-star" /></li>
                <li><i className="icon-material-baseline-star-border" /></li>
              </ul>
            </div> */}
            <div className="store-inner-productdecription">
              <p>
                {productDetails.description}
              </p>
            </div>
            <div className="store-inner-addcart-box">
              <span className="inc-dec-box">
                <div className="mycart-table-inc-dec-btn">
                  <span type="button" className="qtyminus decriment-btn" onClick={decreament}>-</span>
                  <span className="count">
                    {!Utils.isUndefinedOrNullOrEmpty(count) ? count : 1 }
                  </span>
                  <span type="button" className="qtyplus incriment-btm" onClick={increament}>+</span>
                </div>
              </span>
              <span className="addToCart" onClick={() => { addToCartProduct(productDetails._id); }}>
                <button className="btn-addcart button default " type="button">
                  <i className="icon-line-awesome-cart-plus" />
                  {' '}
                  Add To Cart
                </button>
              </span>
              <span className="store-inner-like">
                <i className="icon-line-awesome-heart" />
                {' '}
                {`${productDetails.totalLike} Like`}
              </span>
            </div>
          </div>
        </div>

        <div className="uk-width-1-1@m">
          <div className=" uk-container-center">
            <h3 className="uk-margin-top">Description</h3>
            <p>
              {' '}
              {productDetails.description}
            </p>
          </div>
        </div>

        {/* <div className="video-grid-slider mt-4" uk-slider="finite: true">
          <div className="grid-slider-header">
            <div>
              <h3> Related Products</h3>
            </div>
            <div className="grid-slider-header-link">
              <div className="btn-arrow-slider">
                <a href="#" className="btn-arrow-slides" uk-slider-item="previous">
                  <span className="arrow-left" />
                </a>
                <a href="#" className="btn-arrow-slides" uk-slider-item="next">
                  <span className="arrow-right" />
                </a>
              </div>
            </div>
          </div>
          <RelatedProduct />
        </div> */}
        <hr className="m-0" />
      </div>
    );
  };

  return (
    <>
      <Header />
      <Sidebar />
      <div className="main_content">
        <div className="main_content_inner">
          <div className="product-details-box" />
          {getDetails()}
        </div>
        <Loader inProcess={inProcess} />
        <Footer />
      </div>
    </>
  );
}

ProductDetails.propTypes = {
  productDetails: PropTypes.object.isRequired,
  getProductDetails: PropTypes.func.isRequired,
  inProcess: PropTypes.bool.isRequired,
  match: PropTypes.object.isRequired,
  addToCart: PropTypes.func.isRequired,
};


const mapStateToProps = ({ product: { productDetails, inProcess } }) => ({ productDetails, inProcess });
const mapDispatchToProps = dispatch => bindActionCreators(Actions, dispatch);

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(ProductDetails);
