/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, {
  useRef, useState
} from 'react';
import PropTypes from 'prop-types';
import t from 'tcomb-form';
import airvForm from '../../../components/form';
import Utils from '../../../utils/common';

function Comment({
  addVideoComment, actionInProcess, id, userData
}) {
  let imgUrl = 'assets/images/avatars/avatar-2.jpg';
  const { userDetail } = userData;
  if (!Utils.isUndefinedOrNullOrEmptyObject(userDetail) && !Utils.isUndefinedOrNullOrEmpty(userDetail.featuredImage)) {
    imgUrl = userDetail.featuredImage;
  }

  const addCommentForm = useRef(null);
  const [addCommentData, setAddCommentData] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);

  const onChange = (formValue) => {
    if (isSubmitted) {
      addCommentForm.current.validate();
    }
    setAddCommentData(formValue);
  };

  const formSchema = { comment: t.String };
  const getLoginFormTemplate = locals => (
    <>
      <div className="uk-width-1-1@s">
        {' '}
        {locals.inputs.comment}
      </div>
    </>
  );


  const getFormSchema = () => t.struct(formSchema);
  const getFormOptions = () => ({
    template: getLoginFormTemplate,
    fields: {
      comment: {
        template: airvForm.templates.textbox,
        label: 'Comment',
        attrs: {
          placeholder: 'Enter Your Comments her...',
        },
        type: 'textarea',
        error: 'Please enter your query',
      },
    }
  });

  const submit = () => {
    setIsSubmitted(true);
    const { errors } = addCommentForm.current.validate();
    if (!Utils.isEmptyList(errors)) {
      return;
    }
    const otpFormData = Utils.deepCopy(addCommentData);
    addVideoComment(otpFormData, id);
    setAddCommentData({});
  };

  document.onkeydown = function () {
    if (window.event.keyCode === 13) {
      submit();
    }
  };

  return (
    <div className="comments">
      <h4>Your Comment </h4>
      <ul>
        <li>
          <div className="avatar">
            {/* {!Utils.isUndefinedOrNullOrEmpty(userDetail.)} */}
            <img src={imgUrl} alt="" />
          </div>
          <div className="comment-content">
            <div className="uk-grid-small uk-grid">
              <t.form.Form ref={addCommentForm} type={getFormSchema()} value={addCommentData} options={getFormOptions()} onChange={onChange} onSubmit={submit} />
            </div>
            <div className="uk-grid-margin">
              <span type="button" className="button warning submitButton" role="button" tabIndex={0} onClick={submit}>
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

Comment.propTypes = {
  addVideoComment: PropTypes.func.isRequired,
  id: PropTypes.string.isRequired,
  actionInProcess: PropTypes.bool.isRequired,
  userData: PropTypes.object.isRequired,
};


export default Comment;
