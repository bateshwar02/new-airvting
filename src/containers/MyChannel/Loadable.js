/**
 *
 * Asynchronously loads the component for MyChannel
 *
 */

import loadable from 'utils/loadable';

export default loadable(() => import('./index'));
