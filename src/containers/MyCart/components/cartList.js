/* eslint-disable jsx-a11y/click-events-have-key-events */
/**
 *
 * Card List
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
import Loader from '../../../components/Loader';
import Payment from './payment';

function CartList({
  getCart, cartData, inProcess
}) {
  const [productList, setProductList] = useState([]);
  const [count, setCount] = useState({});

  useEffect(() => {
    if (Utils.isUndefinedOrNullOrEmptyObject(cartData)) {
      getCart();
    }
  }, []);

  const checkboxCheck = (event) => {
    const arrData = [];
    if (!Utils.isUndefinedOrNullOrEmptyList(event.target.value) && event.target.checked) {
      arrData.push(event.target.value);
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
                    {item.priceSale}
                  </p>
                  <p><button type="button" className="btn-mycart-remove button default">Remove</button></p>
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
                    {Number(!Utils.isUndefinedOrNullOrEmpty(count[`${item._id}-count`]) ? count[`${item._id}-count`] : 1) * Number(item.priceSale) }
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


  const getContent = () => (
    <table className="uk-table uk-table-responsive uk-table-divider uk-table-middle mycart-table">
      <tbody>
        {getCardsList()}
      </tbody>
    </table>

  );

  return (
    <>
      <div className="uk-grid">
        <div className="uk-width-1-1">
          <div className="my-card-box">
            {getContent()}
          </div>
        </div>
        <Loader inProcess={inProcess} />
      </div>
      {!Utils.isUndefinedOrNullOrEmptyList(productList) && <Payment productList={productList} count={count} cartData={cartData} />}
    </>
  );
}

CartList.propTypes = {
  getCart: PropTypes.func.isRequired,
  cartData: PropTypes.object.isRequired,
  inProcess: PropTypes.bool.isRequired,
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
