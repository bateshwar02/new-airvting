import t from 'tcomb-form';
import checkbox from './checkbox';
import textbox from './textbox';
import select from './select';
import radio from './radio';
import date from './date';
import scale from './scale';
import Utils from '../../utils/common';
import Regex from '../../utils/regex';

export default {
  templates: {
    checkbox,
    radio,
    select,
    textbox,
    date,
    scale,
  },

  transformers: {
    listTransformer: {
      format: value => (Array.isArray(value) ? value.join(',') : value),
      parse: str => (Utils.isStringAndNotEmpty(str) ? str.split(',') : null),
    },

    dateTransformer: {
      format: (value) => {
        if (!Utils.isUndefinedOrNullOrEmpty(value)) {
          return new Date(value);
        }
        return value;
      },
      parse: (value) => {
        if (!Utils.isUndefinedOrNullOrEmpty(value)) {
          return new Date(value).getTime();
        }
        return null;
      },
    },
  },

  refinements: {
    emailEmptyAllowed: t.refinement(t.maybe(t.Str), s => Utils.isUndefinedOrNullOrEmpty(s) || Regex.plainEmail.test(s)),
    email: t.subtype(t.Str, s => Regex.email.test(s)),
    mobile: t.subtype(t.Str, s => Regex.mobile.test(s)),
    pass: t.subtype(t.Str, s => Regex.password.test(s)),
    name: t.subtype(t.Str, s => Regex.name.test(s)),

    pinCode: t.refinement(t.Str, s => Regex.pincode.test(s)),
    year: t.refinement(t.Str, s => Regex.year.test(s)),
    pancard: t.refinement(t.Str, s => Regex.pancard.test(s)),
    gst: t.refinement(t.maybe(t.Str), s => (!Utils.isUndefinedOrNullOrEmpty(s) ? Regex.gst.test(s) : true)),
    organisationName: t.refinement(t.Str, s => Regex.organisationName.test(s)),
    accountName: t.refinement(t.Str, s => Regex.accountName.test(s)),
    hasPositiveNumericValue: t.refinement(t.Number, s => s > 0),
    percentage: t.refinement(t.Str, s => !Utils.isUndefinedOrNullOrEmpty(s) && Regex.percentage.test(s)),
    turnover: t.refinement(t.Str, s => Regex.turnover.test(s)),
    validOtp: t.refinement(t.Str, s => Regex.otp.test(s)),
  },

  helper: {
    build: (options, isFormSubmit) => {
      const newOption = options;
      Object.keys(newOption.fields).forEach((field) => {
        if (Utils.isUndefinedOrNullOrEmpty(newOption.fields[field].attrs)) {
          newOption.fields[field].attrs = {};
        }
        newOption.fields[field].attrs.isFormSubmit = isFormSubmit;
      });
      return newOption;
    },
  },
};
