import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the login state domain
 */

const selectcontactUs = state => state.contactUs || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by Login
 */

const makeDefaultSelector = () =>
    createSelector(
        selectcontactUs,
        ({ step }) => step || {},
    );

export default makeDefaultSelector;
export { makeDefaultSelector };
