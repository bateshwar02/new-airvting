import React, {
  memo, useRef, useEffect, useState
} from 'react';
// import PropTypes from 'prop-types';
import t from 'tcomb-form';
import airvForm from '../form';
import './index.css';

function Search() {
  const searchRef = useRef(null);
  const [searchData, setSearchData] = useState({});

  useEffect(() => {

  }, []);

  const onChange = (formValue) => {
    setSearchData(formValue);
  };

  const formSchema = { search: t.String };

  const getLoginFormTemplate = locals => (
    <>
      <div className="head_search_cont">
        {locals.inputs.search}
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
      <t.form.Form ref={searchRef} type={getFormSchema()} value={searchData} options={getFormOptions()} onChange={onChange} />
      <div uk-dropdown="pos:top;mode:click;animation:uk-animation-slide-bottom-small" className="dropdown-search">
        <ul className="dropdown-search-list">
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
        </ul>
      </div>
    </div>
  );
}

Search.propTypes = { };

Search.defaultProps = {
  inProcess: false,
};

export default memo(Search);
