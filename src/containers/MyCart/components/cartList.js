/* eslint-disable jsx-a11y/click-events-have-key-events */
/**
 *
 * Card List
 *
 */

import React, {
  memo, useEffect, useState, useRef
} from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose, bindActionCreators } from 'redux';
import * as Actions from '../actions';
import Utils from '../../../utils/common';
import Loader from '../../../components/Loader';

function CartList({
  getCart, cartData, inProcess, removeCart, updateProdItem
}) {
  const checkBoxRef = useRef(null);
  const [productList, setProductList] = useState([]);
  const [count, setCount] = useState({});

  useEffect(() => {
    if (Utils.isUndefinedOrNullOrEmptyObject(cartData)) {
      getCart();
    }
  }, []);

  const checkboxCheck = (event) => {
    const arrData = Utils.deepCopy(productList);
    if (!Utils.isUndefinedOrNullOrEmptyList(event.target.value) && event.target.checked) {
      if (arrData.includes(event.target.value)) {
        const index = arrData.indexOf(event.target.value);
        arrData.splice(index, 1);
      } else {
        arrData.push(event.target.value);
      }
    }
    if (!Utils.isUndefinedOrNullOrEmptyList(event.target.value) && !event.target.checked) {
      const index = arrData.indexOf(event.target.value);
      arrData.splice(index, 1);
    }
    setProductList(arrData);
  };

  const decreament = (id) => {
    if (count[id] > 1) {
      const countDec = Utils.deepCopy(count);
      countDec[id] = Number(countDec[id]) - 1;
      setCount(countDec);
    }
  };

  const increament = (id) => {
    const countDec = Utils.deepCopy(count);
    countDec[id] = Number(!Utils.isUndefinedOrNullOrEmpty(countDec[id]) ? countDec[id] : 1) + 1;
    setCount(countDec);
  };

  const getCardsList = () => {
    if (!Utils.isUndefinedOrNullOrEmptyObject(cartData)) {
      const { productDetail } = cartData;
      const countObj = Utils.deepCopy(count);
      if (!Utils.isUndefinedOrNullOrEmptyList(productDetail)) {
        return productDetail.map((item, index) => {
          const keys = `keys-index-${index}`;
          countObj[`${item._id}-count`] = 1;
          return (
            <tr key={keys}>
              <td>
                <div className="mycart-ceakbox">
                  <input type="checkbox" name="cheakbox-mycart" value={`${item._id}|${item.priceSale}`} onChange={checkboxCheck} checked={productList.includes(`${item._id}|${item.priceSale}`)} />
                </div>
              </td>
              <td>
                <div className="mycart-table-img"><img src={item.featuredImages[0].featuredImage} alt="" /></div>
              </td>
              <td>
                <div className="mycart-table-remove">
                  <h4>{item.displayName}</h4>
                  <p>
                    $
                    {Utils.convertCurrency(Utils.getRoundOfValue(item.priceSale, 2))}
                  </p>
                  <p><button type="button" className="btn-mycart-remove button default" onClick={() => { removeCart(item._id); }}>Remove</button></p>
                </div>
              </td>
              <td>
                <div className="mycart-table-inc-dec-btn">
                  <span type="button" className="qtyminus decriment-btn" onClick={() => decreament(`${item._id}-count`)}>-</span>
                  <span className="count">
                    {!Utils.isUndefinedOrNullOrEmpty(count[`${item._id}-count`]) ? count[`${item._id}-count`] : 1 }
                  </span>
                  <span type="button" className="qtyplus incriment-btm" onClick={() => increament(`${item._id}-count`)}>+</span>
                </div>
              </td>
              <td>
                <div className="mycart-table-total-price">
                  <p>
                    $
                    {Utils.convertCurrency(Utils.getRoundOfValue(Number(!Utils.isUndefinedOrNullOrEmpty(count[`${item._id}-count`]) ? count[`${item._id}-count`] : 1) * Number(item.priceSale), 2)) }
                    {/* {Number(!Utils.isUndefinedOrNullOrEmpty(count[`${item._id}-count`]) ? count[`${item._id}-count`] : 1) * Number(item.priceSale) } */}
                  </p>
                </div>
              </td>
            </tr>
          );
        });
      }
      setCount(countObj);
      return (
        <tr>
          <td className="my-card-table-img-td">
            <span className="alert">No Data Found.</span>
          </td>
        </tr>
      );
    }
    return null;
  };

  const prosideOrder = (step) => {
    if (Utils.isUndefinedOrNullOrEmptyList(productList)) {
      return;
    }
    const { productDetail } = cartData;
    const placeOrderItem = [];
    productList.forEach((item) => {
      const objData = {};
      const splitArra = item.split('|');
      const prodObj = productDetail.filter(val => val._id === splitArra[0]);
      if (Utils.isUndefinedOrNullOrEmptyObject(prodObj[0])) {
        return;
      }
      let quantity = 1;
      if (!Utils.isUndefinedOrNullOrEmpty(count[`${splitArra[0]}-count`])) {
        quantity = count[`${splitArra[0]}-count`];
      }
      objData.quantity = quantity;
      objData.price = Number(prodObj[0].price) * Number(quantity);
      objData.featuredImages = prodObj[0].featuredImages[0].featuredImage;
      objData.sellerId = prodObj[0].owner.userId;
      objData.title = prodObj[0].title;
      objData.productId = prodObj[0]._id;
      objData.currency = 'S$';
      objData.description = prodObj[0].description;
      placeOrderItem.push(objData);
    });
    updateProdItem(placeOrderItem, step, productList, count);
  };

  const getContent = () => (
    <table className="uk-table uk-table-responsive uk-table-divider uk-table-middle mycart-table">
      <tbody ref={checkBoxRef}>
        {getCardsList()}
      </tbody>
    </table>

  );

  const placeOrder = () => (
    <div className="btn-mycart-payment">
      <button type="button" className=" button default " onClick={() => { prosideOrder(2); }}>Place Order</button>
    </div>
  );

  return (
    <>
      <div className="m-cart-box">
        <h2> My Cart </h2>
        <div className="uk-grid dataWrap">
          <div className="uk-width-1-1">
            <div className="my-cart-box">
              <div className="uk-grid">
                <div className="uk-width-1-1">
                  <div className="my-card-box">
                    {getContent()}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Loader inProcess={inProcess} />
      {!Utils.isUndefinedOrNullOrEmptyList(productList) && placeOrder()}
    </>
  );
}

CartList.propTypes = {
  getCart: PropTypes.func.isRequired,
  cartData: PropTypes.object.isRequired,
  inProcess: PropTypes.bool.isRequired,
  removeCart: PropTypes.func.isRequired,
  updateProdItem: PropTypes.func.isRequired,
};

const mapStateToProps = ({ carts: { cartData, inProcess } }) => ({ cartData, inProcess });
const mapDispatchToProps = dispatch => bindActionCreators(Actions, dispatch);

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(CartList);
