import React from 'react';
import Select from 'react-select';
import PropTypes from 'prop-types';
import { responseToSelect } from 'utils/response';
import { FormHelperText, Button } from '@material-ui/core';
import { ErrorMessage } from 'formik';
import { InputContainer, InputItem } from 'components/form/StyledComponents';
import styled from 'styled-components';

const StyledSelect = styled(Select)`
  && {
    & > div {
      min-height: 43px;
    }
  }
`;

const VariationField = ({
  placeholder,
  field,
  form,
  variations,
  isLoading,
}) => {
  //const [setRoot, setVariationsInfo] = React.useState();

  if (!field.value || field.value.length === 0) {
    form.setFieldValue(field.name, [
      {
        variation: {
          id: null,
          value: null,
        },
        price: null,
      },
    ]);
  }

  const onChangeVariation = indexVariation => option => {
    console.log(option);
    form.setFieldValue(
      field.name,
      field.value.map((fieldValue, i) => {
        if (i === indexVariation) {
          return {
            ...fieldValue,
            variation: {
              id: option.value,
              name: option.label,
            },
          };
        }
        return fieldValue;
      }),
    );
  };

  const convertVariation = variation => {
    if (variation.id === null) {
      return null;
    }
    return {
      label: variation.name,
      value: variation.id,
    };
  };

  const actualVariations = responseToSelect(variations);

  const limitVariations = variations.length;

  const addVariation = () => {};
  return (
    <>
      {field &&
        field.value &&
        field.value.map((fieldValue, indexVariation) => (
          <div key={fieldValue.variation.id}>
            <InputContainer>
              <InputItem>
                <StyledSelect
                  styles={{
                    menuPortal: base => {
                      const { zIndex, ...rest } = base; // remove zIndex from base by destructuring
                      return { ...rest, zIndex: 9999 };
                    },
                  }}
                  {...field}
                  value={convertVariation(fieldValue.variation)}
                  onChange={onChangeVariation(indexVariation)}
                  placeholder={placeholder}
                  options={actualVariations}
                  isMulti={false}
                  menuPortalTarget={document.querySelector('body')}
                  isLoading={isLoading}
                />
              </InputItem>
            </InputContainer>
          </div>
        ))}
      <Button onClick={addVariation} variant="contained" color="primary">
        Adicionar variação
      </Button>
    </>
  );
};

VariationField.propTypes = {
  field: PropTypes.oneOfType([PropTypes.object]).isRequired,
  form: PropTypes.oneOfType([PropTypes.object]).isRequired,
  variations: PropTypes.oneOfType([PropTypes.array]).isRequired,
  placeholder: PropTypes.string.isRequired,
  isLoading: PropTypes.bool.isRequired,
};

export default VariationField;
