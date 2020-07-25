/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, {
  memo, useState, useEffect
} from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose, bindActionCreators } from 'redux';
import t from 'tcomb-form';
import * as Actions from '../../containers/Home/action';
import Utils from '../../utils/common';
import airvForm from '../form';
import './index.css';

function Search({ updateSearch, getSearchData }) {
  const [searchData, setSearchData] = useState({});
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (!Utils.isUndefinedOrNullOrEmptyObject(searchData)) {
      setShow(true);
    } else {
      setShow(false);
    }
  }, [searchData]);

  const onChange = (formValue) => {
    setSearchData(formValue);
    if (formValue.search.length > 2) {
      updateSearch(true);
      getSearchData(formValue.search.length);
    }
  };

  const formSchema = { search: t.String };

  const clearData = () => {
    setSearchData({});
    updateSearch(false);
  };

  const getLoginFormTemplate = locals => (
    <>
      <div className="head_search_cont">
        {locals.inputs.search}
        <span className={classnames('crossSearch', { show })} onClick={clearData} role="button" tabIndex={0}>
          {' '}
          <img src="assets/icons/cros.png" alt="" />
          {' '}
        </span>
      </div>
    </>
  );


  const getFormSchema = () => t.struct(formSchema);
  const getFormOptions = () => ({
    template: getLoginFormTemplate,
    fields: {
      search: {
        template: airvForm.templates.textbox,
        attrs: {
          placeholder: 'Search for Videos, Games, Movies and more..',
          autoComplete: 'off'
        },
        config: {
          addonBefore: <i className="s_icon uil-search-alt" />,
        },
        type: 'text',
      },
    },
  });

  return (
    <div className="head_search">
      <t.form.Form type={getFormSchema()} value={searchData} options={getFormOptions()} onChange={onChange} />
      <div uk-dropdown="pos:top;mode:click;animation:uk-animation-slide-bottom-small" className="dropdown-search">
        {/* <ul className="dropdown-search-list">
          <li className="list-title"> Recent Searches </li>
          <li>
            {' '}
            <a href="video.php"> Adobe XD Design Free Tutorial .. </a>
            {' '}
          </li>
          <li>
            {' '}
            <a href="video.php"> How to create a basic Sticky HTML element .. </a>
          </li>
          <li>
            {' '}
            <a href="video.php"> Learn How to Prototype Faster with Mockplus! in 2020</a>
          </li>
          <li>
            {' '}
            <a href="video.php"> Adobe XD Design Tutorial Company Website Landing Page .. </a>
          </li>
          <div className="menu-divider">
            <li className="list-footer">
              {' '}
              <a href="your-history.php"> Searches History </a>
            </li>
          </div>
        </ul> */}
      </div>
    </div>
  );
}

Search.propTypes = {
  updateSearch: PropTypes.func.isRequired,
  getSearchData: PropTypes.func.isRequired,
};

const mapStateToProps = ({
  userDetails: {
    userData, notification, message, inProcess
  }
}) => ({
  userData, notification, message, inProcess
});

const mapDispatchToProps = dispatch => bindActionCreators(Actions, dispatch);

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(Search);
