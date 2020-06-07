/**
 *
 * Setting
 *
 */

import React, { memo } from 'react';
import { Helmet } from 'react-helmet';
import Header from '../Header';
import Sidebar from '../Sidebar';
import Footer from '../Footer';
import './index.css';

function Setting() {
  const getContent = () => (
    <div className="main_content">
      <div className="bg-gradient-warning uk-height-small uk-position-absolute uk-width-1-1" />
      <div className="main_content_inner">
        <div className="section-small text-center uk-light">
          <h1> account Setting </h1>
        </div>
        <div className="m-auto uk-position-relative  uk-grid">
          <div className="uk-width-1-4@m uk-flex-last@ pl-sm-0">
            <nav
              className="responsive-tab style-3 setting-menu"
              uk-sticky="top:30 ; offset:100; media:@m ;bottom:true; animation: uk-animation-slide-top"
            >
              <h4 className="mb-0 p-3 uk-visible@m"> Setting Navigation </h4>
              <hr className="m-0 uk-visible@m" />
              <ul className="uk-tab-left" uk-tab="connect: #component-tab-left; animation: uk-animation-fade">
                <li className="uk-active">
                  <span className="menuSpan">
                    {' '}
                    <i className="uil-cog" />
                    {' '}
                    General
                    {' '}
                  </span>
                </li>
                <li>
                  <span className="menuSpan">
                    {' '}
                    <i className="uil-unlock-alt" />
                    {' '}
                    Password
                    {' '}
                  </span>
                </li>
                <li>
                  <span className="menuSpan">
                    {' '}
                    <i className="uil-dollar-alt" />
                    {' '}
                    Earning
                  </span>
                </li>
                <li>
                  <span className="menuSpan">
                    {' '}
                    <i className="uil-trash-alt" />
                    {' '}
                    Delete account
                  </span>
                </li>
              </ul>
            </nav>
          </div>

          <div className="uk-width-2-3@m mt-sm-3 pl-sm-0">
            <div className="uk-width-expand@m">
              <ul id="component-tab-left" className="uk-switcher">
                <li>
                  <div className="uk-card-default rounded">
                    <div className="p-3">
                      <h5 className="mb-0"> Contact info </h5>
                    </div>
                    <hr className="m-0" />
                    <form className="uk-child-width-1-2@s uk-grid-small p-4 uk-grid">
                      <div>
                        <h5 className="uk-text-bold mb-2"> First Name </h5>
                        <input type="text" className="uk-input" placeholder="Your name" />
                      </div>
                      <div>
                        <h5 className="uk-text-bold mb-2"> Seccond Name </h5>
                        <input type="text" className="uk-input" placeholder="Your seccond" />
                      </div>
                      <div>
                        <h5 className="uk-text-bold mb-2"> Your email address </h5>
                        <input type="text" className="uk-input" placeholder="eliedaniels@gmail.com" />
                      </div>
                      <div>
                        <h5 className="uk-text-bold mb-2"> Phone </h5>
                        <input type="text" className="uk-input" placeholder="+1 555 623 568 " />
                      </div>
                    </form>

                    <div className="uk-flex uk-flex-right p-4">
                      <button type="button" className="button soft-warning mr-2">
                        Cancle
                      </button>
                      <button type="button" className="button warning">
                        Save Changes
                      </button>
                    </div>
                  </div>

                  <div className="uk-card-default rounded mt-4">
                    <div className="p-3">
                      <h5 className="mb-0"> Billing address </h5>
                    </div>
                    <hr className="m-0" />
                    <form className="uk-child-width-1-2@s uk-grid-small p-4 uk-grid">
                      <div>
                        <h5 className="uk-text-bold mb-2"> Number </h5>
                        <input type="text" className="uk-input" placeholder="23, Block C2 " />
                      </div>
                      <div>
                        <h5 className="uk-text-bold mb-2"> Street </h5>
                        <input type="text" className="uk-input" placeholder="Street Number" />
                      </div>
                      <div>
                        <h5 className="uk-text-bold mb-2"> City </h5>
                        <input type="text" className="uk-input" placeholder="City Name" />
                      </div>
                      <div>
                        <h5 className="uk-text-bold mb-2"> Postal Code </h5>
                        <input type="text" className="uk-input" placeholder="Postal Code" />
                      </div>
                      <div>
                        <h5 className="uk-text-bold mb-2"> State </h5>
                        <input type="text" className="uk-input" placeholder="State" />
                      </div>
                      <div>
                        <h5 className="uk-text-bold mb-2"> Country </h5>
                        <input type="text" className="uk-input" placeholder="Your Country" />
                      </div>
                      <div>
                        <h5 className="uk-text-bold mb-2"> Gender </h5>
                        <select className="uk-select">
                          <option>Male</option>
                          <option>Female</option>
                        </select>
                      </div>
                    </form>
                    <div className="uk-flex uk-flex-right p-4">
                      <button type="button" className="button soft-warning mr-2">
                        Cancle
                      </button>
                      <button type="button" className="button warning">
                        Save Changes
                      </button>
                    </div>
                  </div>
                </li>

                <li>
                  <div className="uk-card-default rounded">
                    <div className="p-3">
                      <h5 className="mb-0"> Reset Password</h5>
                    </div>
                    <hr className="m-0" />
                    <form className="uk-child-width-1-2@s uk-grid-small p-4 uk-grid">
                      <div>
                        <h5 className="uk-text-bold mb-2"> Current Password</h5>
                        <input type="Password" className="uk-input" placeholder="Your Current Password" />
                      </div>
                      <div>
                        <h5 className="uk-text-bold mb-2"> New Password </h5>
                        <input type="Password" className="uk-input" placeholder=" Enter New Password" />
                      </div>

                      <div>
                        <h5 className="uk-text-bold mb-2"> Re-Enter Password </h5>
                        <input type="Password" className="uk-input" placeholder="Re-Enter Password " />
                      </div>
                    </form>

                    <div className="uk-flex uk-flex-right p-4">
                      <button type="button" className="button soft-warning mr-2">
                        Cancle
                      </button>
                      <button type="button" className="button warning">
                        Save Changes
                      </button>
                    </div>
                  </div>
                </li>
                <li>
                  <div className="uk-card-default rounded">
                    <div className="p-3">
                      <h5 className="mb-0"> Your Earning</h5>
                    </div>
                    <hr className="m-0" />
                    <div className="my-gift-store-box">
                      <h3 className="total-earning-hadding"> Your Gift </h3>
                      <div className="total-earning-price-box">
                        <span>Total Earnings</span>
                        <span>
                          <i className="icon-brand-bitcoin" />
                          3423
                        </span>
                      </div>
                      <ul className="total-earning-ul">
                        <li>
                          <div className="my-gift-store-icon my-gift-store-active total-earning-ul-box">
                            <span className="my-gift-store-icon-no">3</span>
                            <img src="assets/images/video-thumbal/ring.png" alt="" />
                            <p>Ring</p>
                            <p>
                              <i className="icon-brand-bitcoin" />
                              {' '}
                              12
                            </p>
                          </div>
                        </li>
                        <li>
                          <div className="my-gift-store-icon total-earning-ul-box">
                            <img src="assets/images/video-thumbal/ring.png" alt="" />
                            <p>Ring</p>
                            <p>
                              <i className="icon-brand-bitcoin" />
                              {' '}
                              12
                            </p>
                          </div>
                        </li>
                        <li>
                          <div className="my-gift-store-icon my-gift-store-active total-earning-ul-box">
                            <span className="my-gift-store-icon-no">2</span>
                            <img src="assets/images/video-thumbal/ring.png" alt="" />
                            <p>Ring</p>
                            <p>
                              <i className="icon-brand-bitcoin" />
                              {' '}
                              12
                            </p>
                          </div>
                        </li>
                        <li>
                          <div className="my-gift-store-icon total-earning-ul-box">
                            <img src="assets/images/video-thumbal/ring.png" alt="" />
                            <p>Ring</p>
                            <p>
                              <i className="icon-brand-bitcoin" />
                              {' '}
                              12
                            </p>
                          </div>
                        </li>
                        <li>
                          <div className="my-gift-store-icon total-earning-ul-box">
                            <img src="assets/images/video-thumbal/ring.png" alt="" />
                            <p>Ring</p>
                            <p>
                              <i className="icon-brand-bitcoin" />
                              {' '}
                              12
                            </p>
                          </div>
                        </li>
                        <li>
                          <div className="my-gift-store-icon total-earning-ul-box">
                            <img src="assets/images/video-thumbal/ring.png" alt="" />
                            <p>Ring</p>
                            <p>
                              <i className="icon-brand-bitcoin" />
                              {' '}
                              12
                            </p>
                          </div>
                        </li>
                        <li>
                          <div className="my-gift-store-icon total-earning-ul-box">
                            <img src="assets/images/video-thumbal/ring.png" alt="" />
                            <p>Ring</p>
                            <p>
                              <i className="icon-brand-bitcoin" />
                              {' '}
                              12
                            </p>
                          </div>
                        </li>
                      </ul>
                    </div>
                  </div>
                </li>
                <li>
                  <div className="uk-card-default rounded">
                    <div className="p-3">
                      <h5 className="mb-0">Delete Your Account</h5>
                    </div>
                    <hr className="m-0" />
                    <div className="delete-account-hadding">
                      <h5>Are you sure you want to delete Your account?</h5>
                      <p>Please Let Us know the reason why you are leaving.</p>
                    </div>
                    <form className="uk-child-width-1@s uk-grid-small p-4 uk-grid">
                      <div className="delete-account-reason">
                        <h5 className="uk-text-bold mb-2"> Enter your Reason </h5>
                        <textarea placeholder="Others..." cols="5" />
                      </div>
                    </form>

                    <div className="uk-flex uk-flex-right p-4">
                      <button type="button" className="button soft-warning mr-2">
                        Cancle
                      </button>
                      <button type="button" className="button warning">
                        Delete Account
                      </button>
                    </div>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );

  return (
    <>
      <Helmet>
        <title>Settings</title>
        <meta name="description" content="Description of Followers" />
      </Helmet>
      <Header />
      <Sidebar />
      {getContent()}
    </>
  );
}

Setting.propTypes = {};

export default memo(Setting);
