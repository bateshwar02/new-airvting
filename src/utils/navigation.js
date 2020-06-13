import { push } from 'connected-react-router';
import history from './history';

export const Navigate = url => push(url);

const Navigation = {
  home: '/',
  login: '/login',
  explore: '/explore',
  store: '/store',
  history: '/history',
  likedVideos: '/liked-videos',
  live: '/live',
  following: '/following',
  followers: '/followers',
  featured: '/featured',
  aboutUs: '/about-us',
  setting: '/setting',
  privacyPolice: '/privacy-police',
  termsCondition: '/terms-conditions',
  videoDetails: '/video/:id',
  goLive: '/live',
  browserChannel: '/browser-channel/:id',
  message: '/message',
  cart: '/cart',
  card: '/cards',
  push: (url) => {
    history.push(url);
  },
  redirect: (url) => {
    push(url);
  },
  forceReload: (url) => {
    if (window !== undefined) {
      window.location = url;
    }
  }
};

export default Navigation;
