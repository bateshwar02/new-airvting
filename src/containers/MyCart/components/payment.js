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

function Payment({ cartData, productList, count }) {
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
                    2812
                  </p>
                </td>
                <td className="mycart-tokan-img">
                  <img src="assets\images\store-img\recycal.png" alt="" />
                </td>
                <td className="mycart-tokan-price">
                  <p>Price</p>
                  <p>$250.00</p>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div>
          <label htmlFor="token">
            <input id="token" type="checkbox" name="mycart-tokan-cheakbox" value={1} onChange={checkboxCheck} checked={token !== 0} />
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
                    {subTotal}
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
                    {Number(subTotal) - Number(token)}
                  </span>
                </td>
              </tr>
            </tbody>
          </table>
          <a href="my-card.php">
            <div className="btn-mycart-payment">
              <button type="button" className=" button default ">Payment</button>
            </div>
          </a>
        </div>
      </div>
    </div>
  );
}

Payment.propTypes = {
  cartData: PropTypes.object.isRequired,
  productList: PropTypes.array.isRequired,
  count: PropTypes.object.isRequired,
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
)(Payment);
