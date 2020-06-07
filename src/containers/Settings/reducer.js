/*
 *
 * Live reducer
 *
 */

import { IS_PROCESS_ACTION } from './constants';
import Setting from '../../components/Setting';

export const initialState = { inProcess: false };
/* eslint-disable default-case, no-param-reassign */
export default function setBrowserInfo(state = initialState, action) {
  switch (action.type) {
    case IS_PROCESS_ACTION:
      return {
        ...Setting,
        inProcess: action.inProcess
      };
    default:
      return state;
  }
}
