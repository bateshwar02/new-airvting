/**
 *
 * Asynchronously loads the component for Live
 *
 */

import loadable from 'utils/loadable';

export default loadable(() => import('./index'));
