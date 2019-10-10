import React from 'react';
import PropTypes from 'prop-types';
import HeaderComponent from 'components/HeaderComponent';
import { Card, CardHeader, CardContent, Box } from '@material-ui/core';

const OrderView = ({ orderInfo }) => (
  <div>
    <HeaderComponent title={`Pedido ${orderInfo.id}`} />
    <Box
      display="flex"
      flexDirection="row"
      justifyContent="center"
      flexWrap="wrap"
      alignItems="stretch"
      marginLeft={-1}
      marginRight={-1}
    >
      <Box flexGrow={1} p={1}>
        <Card>
          <CardHeader title="Dados do cliente" />
          <CardContent>
            <b>Cliente:</b> {orderInfo.user.name} <br />
            <b>Email:</b> Valor desconhecido <br />
            <b>Telefone principal:</b> Valor desconhecido <br />
            <b>CPF:</b> Valor desconhecido <br />
            <b>Data de nascimento:</b> Valor desconhecido <br />
            <b>Perfil de cliente:</b> Valor desconhecido <br />
          </CardContent>
        </Card>
      </Box>
      <Box flexGrow={1} p={1}>
        <Card>
          <CardHeader title="Dados da entrega" />
          <CardContent>
            <b>Centro de distribuição:</b> Desconhecido <br />
            <b>Endereço:</b> {orderInfo.address.street}
            {orderInfo.address.number && <>, Nº {orderInfo.address.number} </>}
            {orderInfo.address.complement && (
              <>, {orderInfo.address.complement}</>
            )}
            <br />
            <b>Bairro:</b> {orderInfo.address.district} <br />
            <b>Cidade:</b> {orderInfo.address.city.name} <br />
            <b>CEP:</b> {orderInfo.address.code_post} <br />
            <b>Frete:</b> Desconhecido <br />
            <b>Rastreamento:</b> Desconhecido <br />
            <b>Destinatário:</b> Desconhecido <br />
            <b>Observações:</b> Desconhecido <br />
          </CardContent>
        </Card>
      </Box>
    </Box>
    <Box paddingTop={1}>
      <Card>
        <CardHeader title="Produtos" />
      </Card>
    </Box>
  </div>
);

OrderView.propTypes = {
  orderInfo: PropTypes.oneOfType([PropTypes.object]).isRequired,
};

export default OrderView;
