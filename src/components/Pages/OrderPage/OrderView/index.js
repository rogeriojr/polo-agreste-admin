import React from 'react';
import PropTypes from 'prop-types';
import HeaderComponent from 'components/HeaderComponent';
import styled from 'styled-components';
import {
  Card,
  CardHeader,
  CardContent,
  Box,
  Table,
  TableBody,
  TableHead,
  TableCell,
  TableRow,
  TableFooter,
} from '@material-ui/core';
import { toPrice, formatPaymentType, formatStoresName } from 'utils/converters';
import StatusOrderForm from 'components/Pages/OrderPage/OrderView/StatusOrderForm';
import { useDispatch } from 'react-redux';
import { Creators as OrderCreators } from 'store/ducks/order';

const StyledImg = styled('img')`
  && {
    max-height: 60px;
    max-width: 60px;
  }
`;

const OrderView = ({ orderInfo }) => {

  const dispatch = useDispatch();

  let totalValue = 0;
  let totalQuantity = 0;
  orderInfo.products.forEach(orderItem => {
    totalValue += Number(orderItem.price) * Number(orderItem.quantity);
    totalQuantity += Number(orderItem.quantity);
  });

  const onSubmit = form => {
    dispatch(OrderCreators.getUpdateStatusRequest({ id: orderInfo.id, status: form.status }));
  }


  return (
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
          <Card style={{ height: '100%' }}>
            <CardHeader title="Dados do cliente" />
            <CardContent style={{ lineHeight: 2.0, color: '#4e3e51' }}>
              <span style={{ color: '#ce4899', fontWeight: '500' }}>Cliente:</span> {orderInfo.user.name} <br />
              <span style={{ color: '#ce4899', fontWeight: '500' }}>Email:</span> Valor desconhecido <br />
              <span style={{ color: '#ce4899', fontWeight: '500' }}>Telefone principal:</span> {orderInfo.user.cell_phone}<br />
              <span style={{ color: '#ce4899', fontWeight: '500' }}>CPF:</span> {orderInfo.user.cpf} <br />
              <span style={{ color: '#ce4899', fontWeight: '500' }}>Data de nascimento:</span> Valor desconhecido <br />
              <span style={{ color: '#ce4899', fontWeight: '500' }}>Perfil de cliente:</span> Valor desconhecido <br />
            </CardContent>
          </Card>
        </Box>
        <Box flexGrow={1} p={1}>
          <Card style={{ height: '100%' }}>
            <CardHeader title="Dados da entrega" />
            <CardContent style={{ lineHeight: 2.0, color: '#4e3e51' }}>
              <span style={{ color: '#ce4899', fontWeight: '500' }}>Centro de distribuição:</span> Desconhecido <br />
              <span style={{ color: '#ce4899', fontWeight: '500' }}>Endereço:</span> {orderInfo.address.street}
              {orderInfo.address.number && (
                <>, Nº {orderInfo.address.number} </>
              )}
              {orderInfo.address.complement && (
                <>, {orderInfo.address.complement}</>
              )}
              <br />
              <span style={{ color: '#ce4899', fontWeight: '500' }}>Bairro:</span> {orderInfo.address.district} <br />
              <span style={{ color: '#ce4899', fontWeight: '500' }}>Cidade:</span> {orderInfo.address.city.name} <br />
              <span style={{ color: '#ce4899', fontWeight: '500' }}>CEP:</span> {orderInfo.address.code_post} <br />
              <span style={{ color: '#ce4899', fontWeight: '500' }}>Frete:</span> R$ {toPrice(orderInfo.stores[0].delivery_price)}<br />
              <span style={{ color: '#ce4899', fontWeight: '500' }}>Rastreamento:</span> Desconhecido <br />
              <span style={{ color: '#ce4899', fontWeight: '500' }}>Destinatário:</span> Desconhecido <br />
              <span style={{ color: '#ce4899', fontWeight: '500' }}>Observações:</span> Desconhecido <br /> <br />
              <span style={{ color: '#ce4899', fontWeight: '500' }}>Lojas:</span> <br />
              <span style={{ whiteSpace: 'pre' }}>
                {formatStoresName(orderInfo.stores)}
              </span>
            </CardContent>
          </Card>
        </Box>
        <Box flexGrow={1} p={1}>
          <Card style={{ height: '100%' }}>
            <CardHeader title="Dados do Pagamento" />
            <CardContent style={{ lineHeight: 2.0, color: '#4e3e51' }}>
              <span style={{ color: '#ce4899', fontWeight: '500' }}>Valor:</span> R$ {toPrice(orderInfo.price)} <br />
              <span style={{ color: '#ce4899', fontWeight: '500' }}>Forma:</span> {formatPaymentType(orderInfo.payment_type)} <br />
              <span style={{ color: '#ce4899', fontWeight: '500' }}>Parcelas:</span> Valor desconhecido <br />
            </CardContent>
            <StatusOrderForm initialValues={{ status: orderInfo.status }} onSubmit={onSubmit} />
          </Card>
        </Box>
      </Box>
      <Box paddingTop={1}>
        <Card>
          <CardHeader title="Produtos" />
          {orderInfo.products.length > 0 && (
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>COD.</TableCell>
                  <TableCell>IMAGEM</TableCell>
                  <TableCell>PRODUTO</TableCell>
                  <TableCell>PREÇO ORIGINAL</TableCell>
                  <TableCell>DESCONTOS</TableCell>
                  <TableCell>PREÇO DE VENDA</TableCell>
                  <TableCell>QTD</TableCell>
                  <TableCell>TOTAL</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {orderInfo.products.map((orderItem, i) => (
                  // eslint-disable-next-line react/no-array-index-key
                  <TableRow key={i}>
                    <TableCell>{orderItem.product.id}</TableCell>
                    <TableCell><StyledImg src={orderItem.product.images[0].sizes.small}/></TableCell>
                    <TableCell>{orderItem.product.name}</TableCell>
                    <TableCell>R$ {toPrice(orderItem.price)}</TableCell>
                    <TableCell>R$ 00,00</TableCell>
                    <TableCell>R$ {toPrice(orderItem.price)}</TableCell>
                    <TableCell>{orderItem.quantity}</TableCell>
                    <TableCell align="left">
                      R${` `}
                      {toPrice(
                        Number(orderItem.price) * Number(orderItem.quantity),
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
              <TableFooter>
                <TableRow>
                  <TableCell colSpan={6}>
                    <b>Subtotal</b>
                  </TableCell>
                  <TableCell>{totalQuantity}</TableCell>
                  <TableCell align="left">R$ {toPrice(totalValue)}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell colSpan={6}>&nbsp;</TableCell>
                  <TableCell>
                    <b>Frete</b>
                  </TableCell>
                  <TableCell align="left">R$ XX,XX</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell colSpan={6}>&nbsp;</TableCell>
                  <TableCell>
                    <b>Total</b>
                  </TableCell>
                  <TableCell align="left">
                    R$ {toPrice(orderInfo.price)}
                  </TableCell>
                </TableRow>
              </TableFooter>
            </Table>
          )}
        </Card>
      </Box>
      <Box
        display="flex"
        flexDirection="row"
        justifyContent="center"
        flexWrap="wrap"
        alignItems="stretch"
        marginLeft={-1}
        marginRight={-1}
        paddingTop={1}
      >
        <Box flexGrow={1} p={1}>
          <Card style={{ height: '100%' }}>
            <CardHeader title="Notas fiscais" />
            <CardContent style={{ textAlign: 'center', color: '#4e3e51' }}>
              Nenhuma nota fiscal cadastrada
            </CardContent>
          </Card>
        </Box>
      </Box>
      <Box
        display="flex"
        flexDirection="row"
        justifyContent="center"
        flexWrap="wrap"
        alignItems="stretch"
        marginLeft={-1}
        marginRight={-1}
        paddingTop={1}
      >
        <Box flexGrow={1} p={1}>
          <Card style={{ height: '100%' }}>
            <CardHeader title="Histórico" />
            <CardContent style={{ textAlign: 'center', color: '#4e3e51' }}>
              Nenhum pedido no histórico
            </CardContent>
          </Card>
        </Box>
      </Box>
    </div>
  );
};

OrderView.propTypes = {
  orderInfo: PropTypes.oneOfType([PropTypes.object]).isRequired,
};

export default OrderView;
