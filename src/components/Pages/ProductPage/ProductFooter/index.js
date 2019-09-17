import React from 'react';
import LegendContainer from 'components/Legend/LegendContainer';
import LegendRow from 'components/Legend/LegendRow';
import LegendItem from 'components/Legend/LegendItem';

const ProductFooter = () => (
  <LegendContainer>
    <LegendRow>
      <LegendItem color="#286de5" letter="A">
        Ativo
      </LegendItem>
      <LegendItem color="#BFC0BF" letter="I">
        Inativo
      </LegendItem>
      <LegendItem color="#EFA700" letter="E">
        Sem Estoque
      </LegendItem>
      <LegendItem color="#B145E6" letter="M">
        Sem Imagem
      </LegendItem>
    </LegendRow>
    <LegendRow>
      <LegendItem color="#9B6B34" letter="B">
        Bloqueado
      </LegendItem>
      <LegendItem color="#00A146" letter="A">
        Aprovado
      </LegendItem>
      <LegendItem color="#FF5151" letter="R">
        Reprovado
      </LegendItem>
      <LegendItem />
    </LegendRow>
  </LegendContainer>
);

export default ProductFooter;
