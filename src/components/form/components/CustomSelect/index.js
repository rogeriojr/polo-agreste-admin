import React from 'react';
import Select from 'react-select';
import PropTypes from 'prop-types';
import { responseToSelect } from 'utils/response';
import { FormHelperText } from '@material-ui/core';
import { ErrorMessage } from 'formik';
import styled from 'styled-components';

const StyledSelect = styled(Select)`
  && {
    & > div {
      min-height: 43px;
    }
  }
`;

const CustomSelect = ({
  placeholder,
  field,
  form,
  options,
  isMulti,
  isLoading,
}) => {
  const [selectOptions, setSelectOptions] = React.useState([]);
  const [selectedOption, setSelectedOption] = React.useState(isMulti ? [] : '');
  const onChange = option => {
    if (!option) {
      form.setFieldValue(field.name, []);
      return;
    }
    form.setFieldValue(
      field.name,
      isMulti
        ? option.map(item => ({ id: item.value, name: item.label }))
        : option.value,
    );
  };

  const getValue = () => {
    if (isMulti) {
      const selecteds = options.filter(option =>
        field.value.map(x => x.id).includes(option.id),
      );
      setSelectedOption(
        selecteds.map(item => ({ value: item.id, label: item.name })),
      );
    } else {
      const selected = selectOptions.find(
        option => option.value === field.value,
      );
      if (selected) {
        setSelectedOption(selected);
      } else {
        setSelectedOption('');
      }
    }
  };

  React.useEffect(() => {
    setSelectOptions(responseToSelect(options));
  }, [options]);

  React.useEffect(() => {
    getValue();
  }, [selectOptions, field.value]);

  return (
    <>
      <StyledSelect
        styles={{ menuPortal: base => {
          const { zIndex, ...rest } = base;  // remove zIndex from base by destructuring
          return { ...rest, zIndex: 9999 };
        }}}
        {...field}
        value={selectedOption}
        onChange={onChange}
        placeholder={placeholder}
        options={selectOptions}
        isMulti={isMulti}
        menuPortalTarget={document.querySelector('body')}
        isLoading={isLoading}
      />
      <ErrorMessage name={field.name}>
        {msg => <FormHelperText error>{msg}</FormHelperText>}
      </ErrorMessage>
    </>
  );
};

CustomSelect.propTypes = {
  field: PropTypes.oneOfType([PropTypes.object]).isRequired,
  form: PropTypes.oneOfType([PropTypes.object]).isRequired,
  options: PropTypes.oneOfType([PropTypes.array]).isRequired,
  placeholder: PropTypes.string.isRequired,
  isLoading: PropTypes.bool,
  isMulti: PropTypes.bool,
};

CustomSelect.defaultProps = {
  isMulti: false,
  isLoading: true,
};

export default CustomSelect;
