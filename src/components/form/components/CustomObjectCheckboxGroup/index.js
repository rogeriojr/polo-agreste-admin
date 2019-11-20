import React from 'react';
import { FormControl, FormControlLabel, Checkbox } from '@material-ui/core';
import PropTypes from 'prop-types';

const CustomObjectCheckboxGroup = props => {
  const {
    children,
    row,
    field: { value, name },
    form: { setFieldValue, handleBlur },
  } = props;

  const handleBoxChange = (value_received, checked) => {
    let valueArray = [...value] || [];
    if (checked) {
      valueArray = [...valueArray, value_received];
    } else {
      valueArray = valueArray.filter(item => item.id !== value_received.id);
    }
    setFieldValue(name, valueArray);
  };

  const handleBoxBlur = () => {
    handleBlur(name, true);
  };

  return (
    <FormControl fullWidth>
      {React.Children.map(children, child =>
        React.cloneElement(child, {
          field: {
            checked: (typeof value.find(item => item.id == child.props.value.id) != 'undefined'),
            value: child.props.value,
            onChange: handleBoxChange,
            onBlur: handleBoxBlur,
            name,
          },
        }),
      )}
    </FormControl>
  );
};

CustomObjectCheckboxGroup.propTypes = {
  children: PropTypes.arrayOf(PropTypes.element).isRequired,
  row: PropTypes.bool,
  field: PropTypes.oneOfType([PropTypes.object]).isRequired,
  form: PropTypes.oneOfType([PropTypes.object]).isRequired,
};

CustomObjectCheckboxGroup.defaultProps = {
  row: false,
};

const CustomObjectCheckboxGroupItem = props => {
  const { value, label, field:{ checked, onChange } } = props;

  const handleChange = event => {
    const target = event.currentTarget;
    onChange(value, target.checked);
  }

  return (
    <FormControlLabel control={<Checkbox style={{ color:'#ce4899' }} />} checked={checked} onChange={handleChange} value={value} label={label} />
  );
};

CustomObjectCheckboxGroupItem.propTypes = {
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  label: PropTypes.string.isRequired,
};

export { CustomObjectCheckboxGroupItem, CustomObjectCheckboxGroup };
