import React from 'react';
import { FormControl, FormControlLabel, Checkbox } from '@material-ui/core';
import PropTypes from 'prop-types';

const CustomCheckboxGroupNumber = props => {
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
      valueArray = [...valueArray, Number(target.value)];
    } else {
      valueArray = valueArray.filter(item => item !== Number(target.value));
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

CustomCheckboxGroupNumber.propTypes = {
  children: PropTypes.arrayOf(PropTypes.element).isRequired,
  row: PropTypes.bool,
  field: PropTypes.oneOfType([PropTypes.object]).isRequired,
  form: PropTypes.oneOfType([PropTypes.object]).isRequired,
};

CustomCheckboxGroupNumber.defaultProps = {
  row: false,
};


export { CustomCheckboxGroupNumber };