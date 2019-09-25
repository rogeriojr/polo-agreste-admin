import React from 'react';
import { Formik, Field } from 'formik';
import * as Yup from 'yup';
import { Button } from '@material-ui/core';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import CircularProgress from '@material-ui/core/CircularProgress';
import { InputContainer, InputItem } from 'components/form/StyledComponents';
import CustomTextField from 'components/form/components/CustomTextField';

export const initialValues = {
  email: '',
  password: '',
};

const schema = Yup.object().shape({
  email: Yup.string()
    .email('Este email não é valido')
    .required('Este campo é obrigatório'),
  password: Yup.string().required('Este campo é obrigatório'),
});

const LoginForm = ({ onFormSubmit, initialValues, isLoading, classes }) => (
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
          <div className={classes.buttonsContainer}>
            <div className={classes.checkRememberContainer}>
              <FormControlLabel
                control={
                  <Checkbox
                    className={classes.checkRemember}
                    checked={false}
                    value="rememberMe"
                    // onChange={onRememberMeChange}
                  />
                }
                label="Lembrar-me"
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
};

LoginForm.defaultProps = {
  initialValues,
  submitText: 'Salvar',
  handleBack: false,
};

export default LoginForm;
