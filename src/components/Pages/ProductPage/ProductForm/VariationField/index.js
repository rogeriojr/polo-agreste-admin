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
      fixedDecimalScale
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
  colors,
  sizes,
  isLoadingColor,
  isLoadingSize,
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
      price_whole: '',
      code_ean: '',
      stock: '',
    },
  ];

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

          if (curField === 'price' || curField === 'price_whole') {
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

  const convertAttributes = (variation, variations) => {
    if (!variation || variation.id === null) {
      return null;
    }
    const actualVariation = variations.find(variationElm => {
      return variation.id === variationElm.id;
    });

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
                  value={convertAttributes(fieldValue.color, colors)}
                  onChange={onChangeVariation(indexVariation, 'color')}
                  placeholder="Cor"
                  options={responseToSelect(colors)}
                  isMulti={false}
                  menuPortalTarget={document.querySelector('body')}
                  isLoading={isLoadingColor}
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
                  value={convertAttributes(fieldValue.size, sizes)}
                  onChange={onChangeVariation(indexVariation, 'size')}
                  placeholder="Tamanho"
                  options={responseToSelect(sizes)}
                  isMulti={false}
                  menuPortalTarget={document.querySelector('body')}
                  isLoading={isLoadingSize}
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
                  value={fieldValue.price_whole}
                  onChange={onChangeVariation(indexVariation, 'price_whole')}
                  fullWidth
                  variant="outlined"
                  label="Preço Atacado"
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
              {field.value.length > 0 && (
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
          {field && field.value && (
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
  colors: PropTypes.oneOfType([PropTypes.array]).isRequired,
  sizes: PropTypes.oneOfType([PropTypes.array]).isRequired,
  placeholder: PropTypes.string.isRequired,
  isLoadingColor: PropTypes.bool.isRequired,
  isLoadingSize: PropTypes.bool.isRequired,
};

export default VariationField;
