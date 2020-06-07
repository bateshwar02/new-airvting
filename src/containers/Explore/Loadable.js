/**
 *
 * Asynchronously loads the component for Explore
 *
 */

import loadable from 'utils/loadable';

export default loadable(() => import('./index'));
