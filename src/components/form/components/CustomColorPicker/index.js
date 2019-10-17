import React from 'react';
import { TextField, FormHelperText } from '@material-ui/core';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { ErrorMessage } from 'formik';
import { ChromePicker } from 'react-color';

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

const InputContainer = styled('div')`
  && {
    position: relative;
  }
`;

const PickerContainer = styled('div')`
  && {
    position: fixed;
    z-index: 2;
  }
`;

const PickerCover = styled('div')`
  && {
    position: fixed;
    top: 0px;
    right: 0px;
    bottom: 0px;
    left: 0px;
  }
`;

const CustomColorPicker = ({
  field,
  label,
  form: { touched, errors, setFieldValue },
  ...props
}) => {
  const [localState, setLocalState] = React.useState({
    visiblePicker: false,
    offsetTop: 0,
  });

  const toggleVisiblePicker = event => {
    const bodyRect = document.body.getBoundingClientRect();
    const elemRect = event.target.getBoundingClientRect();
    const offsetTop = elemRect.top - bodyRect.top;
    setLocalState({
      ...localState,
      visiblePicker: !localState.visiblePicker,
      offsetTop: offsetTop + 50,
    });
  };

  const onChangePicker = color => {
    setFieldValue(field.name, color.hex);
  };

  return (
    <>
      <InputContainer>
        {localState.visiblePicker && (
          <>
            <PickerCover onClick={toggleVisiblePicker} />
            <PickerContainer style={{ top: localState.offsetTop }}>
              <ChromePicker
                color={field.value}
                onChangeComplete={onChangePicker}
                disableAlpha
              />
            </PickerContainer>
          </>
        )}
        <StyledTextField
          {...field}
          {...props}
          label={label}
          error={Boolean(touched[field.name] && errors[field.name])}
          fullWidth
          variant="outlined"
          InputProps={{
            readOnly: true,
            onFocusOut: () => {
              console.log('aaaa');
            },
          }}
          onClick={toggleVisiblePicker}
        />
        <ErrorMessage name={field.name}>
          {msg => <FormHelperText error>{msg}</FormHelperText>}
        </ErrorMessage>
      </InputContainer>
    </>
  );
};

CustomColorPicker.propTypes = {
  field: PropTypes.oneOfType([PropTypes.object]).isRequired,
  form: PropTypes.oneOfType([PropTypes.object]).isRequired,
  label: PropTypes.string.isRequired,
};

CustomColorPicker.defaultProps = {};

export default CustomColorPicker;
