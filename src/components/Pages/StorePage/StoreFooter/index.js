import React from 'react';
import LegendContainer from 'components/Legend/LegendContainer';
import LegendRow from 'components/Legend/LegendRow';
import LegendItem from 'components/Legend/LegendItem';

const StoreFooter = () => (
  <LegendContainer>
    <LegendRow>
      <LegendItem color="#286de5" letter="A">
        Ativo
      </LegendItem>
      <LegendItem color="#9B6B34" letter="B">
        Bloqueada
      </LegendItem>
      <LegendItem color="#EFA700" letter="A">
        Aguardando aprovação
      </LegendItem>
    </LegendRow>
  </LegendContainer>
);

export default StoreFooter;
