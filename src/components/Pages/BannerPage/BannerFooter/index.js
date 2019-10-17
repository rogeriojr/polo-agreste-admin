import React from 'react';
import LegendContainer from 'components/Legend/LegendContainer';
import LegendRow from 'components/Legend/LegendRow';
import LegendItem from 'components/Legend/LegendItem';

const BannerFooter = () => (
  <LegendContainer>
    <LegendRow>
      <LegendItem color="#00A146" letter="A">
        Ativo
      </LegendItem>
      <LegendItem color="#FF5151" letter="I">
        Inativo
      </LegendItem>
    </LegendRow>
  </LegendContainer>
);

export default BannerFooter;
