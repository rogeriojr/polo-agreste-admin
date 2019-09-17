import React from 'react';
import PropTypes from 'prop-types';
import CustomButton from 'components/form/components/CustomButton';
import { InputContainer } from 'components/form/StyledComponents';

const FormButtons = ({
  handleBack,
  handleBackLabel,
  handleBackIcon,
  submitIcon,
  submitText,
  isLoading,
}) => (
  <InputContainer style={{ justifyContent: 'flex-end', margin: 20 }}>
    {typeof handleBack === 'function' && (
      <CustomButton
        style={{
          width: 'auto',
          marginRight: 5,
          paddingRight: 20,
          paddingLeft: 20,
          backgroundColor: '#797d80',
        }}
        onClick={handleBack}
        variant="contained"
        label={handleBackLabel}
        color="primary"
        Icon={handleBackIcon}
      />
    )}
    <CustomButton
      type="submit"
      style={{
        width: 'auto',
        paddingRight: 20,
        paddingLeft: 20,
        backgroundColor: '#ce4899',
      }}
      label={submitText}
      Icon={submitIcon}
      isLoading={isLoading}
    />
  </InputContainer>
);

FormButtons.propTypes = {
  handleBack: PropTypes.oneOfType([PropTypes.bool, PropTypes.func]).isRequired,
  submitText: PropTypes.string.isRequired,
  handleBackLabel: PropTypes.string,
  submitIcon: PropTypes.oneOfType([PropTypes.any, PropTypes.bool]),
  handleBackIcon: PropTypes.oneOfType([PropTypes.any, PropTypes.bool]),
  isLoading: PropTypes.bool,
};

FormButtons.defaultProps = {
  handleBackLabel: 'Voltar',
  submitIcon: false,
  handleBackIcon: false,
  isLoading: false,
};

export default FormButtons;
