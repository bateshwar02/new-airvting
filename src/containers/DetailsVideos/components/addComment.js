/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/label-has-for */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Utils from '../../../utils/common';
import Service from '../api';


export default class Addcomponent extends Component {
  constructor(props) {
    super(props);
    let imgUrl = 'assets/images/avatars/avatar-2.jpg';
    const { userDetail } = props.userData;
    if (!Utils.isUndefinedOrNullOrEmptyObject(userDetail) && !Utils.isUndefinedOrNullOrEmpty(userDetail.featuredImage)) {
      imgUrl = userDetail.featuredImage;
    }

    this.state = {
      imgUrl,
      addCommentData: '',
      isValidate: false,
      actionInProcess: false
    };
  }


  onChange = (e) => {
    const { value } = e.target;
    if (Utils.isUndefinedOrNull(value)) {
      this.setState({ isValidate: true });
      return;
    }
    this.setState({ addCommentData: value, isValidate: false });
  };

  submit = (evt) => {
    evt.preventDefault();
    const { addCommentData, isValidate } = this.state;
    const { id, getComment } = this.props;
    if (isValidate) {
      return;
    }

    if (Utils.isUndefinedOrNullOrEmpty(addCommentData)) {
      this.setState({ isValidate: true });
      return;
    }
    this.setState({ actionInProcess: true, isValidate: false });
    Service.addComment({ comment: addCommentData }, id).then((respose) => {
      if (respose.success) {
        this.setState({ addCommentData: '', actionInProcess: false }, () => {
          getComment(id);
        });
      }
    });
  };

  render() {
    const {
      imgUrl, addCommentData, isValidate, actionInProcess
    } = this.state;

    return (
      <div className="comments">
        <h4>Your Comment </h4>
        <ul>
          <li>
            <div className="avatar">
              <img src={imgUrl} alt="" />
            </div>
            <div className="comment-content">
              <div className="uk-grid-small uk-grid">
                <div className="uk-width-1-1@s">
                  <div className="form-group form-group-depth-1 form-group-comment">
                    <label htmlFor="tfid-0-0" className="control-label"><span>Comment</span></label>
                    <div className="input-group">
                      <input placeholder="Enter Your Comments her..." id="tfid-0-0" name="comment" type="text" className="form-control" value={addCommentData} onChange={this.onChange} />
                    </div>
                    {isValidate && <span className="help-block error-block">Please enter your query</span>}
                  </div>
                </div>

              </div>
              <div className="uk-grid-margin">
                <span type="button" className="button warning submitButton" role="button" tabIndex={0} onClick={this.submit}>
                  Submit
                  { actionInProcess && (
                  <div className="loaderWrapper">
                    <div className="customLoader" />
                  </div>
                  )}
                </span>
              </div>
            </div>
          </li>
        </ul>
      </div>
    );
  }
}

Addcomponent.propTypes = {
  getComment: PropTypes.func.isRequired,
  id: PropTypes.string.isRequired,
  userData: PropTypes.object.isRequired,
};
