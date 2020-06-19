/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/label-has-for */
/**
 *
 * Store
 *
 */

import React, { memo } from 'react';
// import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose, bindActionCreators } from 'redux';
import * as Actions from './actions';
import Header from '../../components/Header';
import Sidebar from '../../components/Sidebar';
import Footer from '../../components/Footer';

export function MyCarts() {
  const getStoreContent = () => (
    <div className="main_content">
      <div className="main_content_inner">
        <div className="m-cart-box">
          <h2> MY CART </h2>
          <div uk-grid>
            <div className="uk-width-1-1">
              <div className="my-cart-box">
                <table className="uk-table uk-table-responsive uk-table-divider uk-table-middle mycart-table">
                  <tbody>
                    <tr>
                      <td>
                        <div className="mycart-ceakbox"><input type="checkbox" name="cheakbox-mycart" /></div>
                      </td>
                      <td>
                        <div className="mycart-table-img"><img src="assets\images\store-img\t1.jpg" alt="" /></div>
                      </td>
                      <td>
                        <div className="mycart-table-remove">
                          <h4>Navy-Off-Shoulder</h4>
                          <p>$142.50</p>
                          <p><button type="button" className="btn-mycart-remove button default ">Remove</button></p>
                        </div>
                      </td>
                      <td>
                        <div className="mycart-table-inc-dec-btn">
                          <form id="myform" method="POST" action="#">
                            <input type="button" value="-" className="qtyminus decriment-btn" field="quantity" />
                            <input type="text" name="quantity" value="0" className="qty inc-dec-number" />
                            <input type="button" value="+" className="qtyplus incriment-btm" field="quantity" />
                          </form>

                        </div>
                      </td>
                      <td>
                        <div className="mycart-table-total-price">
                          <p>$142.50</p>
                        </div>
                      </td>
                    </tr>

                    <tr>
                      <td>
                        <div className="mycart-ceakbox"><input type="checkbox" name="cheakbox-mycart" /></div>
                      </td>
                      <td>
                        <div className="mycart-table-img"><img src="assets\images\store-img\t1.jpg" alt="" /></div>
                      </td>
                      <td>
                        <div className="mycart-table-remove">
                          <h4>Navy-Off-Shoulder</h4>
                          <p>$142.50</p>
                          <p><button type="button" className="btn-mycart-remove button default ">Remove</button></p>
                        </div>
                      </td>
                      <td>
                        <div className="mycart-table-inc-dec-btn">
                          <form id="myform" method="POST" action="#">
                            <input type="button" value="-" className="qtyminus decriment-btn" field="quantity" />
                            <input type="text" name="quantity" value="0" className="qty inc-dec-number" />
                            <input type="button" value="+" className="qtyplus incriment-btm" field="quantity" />
                          </form>
                        </div>
                      </td>
                      <td>
                        <div className="mycart-table-total-price">
                          <p>$142.50</p>
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <div className="mycart-ceakbox"><input type="checkbox" name="cheakbox-mycart" /></div>
                      </td>
                      <td>
                        <div className="mycart-table-img"><img src="assets\images\store-img\t1.jpg" alt="" /></div>
                      </td>
                      <td>
                        <div className="mycart-table-remove">
                          <h4>Navy-Off-Shoulder</h4>
                          <p>$142.50</p>
                          <p><button type="button" className="btn-mycart-remove button default ">Remove</button></p>
                        </div>
                      </td>
                      <td>
                        <div className="mycart-table-inc-dec-btn">
                          <form id="myform" method="POST" action="#">
                            <input type="button" value="-" className="qtyminus decriment-btn" field="quantity" />
                            <input type="text" name="quantity" value="0" className="qty inc-dec-number" />
                            <input type="button" value="+" className="qtyplus incriment-btm" field="quantity" />
                          </form>
                        </div>
                      </td>
                      <td>
                        <div className="mycart-table-total-price">
                          <p>$142.50</p>
                        </div>
                      </td>
                    </tr>
                  </tbody>
                </table>

                <div uk-grid>
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
                      <label>
                        <input type="checkbox" name="mycart-tokan-cheakbox" />
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
                            <td><span>$427.50</span></td>
                          </tr>
                          <tr className="mycart-subtotal-token">
                            <td><p>Token</p></td>
                            <td><span>-$252.00</span></td>
                          </tr>
                          <tr className="mycart-subtotal-total">
                            <td><p>Total</p></td>
                            <td><span>$175.50</span></td>
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
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );

  return (
    <div id="wrapper">
      <Sidebar />
      <Header />
      {getStoreContent()}
    </div>
  );
}

MyCarts.propTypes = {};


const mapStateToProps = ({ token }) => ({ token });
const mapDispatchToProps = dispatch => bindActionCreators(Actions, dispatch);

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(MyCarts);
