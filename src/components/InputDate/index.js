import React from 'react';
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers';
import ptBrLocale from 'date-fns/locale/pt-BR';
import { TextField } from '@material-ui/core';
import styled from 'styled-components';

const StyledTextField = styled(TextField)`
  & .MuiOutlinedInput-root{
    background: white;
  }
  & .MuiOutlinedInput-input{
    padding: 12px 12px;
  }
  & .MuiInputLabel-outlined[data-shrink='false']{
    transform: translate(14px, 14px) scale(1);
  }
`

const InputDate = props => (
  <MuiPickersUtilsProvider utils={DateFnsUtils} locale={ptBrLocale}>
    <KeyboardDatePicker
      format="dd/MM/yyyy"
      variant="inline"
      invalidDateMessage="Data inválida"
      TextFieldComponent={textProps => (
        <StyledTextField {...textProps} variant="outlined" />
      )}
      {...props}
    />
  </MuiPickersUtilsProvider>
);

export default InputDate;
