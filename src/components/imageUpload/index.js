/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/label-has-for */
/* eslint-disable react/no-access-state-in-setstate */
/* eslint-disable react/destructuring-assignment */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './index.css';

export default class ImageUpload extends Component {
  fileObj = [];

  fileArray = [];

  constructor(props) {
    super(props);
    this.state = {
      file: []
    };
    this.uploadMultipleFiles = this.uploadMultipleFiles.bind(this);
  }

  uploadMultipleFiles(e) {
    this.fileObj.push(e.target.files);
    const data = this.state.file;
    data.push(e.target.files[0]);

    for (let i = 0; i < this.fileObj[0].length; i++) {
      this.fileArray.push(URL.createObjectURL(this.fileObj[0][i]));
    }
    this.setState({ file: data });
    this.props.getImageData(this.state.file);
  }

  render() {
    return (
      <>
        <div className="form-group multi-preview">
          {(this.fileArray || []).map((url, index) => {
            const key = `index-${index}`;
            return (
              <img key={key} src={url} alt="..." style={{ height: '100px', width: '100px', marginRight: '5px' }} />
            );
          })}
        </div>

        <div className="form-group file-upload">
          <label htmlFor="tfid-0-7" className="control-label"><span>Product Images</span></label>
          <input type="file" className="form-control file-upload-input" onChange={this.uploadMultipleFiles} multiple={this.props.isMulti} />
        </div>
      </>
    );
  }
}

ImageUpload.propTypes = {
  isMulti: PropTypes.bool.isRequired,
  getImageData: PropTypes.func.isRequired,
};


// module.exports = ImageUpload;
