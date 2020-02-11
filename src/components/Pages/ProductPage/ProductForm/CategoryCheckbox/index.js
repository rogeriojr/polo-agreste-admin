import React from 'react';
import { FormControlLabel, Checkbox } from '@material-ui/core';
import PropTypes from 'prop-types';

const CategoryCheckboxGroupItem = props => {
  const { value, label, field, form, field:{ checked, name } } = props;

  const [newChecked, setNewChecked] = React.useState(false)

  const handleChange = e => {
    if(e.currentTarget.checked){
      setNewChecked(true);
      form.setFieldValue(name, [...field.value, value]);
    }
    else{
      setNewChecked(false);
      let valueArray = [...field.value] || [];
      valueArray = valueArray.filter(item => item.id !== value.id);
      form.setFieldValue(name, valueArray);
    }
  }
  React.useEffect(()=>{
    if(typeof field.value.find(item => item.id == value.id) != 'undefined'){
      setNewChecked(true);
    }
  },[]);

  return (
    <FormControlLabel control={<Checkbox style={{ color:'#003B40' }} />} checked={newChecked} onChange={handleChange} value={value} label={label} />
  );
};

CategoryCheckboxGroupItem.propTypes = {
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  label: PropTypes.string.isRequired,
};

export { CategoryCheckboxGroupItem };
