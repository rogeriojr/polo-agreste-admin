import React from 'react';
import { Formik, Field } from 'formik';
import * as Yup from 'yup';
import { Button, Typography } from '@material-ui/core';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import CircularProgress from '@material-ui/core/CircularProgress';
import { InputContainer, InputItem } from 'components/form/StyledComponents';
import CustomTextField from 'components/form/components/CustomTextField';
import CustomSimpleCheckbox from 'components/form/components/CustomSimpleCheckbox';

export const formInitialValues = {
  email: '',
  password: '',
  rememberMe: false,
};

const schema = Yup.object().shape({
  email: Yup.string()
    .email('Este email não é valido')
    .required('Este campo é obrigatório'),
  password: Yup.string().required('Este campo é obrigatório'),
  rememberMe: Yup.bool(),
});

const LoginForm = ({
  onFormSubmit,
  initialValues = formInitialValues,
  isLoading,
  classes,
  error,
}) => (
  <div>
    <Formik
      initialValues={initialValues}
      validationSchema={schema}
      onSubmit={onFormSubmit}
    >
      {({ handleSubmit }) => (
        <form onSubmit={handleSubmit}>
          <InputContainer>
            <InputItem>
              <Field name="email" label="Email" component={CustomTextField} />
            </InputItem>
          </InputContainer>
          <InputContainer>
            <InputItem>
              <Field
                name="password"
                label="Senha"
                component={CustomTextField}
                type="password"
              />
            </InputItem>
          </InputContainer>
          {error ? (
            <Typography paragraph className={classes.errorMessage}>
              * {error}
            </Typography>
          ) : null}
          <div className={classes.buttonsContainer}>
            <div className={classes.checkRememberContainer}>
              <Field
                name="rememberMe"
                label="Lembrar-me"
                component={CustomSimpleCheckbox}
                className={classes.checkRemember}
              />
            </div>

            <Button
              color="primary"
              className={classNames(classes.boxBtn, 'bt-out-orange')}
              type="submit"
              disabled={isLoading}
            >
              Login
              {isLoading && (
                <span>
                  &nbsp;
                  <CircularProgress size={12} />
                </span>
              )}
            </Button>
          </div>
        </form>
      )}
    </Formik>
  </div>
);

LoginForm.propTypes = {
  onFormSubmit: PropTypes.func.isRequired,
  submitText: PropTypes.string,
  handleBack: PropTypes.oneOfType([PropTypes.bool, PropTypes.func]),
  isLoading: PropTypes.bool.isRequired,
  initialValues: PropTypes.oneOfType(PropTypes.object),
};

LoginForm.defaultProps = {
  initialValues: formInitialValues,
  submitText: 'Salvar',
  handleBack: false,
};

export default LoginForm;
