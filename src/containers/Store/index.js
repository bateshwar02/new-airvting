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

export function Store() {
  const getStoreContent = () => (
    <div className="main_content">
      <div className="main_content_inner">
        <div className="store-box-div">
          <h3> Products </h3>
          <div className="add-stor-itme-box">
            <span href="" uk-toggle="target: #modal-close-default">
              <span className="add-card-btn  button default">+</span>
              {' '}
              Add New Product
            </span>
            <div id="modal-close-default uk-modal">
              <div className="uk-modal-dialog uk-modal-body">
                <button className="uk-modal-close-default uk-close" type="button" />
                <h2 className="uk-modal-title">Add Items</h2>
                <form className="uk-form card-box">
                  <fieldset className="message-filedset">
                    <div className="uk-form-row">
                      <div className="add-itam-upload-input-img">
                        <img src="assets\images\store-img\t1.jpg" alt="" />
                        <i className="icon-line-awesome-close" />
                      </div>
                      <label>
                        <div className="add-itam-upload-input">
                          <input type="file" />
                        </div>
                      </label>
                    </div>
                  </fieldset>
                  <fieldset className="message-filedset">
                    <div className="uk-form-row">
                      <label>
                        Title
                        {' '}
                        <input type="text" />
                      </label>
                    </div>
                  </fieldset>
                  <fieldset className="message-filedset">
                    <div className="uk-form-row">
                      <label>
                        Price
                        <input type="text" />
                      </label>
                    </div>
                  </fieldset>
                  <fieldset className="message-filedset">
                    <div className="uk-form-row">
                      <label>
                        Category
                        <select>
                          <option>Select Category</option>
                          <option>Select Category</option>
                          <option>Select Category</option>
                        </select>
                      </label>
                    </div>
                  </fieldset>
                  <fieldset className="message-filedset">
                    <div className="uk-form-row">
                      <label>
                        Add New Category
                        <input type="text" name="AddNewCategory" />
                      </label>
                    </div>
                  </fieldset>
                  <fieldset className="message-filedset">
                    <div className="uk-form-row">
                      <label>
                        Discount Timer
                        <div className=" add-item-dis-time">
                          <input type="date" />
                        </div>
                        <div className=" add-item-dis-time">
                          <input type="date" />
                        </div>
                      </label>
                    </div>
                  </fieldset>
                  <fieldset className="message-filedset">
                    <div className="uk-form-row">
                      <label>
                        Discount Amount
                        <input type="text" />
                      </label>
                    </div>
                  </fieldset>

                  <fieldset className="message-filedset">
                    <div className="uk-form-row">
                      <label>
                        Description
                        <textarea className="stor-item-textarea" />
                      </label>
                    </div>
                  </fieldset>
                  <button type="button" className="btn-mycart-remove button default">
                    Submit
                  </button>
                </form>
              </div>
            </div>
          </div>

          <div className="sections-small">
            <div className="uk-child-width-1-4@m uk-child-width-1-3@s uk-grid">
              <div>
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

              <div>
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

              <div>
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

              <div>
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

              <div>
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

              <div>
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

              <div>
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
          </div>
        </div>
      </div>
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

Store.propTypes = {};


const mapStateToProps = ({ store }) => ({ store });
const mapDispatchToProps = dispatch => bindActionCreators(Actions, dispatch);

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(Store);
