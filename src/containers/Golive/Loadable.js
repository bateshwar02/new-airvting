/**
 *
 * Asynchronously loads the component for Golive
 *
 */

import loadable from 'utils/loadable';

export default loadable(() => import('./index'));
