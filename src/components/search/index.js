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
import Navigation from '../../utils/navigation';
import './index.css';

function Search({ updateSearch, searchValue }) {
  const objData = { search: searchValue };

  const [searchData, setSearchData] = useState(objData);
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (!Utils.isUndefinedOrNullOrEmpty(searchValue)) {
      setSearchData({ search: searchValue });
      setShow(true);
    }
  }, [searchValue]);


  const onChange = (formValue) => {
    setSearchData(formValue);
    if (formValue.search.length > 0) {
      setShow(true);
    }
    if (formValue.search.length === 0) {
      setShow(false);
    }
  };

  const formSchema = { search: t.String };

  const searchFunction = () => {
    if (searchData.search.length > 2) {
      Navigation.push(`/sh/airvtingweb?search=${searchData.search}`);
    }
    if (searchData.search.length === 0) {
      Navigation.push('/sh/airvtingweb');
    }
  };

  const clearData = () => {
    setSearchData({});
    updateSearch(false);
    Navigation.push('/sh/airvtingweb');
  };

  const getLoginFormTemplate = locals => (
    <>
      <div className="head_search_cont">
        <span className="before" onClick={searchFunction} role="button" tabIndex={-1}>
          <i className="s_icon uil-search-alt" />
        </span>
        {locals.inputs.search}
        <span className={classnames('after', { showCross: show })} onClick={clearData} role="button" tabIndex={0}>
          {' '}
          <img src="assets/icons/cros.png" alt="" style={{ height: '18px' }} />
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
        // config: {
        //   addonBefore: <i className="s_icon uil-search-alt" />,
        // },
        type: 'text',
      },
    },
  });

  return (
    <div className="head_search">
      <t.form.Form type={getFormSchema()} value={searchData} options={getFormOptions()} onChange={onChange} />
      <div uk-dropdown="pos:top;mode:click;animation:uk-animation-slide-bottom-small" className="dropdown-search" />
    </div>
  );
}

Search.propTypes = {
  updateSearch: PropTypes.func.isRequired,
  searchValue: PropTypes.string.isRequired,
};

const mapStateToProps = ({ home: { searchValue } }) => ({ searchValue });

const mapDispatchToProps = dispatch => bindActionCreators(Actions, dispatch);

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(Search);
