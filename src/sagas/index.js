// import { all, fork, spawn } from 'redux-saga/effects';

import { spawn } from 'redux-saga/effects';

import watchGetUsersSaga from '../containers/App/saga';
import watchHomeSaga from '../containers/Home/saga';
import watchLoginSaga from '../containers/Login/saga';
import watchFollowersSaga from '../containers/Followers/saga';
import watchFollowingSaga from '../containers/Following/saga';
import watchExploreSaga from '../containers/Explore/saga';
import watchFeaturedSaga from '../containers/Featured/saga';
import watchGoliveSaga from '../containers/Golive/saga';
import watchHistorySaga from '../containers/History/saga';
import watchLikedVideoSaga from '../containers/LikeVideos/saga';
import watchLiveSga from '../containers/Live/saga';
import watchStoreSaga from '../containers/Store/saga';
import watchVideoDetailsSaga from '../containers/DetailsVideos/saga';
import watchSettingSaga from '../containers/Settings/saga';
import watchBrowserChannelSaga from '../containers/BrowserChannel/saga';
import watchProductSaga from '../containers/Product/saga';
import watchCardsSaga from '../containers/MyCards/saga';
import watchCartsSaga from '../containers/MyCart/saga';
import watchMessageSaga from '../containers/Message/saga';
import watchToken from '../containers/MyToken/saga';
import watchContactSaga from '../containers/ContactUs/saga';


// export default function* root() {
//   yield all([
//     fork(watchGetUsersSaga),
//   ]);
// }


export default function* rootSaga() {
  yield spawn(watchGetUsersSaga);
  yield spawn(watchHomeSaga);
  yield spawn(watchLoginSaga);
  yield spawn(watchFollowersSaga);
  yield spawn(watchFollowingSaga);
  yield spawn(watchExploreSaga);
  yield spawn(watchLiveSga);
  yield spawn(watchFeaturedSaga);
  yield spawn(watchGoliveSaga);
  yield spawn(watchHistorySaga);
  yield spawn(watchLikedVideoSaga);
  yield spawn(watchStoreSaga);
  yield spawn(watchVideoDetailsSaga);
  yield spawn(watchSettingSaga);
  yield spawn(watchBrowserChannelSaga);
  yield spawn(watchProductSaga);
  yield spawn(watchCardsSaga);
  yield spawn(watchCartsSaga);
  yield spawn(watchMessageSaga);
  yield spawn(watchToken);
  yield spawn(watchContactSaga);
}
