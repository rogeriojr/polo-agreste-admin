import React from 'react';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import PropTypes from 'prop-types';

const CustomRadioGroup = ({
  children,
  row,
  field: { value, name },
  form: { handleChange, handleBlur },
}) => (
  <FormControl fullWidth>
    <RadioGroup row={row} name={name} onChange={handleChange} value={value}>
      {React.Children.map(children, child =>
        React.cloneElement(child, {
          field: {
            value: value.includes(child.props.id),
            onChange: handleChange,
            onBlur: handleBlur,
            name,
          },
        }),
      )}
    </RadioGroup>
  </FormControl>
);

CustomRadioGroup.propTypes = {
  children: PropTypes.arrayOf(PropTypes.element).isRequired,
  row: PropTypes.bool,
  field: PropTypes.oneOfType([PropTypes.object]).isRequired,
  form: PropTypes.oneOfType([PropTypes.object]).isRequired,
};

CustomRadioGroup.defaultProps = {
  row: false,
};

const CustomRadioGroupItem = ({ value, label }) => (
  <FormControlLabel control={<Radio />} value={value} label={label} />
);

CustomRadioGroupItem.propTypes = {
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  label: PropTypes.string.isRequired,
};

export { CustomRadioGroupItem, CustomRadioGroup };
