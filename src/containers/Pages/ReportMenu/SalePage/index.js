import React from 'react';
import HeaderComponent from 'components/HeaderComponent';
import PageBase from 'components/PageBase';
import SaleReport from 'components/Pages/SalePage';
import InputDate from 'components/InputDate';
import HeaderButton from 'components/HeaderComponent/HeaderButton';
import HeaderFab from 'components/HeaderComponent/HeaderFab';
import HeaderBoxContainer from 'components/HeaderComponent/HeaderBoxContainer';
import HeaderBoxItem from 'components/HeaderComponent/HeaderBoxItem';
import { Formik, Field, Form } from 'formik';
import CustomDateRange from 'components/form/components/CustomDateRange';

const SalePage = () => {
  const [localState, setLocalState] = React.useState({
    startDate: new Date(),
    endDate: new Date(),
  });

  const changeStartDate = startDate => {
    setLocalState(oldState => ({
      ...oldState,
      startDate,
    }));
  };

  const changeEndDate = endDate => {
    setLocalState(oldState => ({
      ...oldState,
      endDate,
    }));
  };

  return (
    <PageBase>
      <Formik
        render={() => (
          <Form>
            <HeaderComponent title="Relatório de Vendas">
              <HeaderBoxContainer style={{ paddingLeft: 12 }}>
                <HeaderBoxItem style={{ paddingTop: 12, paddingRight: 6 }}>
                  Busca
                </HeaderBoxItem>
                <HeaderBoxItem style={{ paddingLeft: 6, paddingRight: 6 }}>
                  <Field name="dateStartEnd" component={CustomDateRange} />
                </HeaderBoxItem>
                <HeaderBoxItem style={{ paddingLeft: 6, paddingRight: 6 }}>
                  <HeaderFab icon="search" />
                </HeaderBoxItem>
                <HeaderBoxItem style={{ paddingLeft: 6 }}>
                  <HeaderButton icon="search">Busca Avançada</HeaderButton>
                </HeaderBoxItem>
              </HeaderBoxContainer>
            </HeaderComponent>
          </Form>
        )}
      />
      <SaleReport />
    </PageBase>
  );
};

export default SalePage;
