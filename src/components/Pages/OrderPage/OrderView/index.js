import React from 'react';
import PropTypes from 'prop-types';
import HeaderComponent from 'components/HeaderComponent';
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
import { toPrice, formatPaymentType } from 'utils/converters';

const OrderView = ({ orderInfo }) => {
  let totalValue = 0;
  let totalQuantity = 0;
  orderInfo.products.forEach(orderItem => {
    totalValue += Number(orderItem.price) * Number(orderItem.quantity);
    totalQuantity += Number(orderItem.quantity);
  });
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
            <CardContent>
              <b>Cliente:</b> {orderInfo.user.name} <br />
              <b>Email:</b> Valor desconhecido <br />
              <b>Telefone principal:</b> {orderInfo.user.cell_phone}<br />
              <b>CPF:</b> {orderInfo.user.cpf} <br />
              <b>Data de nascimento:</b> Valor desconhecido <br />
              <b>Perfil de cliente:</b> Valor desconhecido <br />
            </CardContent>
          </Card>
        </Box>
        <Box flexGrow={1} p={1}>
          <Card style={{ height: '100%' }}>
            <CardHeader title="Dados da entrega" />
            <CardContent>
              <b>Centro de distribuição:</b> Desconhecido <br />
              <b>Endereço:</b> {orderInfo.address.street}
              {orderInfo.address.number && (
                <>, Nº {orderInfo.address.number} </>
              )}
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
          {orderInfo.products.length > 0 && (
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>REF.</TableCell>
                  <TableCell>PRODUTO</TableCell>
                  <TableCell>PREÇO ORIGINAL</TableCell>
                  <TableCell>ACRÉSCIMOS</TableCell>
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
                    <TableCell>Não def.</TableCell>
                    <TableCell>{orderItem.product.name}</TableCell>
                    <TableCell>Não def.</TableCell>
                    <TableCell>Não def.</TableCell>
                    <TableCell>Não def.</TableCell>
                    <TableCell>R$ {toPrice(orderItem.price)}</TableCell>
                    <TableCell>{orderItem.quantity}</TableCell>
                    <TableCell align="right">
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
                  <TableCell align="right">R$ {toPrice(totalValue)}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell colSpan={6}>&nbsp;</TableCell>
                  <TableCell>
                    <b>Frete</b>
                  </TableCell>
                  <TableCell align="right">R$ XX,XX</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell colSpan={6}>&nbsp;</TableCell>
                  <TableCell>
                    <b>Total</b>
                  </TableCell>
                  <TableCell align="right">
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
            <CardHeader title="Forma de Pagamento" />
            <CardContent>
              <b>Valor:</b> R$ {toPrice(orderInfo.price)} <br />
              <b>Forma:</b> {formatPaymentType(orderInfo.payment_type)} <br />
              <b>Parcelas:</b> Valor desconhecido <br />
              <b>ID Pedido Wirecard:</b> Valor desconhecido <br />
              <b>ID Pagamento Wirecard:</b> Valor desconhecido
            </CardContent>
          </Card>
        </Box>
        <Box flexGrow={1} p={1}>
          <Card style={{ height: '100%' }}>
            <CardHeader title="Notas fiscais" />
            <CardContent style={{ textAlign: 'center' }}>
              Nenhuma nota fiscal cadastrada
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
