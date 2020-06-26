import cookie from 'cookies-js';
import React, { memo, useEffect, useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { compose, bindActionCreators } from 'redux';
import { Route, Switch, Redirect } from 'react-router-dom';
import Navigation from '../../utils/navigation';
import Utils from '../../utils/common';

import * as Actions from './action';
import Home from '../Home';
import ExploreComp from '../Explore';
import StoreComp from '../Store';
import Notification from '../../components/Notification';
import Loader from '../../components/Loader';
import LoginComp from '../Login';
import HistoryComp from '../History';
import LikedVideos from '../LikeVideos';
import FollowingComp from '../Following';
import FollowersComp from '../Followers';
import AboutUs from '../../components/About';
import Setting from '../Settings';
import PrivacyPolice from '../../components/PrivacyPolicy';
import TermsCondition from '../../components/TermsCondition';
import FeaturedComp from '../Featured';
import GoLive from '../Live';
import DetailVideo from '../DetailsVideos';
import BrowserChannelComp from '../BrowserChannel';
import MessageComp from '../Message';
import AddProduct from '../Product';
import MyCart from '../MyCart';
import MyCardsComp from '../MyCards';
import ChangePass from '../../components/common/changePass';
import VerifyEmailTemp from '../../components/common/verifyEmailTemp';
import NotFoundPage from '../NotFoundPage/index';
import Token from '../MyToken';
import ProductDetails from '../Product/component/product-details';

export function App({ userData, getUserData }) {
  const [isLogin, setIsLogin] = useState(true);

  useEffect(() => {
    const token = cookie.get('token');
    const userId = cookie.get('userId');
    if (Utils.isUndefinedOrNullOrEmpty(token) || Utils.isUndefinedOrNullOrEmpty(userId)) {
      setIsLogin(false);
      return;
    }

    if (Utils.isUndefinedOrNullOrEmptyObject(userData) && !Utils.isUndefinedOrNullOrEmpty(token) && !Utils.isUndefinedOrNullOrEmpty(userId)) {
      getUserData();
    }
  }, []);

  const PrivateRoute = ({
    component: Component, isLoggedIn, defaultPath, ...rest
  }) => (
    <Route
      {...rest}
      render={props => (isLoggedIn === true ? <Component {...props} /> : <Redirect to={defaultPath} />)
            }
    />
  );

  return (
    <>
      <Loader />
      <Notification />
      <AddProduct />
      <Switch>
        <Route exact path={Navigation.home} component={Home} />
        <PrivateRoute isLoggedIn={isLogin} exact path={Navigation.explore} defaultPath={Navigation.login} component={ExploreComp} />
        <PrivateRoute isLoggedIn={isLogin} exact path={Navigation.store} defaultPath={Navigation.login} component={StoreComp} />
        <PrivateRoute isLoggedIn={isLogin} exact path={Navigation.history} defaultPath={Navigation.login} component={HistoryComp} />
        <PrivateRoute isLoggedIn={isLogin} exact path={Navigation.likedVideos} defaultPath={Navigation.login} component={LikedVideos} />
        <PrivateRoute isLoggedIn={isLogin} exact path={Navigation.following} defaultPath={Navigation.login} component={FollowingComp} />
        <PrivateRoute isLoggedIn={isLogin} exact path={Navigation.followers} defaultPath={Navigation.login} component={FollowersComp} />
        <PrivateRoute isLoggedIn={isLogin} exact path={Navigation.goLive} defaultPath={Navigation.login} component={GoLive} />
        <PrivateRoute isLoggedIn={isLogin} exact path={Navigation.featured} defaultPath={Navigation.login} component={FeaturedComp} />
        <PrivateRoute isLoggedIn={isLogin} exact path={Navigation.message} defaultPath={Navigation.login} component={MessageComp} />
        <PrivateRoute isLoggedIn={isLogin} exact path={Navigation.setting} defaultPath={Navigation.login} component={Setting} />
        <PrivateRoute isLoggedIn={isLogin} exact path={Navigation.cart} defaultPath={Navigation.login} component={MyCart} />
        <PrivateRoute isLoggedIn={isLogin} exact path={Navigation.card} defaultPath={Navigation.login} component={MyCardsComp} />
        <PrivateRoute isLoggedIn={isLogin} exact path={Navigation.token} defaultPath={Navigation.login} component={Token} />
        <PrivateRoute isLoggedIn={isLogin} exact path={Navigation.productDetails} defaultPath={Navigation.login} component={ProductDetails} />
        <Route exact path={Navigation.browserChannel} component={BrowserChannelComp} />
        <Route exact path={Navigation.videoDetails} component={DetailVideo} />
        <Route exact path={Navigation.login} component={LoginComp} />
        <Route exact path={Navigation.aboutUs} component={AboutUs} />
        <Route exact path={Navigation.privacyPolice} component={PrivacyPolice} />
        <Route exact path={Navigation.termsCondition} component={TermsCondition} />
        <Route exact path={Navigation.veryEmail} component={VerifyEmailTemp} />
        <Route exact path={Navigation.changePass} component={ChangePass} />
        <Route path="/404" component={NotFoundPage} />
        <Redirect from="*" to="/404" />
        {/* <Route component={NotFoundPage} /> */}
      </Switch>
    </>
  );
}


App.propTypes = {
  userData: PropTypes.object.isRequired,
  getUserData: PropTypes.func.isRequired,
};

const mapStateToProps = ({ userDetails: { userData } }) => ({ userData });

const mapDispatchToProps = dispatch => bindActionCreators(Actions, dispatch);

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(App);
