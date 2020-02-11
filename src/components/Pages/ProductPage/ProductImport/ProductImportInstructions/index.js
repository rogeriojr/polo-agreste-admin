import React from 'react';
import PropTypes from 'prop-types';
import { Typography } from '@material-ui/core';
import appIcons from 'constants/appIcons';
import { InputContainer } from 'components/form/StyledComponents';
import CustomButton from 'components/form/components/CustomButton';

const ProductImportInstructions = ({ submitText, submitText2 }) => {
  return (
    <>
      <Typography variant="h6" gutterBottom>
        <br />
        1. Como funciona ?
      </Typography>
      <Typography variant="subtitle1" gutterBottom>
        Para realizar a importação dos produtos o lojista deve possuir um
        arquivo XML, padronizado de acordo com a documentação abaixo, e
        acessível via internet.
        <br />
        <br />
      </Typography>
      <Typography variant="h6" gutterBottom>
        2. Para que serve ?
      </Typography>
      <Typography variant="subtitle1" gutterBottom>
        O XML possui diversas finalidades: Interagem com outras linguagens como
        PHP, em Banco de Dados, troca de informações entre sistemas entre
        outras.
        <br />
        <br />
        Aqui o XML serve para importar informações de produtos como nome,
        descrição, imagens, categorias, preço, entre outras, atualizando assim
        as informações da sua loja apartir de informações disponiveis em outros
        sistemas.
        <br />
        <br />O lojista deve cadastrar a URL do arquivo XML e selecionar a
        periodicidade que esta atualização deverá ocorrer. Lembrando que a
        atualização só ocorrera caso a data do arquivo seja mais recente que a
        ultima importação ocorrida.
      </Typography>
      <InputContainer style={{ float: 'Left' }}>
        <CustomButton
          Icon={appIcons.GetAppIcon}
          label={submitText}
          style={{ backgroundColor: '#003B40', marginRight: 20, marginTop: 10 }}
        />
        <CustomButton
          Icon={appIcons.GetAppIcon}
          label={submitText2}
          style={{ backgroundColor: '#003B40', marginTop: 10 }}
        />
      </InputContainer>
    </>
  );
};

export default ProductImportInstructions;

ProductImportInstructions.propTypes = {
  submitText: PropTypes.string,
  submitText2: PropTypes.string,
};

ProductImportInstructions.defaultProps = {
  submitText: 'BAIXE AQUI o XML exemplo',
  submitText2: 'BAIXE AQUI o XSD, com as regras para a montagem do XML',
};
