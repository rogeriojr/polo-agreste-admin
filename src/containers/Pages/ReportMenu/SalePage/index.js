import React from 'react';
import HeaderComponent from 'components/HeaderComponent';
import PageBase from 'components/PageBase';
import SaleReport from 'components/Pages/SalePage';
import InputDate from 'components/InputDate';
import HeaderButton from 'components/HeaderComponent/HeaderButton';
import HeaderFab from 'components/HeaderComponent/HeaderFab';
import HeaderBoxContainer from 'components/HeaderComponent/HeaderBoxContainer';
import HeaderBoxItem from 'components/HeaderComponent/HeaderBoxItem';

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
      <HeaderComponent title="Relatório de Vendas">
        <HeaderBoxContainer style={{ paddingLeft: 12 }}>
          <HeaderBoxItem style={{ paddingTop: 12, paddingRight: 6 }}>
            Busca
          </HeaderBoxItem>
          <HeaderBoxItem style={{ paddingLeft: 6, paddingRight: 6 }}>
            <InputDate
              label="Data Inicial"
              value={localState.startDate}
              onChange={changeStartDate}
            />
          </HeaderBoxItem>
          <HeaderBoxItem style={{ paddingLeft: 6, paddingRight: 6 }}>
            <InputDate
              label="Data Final"
              value={localState.endDate}
              onChange={changeEndDate}
            />
          </HeaderBoxItem>
          <HeaderBoxItem style={{ paddingLeft: 6, paddingRight: 6 }}>
            <HeaderFab icon="search" />
          </HeaderBoxItem>
          <HeaderBoxItem style={{ paddingLeft: 6 }}>
            <HeaderButton icon="search">Busca Avançada</HeaderButton>
          </HeaderBoxItem>
        </HeaderBoxContainer>
      </HeaderComponent>
      <SaleReport />
    </PageBase>
  );
};

export default SalePage;
