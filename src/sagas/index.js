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
import watchMyChannelSaga from '../containers/MyChannel/saga';
import watchVideoDetailsSaga from '../containers/DetailsVideos/saga';
import watchSettingSaga from '../containers/Settings/saga';
import watchBrowserChannelSaga from '../containers/BrowserChannel/saga';
import watchProductSaga from '../containers/Product/saga';


// export default function* root() {
//   yield all([
//     fork(watchGetUsersSaga),
//     fork(watchHomeSaga),
//     fork(watchLoginSaga),
//     fork(watchFollowersSaga),
//     fork(watchFollowingSaga),
//     fork(watchDetailsVideosSaga),
//     fork(watchExploreSaga),
//     fork(watchFeaturedSaga),
//     fork(watchGoliveSaga),
//     fork(watchHistorySaga),
//     fork(watchLikedVideoSaga),
//     fork(watchLiveSga),
//     fork(watchStoreSaga),
//     fork(watchMyChannelSaga),
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
  yield spawn(watchMyChannelSaga);
  yield spawn(watchVideoDetailsSaga);
  yield spawn(watchSettingSaga);
  yield spawn(watchBrowserChannelSaga);
  yield spawn(watchProductSaga);
}