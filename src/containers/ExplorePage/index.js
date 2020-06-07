/**
 *
 * ExplorePage
 *
 */

import React, { memo } from 'react';
// import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { createStructuredSelector } from 'reselect';
import { compose, bindActionCreators } from 'redux';

import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import makeSelectExplorePage from './selectors';
import * as Actions from './actions';
import reducer from './reducer';
import saga from './saga';

export function ExplorePage() {
    useInjectReducer({ key: 'explorePage', reducer });
    useInjectSaga({ key: 'explorePage', saga });

    return (
        <div>
            <Helmet>
                <title>ExplorePage</title>
                <meta name="description" content="Description of ExplorePage" />
            </Helmet>
        </div>
    );
}

ExplorePage.propTypes = {};

const mapStateToProps = createStructuredSelector({
    explorePage: makeSelectExplorePage(),
});

const mapDispatchToProps = dispatch => bindActionCreators(Actions, dispatch);

const withConnect = connect(
    mapStateToProps,
    mapDispatchToProps,
);

export default compose(
    withConnect,
    memo,
)(ExplorePage);
