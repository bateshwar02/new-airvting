import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';

import usersReducer from '../containers/App/reducer';
import loginReducer from '../containers/Login/reducer';
import homeReducer from '../containers/Home/reducer';
import followersReducer from '../containers/Followers/reducer';
import followingsReducer from '../containers/Following/reducer';
import likedVideoReducer from '../containers/LikeVideos/reducer';
import featuredReducer from '../containers/Featured/reducer';
import historyReducer from '../containers/History/reducer';
import goLiveReducer from '../containers/Golive/reducer';
import myChanelReducer from '../containers/MyChannel/reducer';
import storeReducer from '../containers/Store/reducer';
import videoReducer from '../containers/DetailsVideos/reducer';
import exploreReducer from '../containers/Explore/reducer';
import settingReducer from '../containers/Settings/reducer';
import browserReducer from '../containers/BrowserChannel/reducer';
import productReducer from '../containers/Product/reducer';
import cardReducer from '../containers/MyCards/reducer'; 
import history from '../utils/history';

export default combineReducers({
  router: connectRouter(history),
  userDetails: usersReducer,
  login: loginReducer,
  home: homeReducer,
  detailsVideos: videoReducer,
  followers: followersReducer,
  following: followingsReducer,
  likedVideos: likedVideoReducer,
  featured: featuredReducer,
  history: historyReducer,
  goLive: goLiveReducer,
  myChanel: myChanelReducer,
  explore: exploreReducer,
  store: storeReducer,
  setting: settingReducer,
  browserChannel: browserReducer,
  product: productReducer,
  cards: cardReducer
});
