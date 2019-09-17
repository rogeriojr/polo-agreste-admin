import React from 'react';
import { FormControl, FormControlLabel, Checkbox } from '@material-ui/core';
import PropTypes from 'prop-types';

const CustomCheckboxGroup = props => {
  const {
    children,
    row,
    field: { value, name },
    form: { setFieldValue, handleBlur },
  } = props;

  const handleBoxChange = event => {
    const target = event.currentTarget;
    let valueArray = [...value] || [];
    if (target.checked) {
      valueArray = [...valueArray, target.value];
    } else {
      valueArray = valueArray.filter(item => item !== target.value);
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
            checked: value.includes(child.props.value),
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

CustomCheckboxGroup.propTypes = {
  children: PropTypes.arrayOf(PropTypes.element).isRequired,
  row: PropTypes.bool,
  field: PropTypes.oneOfType([PropTypes.object]).isRequired,
  form: PropTypes.oneOfType([PropTypes.object]).isRequired,
};

CustomCheckboxGroup.defaultProps = {
  row: false,
};

const CustomCheckboxGroupItem = props => {
  const { value, label } = props;

  return (
    <FormControlLabel control={<Checkbox />} value={value} label={label} />
  );
};

CustomCheckboxGroupItem.propTypes = {
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  label: PropTypes.string.isRequired,
};

export { CustomCheckboxGroupItem, CustomCheckboxGroup };
