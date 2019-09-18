import React from 'react';
import PropTypes from 'prop-types';
import RichTextEditor from 'react-rte';
import { Typography } from '@material-ui/core';

const CustomRichText = ({ field, label, form }) => {
  const onChange = value => {
    form.setFieldValue(field.name, value);
  };
  return (
    <>
      <Typography
        variant="h6"
        style={{ color: '#282829', marginLeft: -10, marginBottom: 5 }}
      >
        {label}
      </Typography>
      <RichTextEditor
        value={field.value || RichTextEditor.createEmptyValue()}
        onChange={onChange}
      />
    </>
  );
};

CustomRichText.propTypes = {
  field: PropTypes.oneOfType([PropTypes.object]).isRequired,
  form: PropTypes.oneOfType([PropTypes.object]).isRequired,
  label: PropTypes.string.isRequired,
};

export default CustomRichText;
