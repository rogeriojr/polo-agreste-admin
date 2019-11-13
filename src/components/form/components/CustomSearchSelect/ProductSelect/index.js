import React from 'react';
import Select from 'react-select';
import PropTypes from 'prop-types';
import { responseToSelect } from 'utils/response';
import { FormHelperText, InputLabel, Box } from '@material-ui/core';
import { ErrorMessage } from 'formik';
import styled from 'styled-components';

const StyledSelect = styled(Select)`
  && {
    & > div {
      min-height: 43px;
    }
  }
`;

const StyledDiv = styled('div')`
  && {
    position: relative;
  }
`;

const StyledInputLabel = styled(InputLabel)`
  && {
    position: absolute;
    top: 1px;
    padding-left: 5px;
    padding-right: 5px;
    left: 10px;
    transform: translateY(-50%);
    background: white;
    font-size: 12px;
  }
`;

const ProductSelect = ({
  placeholder,
  field,
  form,
  options,
  isMulti,
  isLoading,
  search,
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
        ? option.map(item => ({ id: item.value, name: item.label, ...item }))
        : option.value,
    );
  };

  const getValue = () => {
    if (isMulti) {
      //     if (selectedOption.length <= 5) {
      const selecteds = options.filter(option =>
        field.value.map(x => x.id).includes(option.id),
      );
      setSelectedOption(
        selecteds.map(item => ({ value: item.id, label: item.name, ...item })),
      );
      //      }
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

  const onInputChange = searchText => {
    search({ search: searchText });
  };

  const joinOptions = opts => {
    const optionsActual = opts;
    const optionsValue = field.value;
    optionsValue.forEach(optionValue => {
      const results = optionsActual.filter(optionActual => {
        if (optionValue.id === optionActual.id) {
          return true;
        }
      });
      if (results.length === 0) {
        optionsActual.push(optionValue);
      }
    });
    return optionsActual;
  };

  React.useEffect(() => {
    const optionsAdded = joinOptions(options);
    const optionsTeste = optionsAdded.map(item => ({
      ...item,
      value: item.id,
      label: (
        <Box display="flex" alignItems="center">
          <Box
            style={{
              width: 40,
              height: 70,
              overflow: 'hidden',
              marginRight: 10,
            }}
          >
            <img
              alt=""
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              src={item.images[0].sizes.small}
            />
          </Box>
          {item.name}
        </Box>
      ),
    }));
    console.log(optionsTeste);
    setSelectOptions(optionsTeste);
  }, [options]);

  React.useEffect(() => {
    getValue();
  }, [selectOptions, field.value]);

  return (
    <StyledDiv>
      <StyledSelect
        styles={{
          menuPortal: base => {
            const { zIndex, ...rest } = base; // remove zIndex from base by destructuring
            return { ...rest, zIndex: 9999 };
          },
        }}
        {...field}
        value={selectedOption}
        onChange={onChange}
        placeholder={placeholder}
        options={selectOptions}
        isMulti={isMulti}
        menuPortalTarget={document.querySelector('body')}
        isLoading={isLoading}
        onInputChange={onInputChange}
      />
      {selectedOption !== '' && (
        <StyledInputLabel>{placeholder}</StyledInputLabel>
      )}
      <ErrorMessage name={field.name}>
        {msg => <FormHelperText error>{msg}</FormHelperText>}
      </ErrorMessage>
    </StyledDiv>
  );
};

ProductSelect.propTypes = {
  field: PropTypes.oneOfType([PropTypes.object]).isRequired,
  form: PropTypes.oneOfType([PropTypes.object]).isRequired,
  options: PropTypes.oneOfType([PropTypes.array]).isRequired,
  placeholder: PropTypes.string.isRequired,
  isLoading: PropTypes.bool,
  isMulti: PropTypes.bool,
  search: PropTypes.func.isRequired,
};

ProductSelect.defaultProps = {
  isMulti: false,
  isLoading: true,
};

export default ProductSelect;
