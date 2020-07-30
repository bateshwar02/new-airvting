/* eslint-disable jsx-a11y/no-redundant-roles */
/* eslint-disable consistent-return */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/**
 *
 * Card Payment
 *
 */

import React, {
  memo, useEffect, useState
} from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose, bindActionCreators } from 'redux';
import * as Actions from '../actions';
import Utils from '../../../utils/common';

function Payment({
  cartData, productList, count, checkoutProd, userData, checkOutProduct, inProcess
}) {
  const [token, setToken] = useState(0);
  const [subTotal, setSubTotal] = useState(0);

  const checkboxCheck = (event) => {
    setToken(event.target.value);
  };

  useEffect(() => {
    if (!Utils.isUndefinedOrNullOrEmptyList(productList)) {
      const arrTot = [];
      productList.forEach((item) => {
        const spltArr = item.split('|');
        arrTot.push(Number(spltArr[1]) * Number(!Utils.isUndefinedOrNullOrEmpty(count[`${spltArr[0]}-count`]) ? count[`${spltArr[0]}-count`] : 1));
      });
      const total = arrTot.reduce((a, b) => a + b, 0);
      setSubTotal(total);
    }
  }, [cartData, productList, count]);


  const getCardsList = () => {
    if (!Utils.isUndefinedOrNullOrEmptyList(checkoutProd)) {
      return checkoutProd.map((item, index) => {
        const keys = `keys-index-${index}`;
        return (
          <tr key={keys}>
            <td>
              <div className="mycart-table-img"><img src={item.featuredImages} alt="" /></div>
            </td>
            <td>
              <div className="mycart-table-remove">
                <h4>{item.title}</h4>
                <p>
                  $
                  {item.price}
                </p>
              </div>
            </td>
            <td>
              <div className="mycart-table-inc-dec-btn">
                <span className="quantity">{item.quantity}</span>
              </div>
            </td>
          </tr>
        );
      });
    }

    return (
      <tr>
        <td className="my-card-table-img-td">
          <span className="alert">No Data Found.</span>
        </td>
      </tr>
    );
  };

  const getContent = () => (
    <table className="uk-table uk-table-responsive uk-table-divider uk-table-middle mycart-table">
      <tbody>
        {getCardsList()}
      </tbody>
    </table>

  );

  const checkOutData = () => {
    const objectData = {};
    // const { PaymentMethodIdDefault } = userData;
    let totalQuant = 0;
    const quantArr = checkoutProd.map(item => item.quantity);
    if (!Utils.isUndefinedOrNullOrEmptyList(quantArr)) {
      totalQuant = quantArr.reduce((a, b) => a + b, 0);
    }
    // objectData.paymentMethodId = PaymentMethodIdDefault;
    objectData.products = checkoutProd;
    objectData.totalPrice = (Number(subTotal) - Number(token));
    objectData.totalQuantity = totalQuant;
    objectData.useAirToken = token;
    checkOutProduct(objectData);
  };

  const paymentContainer = () => {
    if (Utils.isUndefinedOrNullOrEmptyObject(userData)) {
      return;
    }

    const { userDetail } = userData;
    return (
      <div className="uk-grid">
        <div className="uk-width-1-2">
          <div className="mycart-tokan-box">
            <table className="uk-table uk-table-responsive uk-table-divider uk-table-middle mycart-token-table">
              <tbody>
                <tr className="mycart-total-token">
                  <td className="mycart-your-token">
                    <p>Your Token</p>
                    <p>
                      <i className="icon-brand-bitcoin" />
                      {' '}
                      {userDetail.airToken}
                    </p>
                  </td>
                  <td className="mycart-tokan-img">
                    <img src="assets\images\store-img\recycal.png" alt="" />
                  </td>
                  {/* <td className="mycart-tokan-price">
                    <p>Price</p>
                    <p>$250.00</p>
                  </td> */}
                </tr>
              </tbody>
            </table>
          </div>
          <div>
            <label htmlFor="token">
              <input id="token" type="checkbox" name="mycart-tokan-cheakbox" value={userDetail.airToken} onChange={checkboxCheck} checked={token == userDetail.airToken} />
              Do you want to use your token?
            </label>
          </div>

        </div>
        <div className="uk-width-1-2">
          <div className="mycart-subtotal-box">
            <table className="uk-table uk-table-responsive uk-table-divider uk-table-middle mycart-sub-total-table">

              <tbody>
                <tr className="mycart-subtotal-price">
                  <td><p>Sub Total</p></td>
                  <td>
                    <span>
                      $
                      {Utils.getRoundOfValue(subTotal, 2)}
                    </span>
                  </td>
                </tr>
                <tr className="mycart-subtotal-token">
                  {token !== 0 && (
                  <>
                    <td><p>Token</p></td>
                    <td>
                      <span>
                        -$
                        {token}
                      </span>
                    </td>
                  </>
                  )}

                </tr>
                <tr className="mycart-subtotal-total">
                  <td><p>Total</p></td>
                  <td>
                    <span>
                      $
                      {Utils.getRoundOfValue((Number(subTotal) - Number(token)), 2)}
                    </span>
                  </td>
                </tr>
              </tbody>
            </table>
            <span>
              <div className="btn-mycart-payment">
                <button type="button" className=" button default " onClick={checkOutData}>
                  Placed Order
                  {inProcess && (
                  <div className="loaderWrapper">
                    <div className="customLoader" />
                  </div>
                  )}
                </button>
              </div>
            </span>
          </div>
        </div>
      </div>
    );
  };

  return (
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
      {paymentContainer()}
    </div>

  );
}

Payment.propTypes = {
  cartData: PropTypes.object.isRequired,
  productList: PropTypes.array.isRequired,
  count: PropTypes.object.isRequired,
  checkoutProd: PropTypes.array.isRequired,
  userData: PropTypes.object.isRequired,
  checkOutProduct: PropTypes.func.isRequired,
  inProcess: PropTypes.bool.isRequired,
};

const mapStateToProps = ({
  carts: {
    cartData, inProcess, productList, count, checkoutProd
  }, userDetails: { userData }
}) => ({
  cartData, inProcess, productList, count, checkoutProd, userData
});
const mapDispatchToProps = dispatch => bindActionCreators(Actions, dispatch);

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(Payment);
