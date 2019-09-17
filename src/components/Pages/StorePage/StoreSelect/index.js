import React from 'react';
import { InputContainer, InputItem } from 'components/form/StyledComponents';
import CustomSelect from 'components/form/components/CustomSelect';
import { Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    height: 140,
    width: 100,
  },
  control: {
    padding: theme.spacing(2),
  },
}));

const StoreSelect = ({ list, isLoading, onChange }) => {
  const classes = useStyles();
  const replaceSelect = {
    setFieldValue: (event, newValue) => {
      onChange(newValue);
    },
  };

  return (
    <Grid container className={classes.root} spacing={2} justify="center">
      <Grid item xs={6}>
        <center>
          <Typography variant="h6">Selecione uma loja</Typography>
          <br />
          <InputContainer>
            <InputItem>
              <CustomSelect
                name="store_select"
                label="Selecione"
                field={{ value: '' }}
                options={list}
                component={CustomSelect}
                placeholder="Selecione"
                isLoading={isLoading}
                form={replaceSelect}
              />
            </InputItem>
          </InputContainer>
        </center>
      </Grid>
    </Grid>
  );
};

export default StoreSelect;
