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

export function MyCards() {
  const getStoreContent = () => (
    <div classNameName="main_content">
      <div className="main_content_inner ">
        <div className="add-card-main-content">
          <h2> MY CARD </h2>
          <div className="add-card-box">

            <a href="" uk-toggle="target: #modal-close-default">
              <span className="add-card-btn  button default">+</span>
              {' '}
              Add New Card
            </a>

            <div id="modal-close-default" uk-modal>
              <div className="uk-modal-dialog uk-modal-body">
                <button className="uk-modal-close-default" type="button" uk-close />
                <h2 className="uk-modal-title">Cart fill</h2>
                <form className="uk-form card-box">
                  <fieldset className="message-filedset">

                    <div className="uk-form-row">
                      <label>
                        Fill Cart No
                        <input type="text" placeholder=" 1234 1234 1234 1234" />
                      </label>
                    </div>
                  </fieldset>
                  <fieldset className="message-filedset">

                    <div className="uk-form-row">
                      <label>
                        Expiration
                        <input type="text" placeholder=" MM / yyyy" />
                      </label>
                    </div>

                  </fieldset>
                  <fieldset className="message-filedset">

                    <div className="uk-form-row">
                      <label>
                        CVC Code
                        <input type="text" placeholder=" CVC" />
                      </label>
                    </div>

                  </fieldset>
                  <fieldset className="message-filedset">

                    <div className="uk-form-row">
                      <label>
                        Countery
                        <select>
                          <option>Select country</option>
                          <option>Select country</option>
                          <option>Select country</option>
                        </select>

                      </label>
                    </div>

                  </fieldset>
                  <fieldset className="message-filedset">

                    <div className="uk-form-row">
                      <label>
                        Postal code
                        <input type="text" placeholder=" 12345" />
                      </label>
                    </div>

                  </fieldset>

                  <fieldset className="message-filedset">

                    <div className="uk-form-row">
                      <input type="checkbox" style={{ width: '20px' }} />
                      {' '}
                      Save my cart for future purchases
                    </div>

                  </fieldset>
                  <button className="btn-mycart-remove button default ">Payment</button>
                </form>
              </div>
            </div>
          </div>
          <div uk-grid>
            <div className="uk-width-1-1">
              <div className="my-card-box">
                <table className="uk-table uk-table-middle uk-table-justify uk-table-striped my-card-table ">
                  <tbody>
                    <tr>
                      <td className="my-card-table-img-td">
                        <div className="my-card-table-img"><img src="assets\images\my-card-img\stripe.png" alt="" /></div>
                      </td>
                      <td>
                        <div className="my-card-table-detial">
                          <p>Your Account on Stripe is Connected! </p>
                          <p><a href="">View shop Account on Stripe</a></p>
                        </div>
                      </td>
                      <td>
                        <div className="my-card-table-cheak" />
                      </td>
                    </tr>

                    <tr>
                      <td>
                        <div className="my-card-table-img"><img src="assets\images\my-card-img\mastercard.png" alt="" /></div>
                      </td>
                      <td>
                        <div className="my-card-table-detial">
                          <p>MyBizAmex-Corporate</p>
                          <p>xxxx-2982-10/19</p>
                        </div>
                      </td>
                      <td>
                        <div className="my-card-table-cheak"><i className="icon-material-outline-check" /></div>
                      </td>
                    </tr>

                    <tr>
                      <td>
                        <div className="my-card-table-img"><img src="assets\images\my-card-img\Visa.png" alt="" /></div>
                      </td>
                      <td>
                        <div className="my-card-table-detial">
                          <p>My Visa- Personal </p>
                          <p>xxxx-2781-09/20</p>
                        </div>
                      </td>
                      <td>
                        <div className="my-card-table-cheak" />
                      </td>
                    </tr>
                  </tbody>
                </table>

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

MyCards.propTypes = {};


const mapStateToProps = ({ token }) => ({ token });
const mapDispatchToProps = dispatch => bindActionCreators(Actions, dispatch);

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(MyCards);
