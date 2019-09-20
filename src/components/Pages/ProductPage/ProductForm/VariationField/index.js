import React from 'react';
import Select from 'react-select';
import PropTypes from 'prop-types';
import { responseToSelect } from 'utils/response';
import { FormHelperText, Button, TextField, Input } from '@material-ui/core';
import { ErrorMessage } from 'formik';
import { InputContainer, InputItem } from 'components/form/StyledComponents';
import styled from 'styled-components';
import CustomButton from 'components/form/components/CustomButton';
import NumberFormat from 'react-number-format';
import ActionFab from 'components/Actions/ActionFab';

const StyledSelect = styled(Select)`
  && {
    & > div {
      min-height: 43px;
    }
  }
`;

function NumberFormatCustom(props) {
  const { inputRef, onChange, ...other } = props;

  return (
    <NumberFormat
      {...other}
      getInputRef={inputRef}
      onValueChange={({ floatValue }) => {
        if (!floatValue) {
          onChange('');
        } else {
          onChange(floatValue);
        }
      }}
      thousandSeparator="."
      decimalSeparator=","
      decimalScale={2}
      prefix="R$ "
    />
  );
}

const StyledTextField = styled(TextField)`
  && {
    .MuiOutlinedInput-root {
      background: white;
    }
    & .MuiOutlinedInput-input {
      padding: 12px 12px;
    }
    & .MuiInputLabel-outlined[data-shrink='false'] {
      transform: translate(14px, 14px) scale(1);
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

  const newVariation = () => [
    {
      color: {
        id: null,
        name: null,
      },
      size: {
        id: null,
        name: null,
      },
      price: '',
      code_ean: '',
      stock: '',
    },
  ];

  if (!field.value || field.value.length === 0) {
    form.setFieldValue(field.name, newVariation());
  }

  const onChangeVariation = (indexVariation, curField) => option => {
    form.setFieldValue(
      field.name,
      field.value.map((fieldValue, i) => {
        if (i === indexVariation) {
          if (curField === 'color') {
            return {
              ...fieldValue,
              color: {
                id: option.value,
                name: option.label,
              },
            };
          }

          if (curField === 'size') {
            return {
              ...fieldValue,
              size: {
                id: option.value,
                name: option.label,
              },
            };
          }

          if (curField === 'price') {
            const curFieldInfo = {};
            curFieldInfo[curField] = option;
            return {
              ...fieldValue,
              ...curFieldInfo,
            };
          }
          const curFieldInfo = {};
          curFieldInfo[curField] = option.currentTarget.value;
          return {
            ...fieldValue,
            ...curFieldInfo,
          };
        }
        return fieldValue;
      }),
    );
  };

  const convertVariation = (variation, indexVariation) => {
    if (!variation || variation.id === null) {
      return null;
    }
    const actualVariation = variations[indexVariation].options.find(
      variationElm => {
        return variation.id === variationElm.id;
      },
    );

    return {
      value: actualVariation.id,
      label: actualVariation.name,
    };
  };

  const removeVariation = indexVariation => () => {
    form.setFieldValue(
      field.name,
      field.value.filter((v, i) => {
        return i !== indexVariation;
      }),
    );
  };

  console.log(field.value);

  const actualVariations = responseToSelect(variations);

  const addVariation = () => {
    const values = field.value.concat(newVariation());
    form.setFieldValue(field.name, values);
  };

  return (
    <>
      {field &&
        field.value &&
        field.value.map((fieldValue, indexVariation) => (
          <div key={indexVariation}>
            <InputContainer>
              <InputItem>
                <StyledSelect
                  styles={{
                    menuPortal: base => {
                      const { zIndex, ...rest } = base; // remove zIndex from base by destructuring
                      return { ...rest, zIndex: 9999 };
                    },
                  }}
                  value={convertVariation(fieldValue.color, 0)}
                  onChange={onChangeVariation(indexVariation, 'color')}
                  placeholder="Cor"
                  options={responseToSelect(variations[0].options)}
                  isMulti={false}
                  menuPortalTarget={document.querySelector('body')}
                  isLoading={isLoading}
                />
              </InputItem>
              <InputItem>
                <StyledSelect
                  styles={{
                    menuPortal: base => {
                      const { zIndex, ...rest } = base; // remove zIndex from base by destructuring
                      return { ...rest, zIndex: 9999 };
                    },
                  }}
                  value={convertVariation(fieldValue.size, 1)}
                  onChange={onChangeVariation(indexVariation, 'size')}
                  placeholder="Tamanho"
                  options={responseToSelect(variations[1].options)}
                  isMulti={false}
                  menuPortalTarget={document.querySelector('body')}
                  isLoading={isLoading}
                />
              </InputItem>
              <InputItem>
                <StyledTextField
                  value={fieldValue.price}
                  onChange={onChangeVariation(indexVariation, 'price')}
                  fullWidth
                  variant="outlined"
                  label="Preço"
                  InputProps={{
                    inputComponent: NumberFormatCustom,
                  }}
                />
              </InputItem>
              <InputItem>
                <StyledTextField
                  value={fieldValue.code_ean}
                  onChange={onChangeVariation(indexVariation, 'code_ean')}
                  fullWidth
                  variant="outlined"
                  label="Código"
                />
              </InputItem>
              <InputItem>
                <StyledTextField
                  value={fieldValue.stock}
                  onChange={onChangeVariation(indexVariation, 'stock')}
                  fullWidth
                  variant="outlined"
                  label="Estoque"
                />
              </InputItem>
              {field.value.length > 1 && (
                <ActionFab
                  style={{ marginTop: 5 }}
                  onClick={removeVariation(indexVariation)}
                  icon="close"
                />
              )}
            </InputContainer>
          </div>
        ))}
      <InputContainer>
        <InputItem>
          {field &&
            field.value &&
            field.value[0] &&
            (field.value[0].color.id !== null ||
              field.value[0].size.id !== null) && (
            <CustomButton onClick={addVariation} label="Adicionar variação" />
          )}
        </InputItem>
      </InputContainer>
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
