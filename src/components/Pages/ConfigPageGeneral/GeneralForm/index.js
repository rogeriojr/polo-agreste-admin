import React from 'react';
import { Formik, FastField, Form, Field } from 'formik';
import * as Yup from 'yup';
import PropTypes from 'prop-types';
import { Card, Typography, Box } from '@material-ui/core';
import { Tab, Tabs } from 'components/Layout/Tabs';
import { InputContainer, InputItem } from 'components/form/StyledComponents';
import CustomTextField from 'components/form/components/CustomTextField';
import CustomSelect from 'components/form/components/CustomSelect';
import FormButtons from 'components/form/components/FormButtons';
import { useDispatch, useSelector } from 'react-redux';
import { Creators as CategoryCreators } from 'store/ducks/category';
import { Creators as StoreCreators } from 'store/ducks/stores';
import CustomCurrencyField from 'components/form/components/CustomCurrencyField';
import HeaderButton from 'components/HeaderComponent/HeaderButton';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import {
  CustomRadioGroup,
  CustomRadioGroupItem,
} from 'components/form/components/CustomRadioGroup';

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

const TabContainer = ({ children }) => {
  return (
    <Typography component="div" style={{ padding: 8 * 3 }}>
      {children}
    </Typography>
  );
};

TabContainer.propTypes = {
  children: PropTypes.node.isRequired,
};

export const formInitialValues = {
  show_product_price: '',
  price_default_alteration: '',
  product_register_configuration: '',
  store_publication: '',
  products_comments: '',
  reCAPTCHA_insert: '',
  alteration_status_restriction_NF: '',
  alteration_status_created_NF: '',
  alteration_status_tracking_code: '',
  invoice_request: '',
  min_price_buy: '',
  client_notification: '',
  send_notification: '',
  forcing_completion_NF: '',
  show_mensage_tag: '',
  open: '',
  waiting_pay: '',
  parcial_pay: '',
  not_pay: '',
  pay: '',
  factory: '',
  parcial_factory: '',
  cancel: '',
  waiting_send: '',
  division: '',
  send: '',
  waiting_extract: '',
  delivired: '',
  parcial_delivired: '',
  retorned: '',
  parcial_retorned: '',
  forcing_category_product: '',
  id: '',
  code_integration: '',
  code_ncm: '',
  code_ean: '',
  name: '',
  description: '',
  description_tec: '',
  stock_control: '',
  price: '',
  price_discount: '',
  price_whole: '',
  price_whole_discount: '',
  quantity_max: '',
  quantity_min_whole: '',
  quantity_max_whole: '',
  height: '',
  width: '',
  length: '',
  weight: '',
  store: {},
  categories: [],
};

const schema = Yup.object().shape({
  show_product_price: Yup.string(),
  price_default_alteration: Yup.string(),
  product_register_configuration: Yup.string(),
  store_publication: Yup.string(),
  products_comments: Yup.string(),
  reCAPTCHA_insert: Yup.string(),
  alteration_status_restriction_NF: Yup.string(),
  alteration_status_created_NF: Yup.string(),
  alteration_status_tracking_code: Yup.string(),
  invoice_request: Yup.string(),
  min_price_buy: Yup.string(),
  client_notification: Yup.string(),
  forcing_completion_NF: Yup.string(),
  show_mensage_tag: Yup.string(),
  open: Yup.string(),
  waiting_pay: Yup.string(),
  parcial_pay: Yup.string(),
  not_pay: Yup.string(),
  pay: Yup.string(),
  factory: Yup.string(),
  parcial_factory: Yup.string(),
  cancel: Yup.string(),
  waiting_send: Yup.string(),
  division: Yup.string(),
  send: Yup.string(),
  waiting_extract: Yup.string(),
  delivired: Yup.string(),
  parcial_delivired: Yup.string(),
  retorned: Yup.string(),
  parcial_retorned: Yup.string(),
  forcing_category_product: Yup.string(),
  id: Yup.number(),
  code_integration: Yup.string(),
  code_ncm: Yup.string(),
  code_ean: Yup.string(),
  name: Yup.string().required('Campo obrigatório'),
  description: Yup.string().required('Campo obrigatório'),
  description_tec: Yup.string(),
  stock_control: Yup.string(),
  price: Yup.string(),
  price_discount: Yup.string(),
  price_whole: Yup.string(),
  price_whole_discount: Yup.string(),
  quantity_max: Yup.number(),
  quantity_min_whole: Yup.number(),
  quantity_max_whole: Yup.number(),
  height: Yup.string(),
  width: Yup.string(),
  length: Yup.string(),
  weight: Yup.string(),
  store: Yup.object().shape({
    id: Yup.number(),
  }),
  categories: Yup.array().of(
    Yup.object().shape({
      id: Yup.number(),
    }),
  ),
});

const GeneralForm = ({
  onSubmit,
  initialValues = formInitialValues,
  submitText,
  handleBack,
}) => {
  const dispatch = useDispatch();
  const [value, setValue] = React.useState(0);

  const { category } = useSelector(state => state);

  const { categoryList, categoryListLoading } = category;

  const getInitialData = () => {
    dispatch(CategoryCreators.getCategoryListRequest({ perPage: 1000 }));
    dispatch(StoreCreators.getStoreListRequest({ perPage: 1000 }));
  };

  React.useEffect(() => {
    getInitialData();
  }, []);
  const classes = useStyles();
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={schema}
      onSubmit={onSubmit}
      validateOnBlur
      render={() => (
        <Form>
          <Card style={{ marginTop: 20 }}>
            <Tabs value={value} onChange={handleChange}>
              <Tab label="E-mail" style={{ fontSize: 20 }} />
              <Tab label="Portal" style={{ fontSize: 20 }} />
              <Tab label="Pedidos" style={{ fontSize: 20 }} />
              <Tab label="Produtos" style={{ fontSize: 20 }} />
            </Tabs>
            <hr style={{ marginTop: 0 }} />
            {value === 0 && (
              <TabContainer>
                <Typography style={{ padding: 8 }} variant="h6">
                  Remetente de E-mail
                </Typography>
                <InputContainer style={{ marginBottom: 40 }}>
                  <InputItem>
                    <FastField
                      name="name"
                      label="Informe o Nome"
                      component={CustomCurrencyField}
                    />
                  </InputItem>
                  <InputItem>
                    <FastField
                      name="email"
                      label="E-mail"
                      component={CustomCurrencyField}
                    />
                  </InputItem>
                </InputContainer>
                <hr />
                <Typography style={{ padding: 8 }} variant="h6">
                  Alerta de Estoque mínimo
                </Typography>
                <InputContainer style={{ marginBottom: 40 }}>
                  <InputItem>
                    <FastField
                      name="alert_email"
                      label="E-mail que receberá os alertas (email@exemplo.com)"
                      component={CustomCurrencyField}
                    />
                  </InputItem>
                </InputContainer>
                <hr />
                <Typography style={{ padding: 8 }} variant="h6">
                  Dúvidas e Suporte
                </Typography>
                <InputContainer>
                  <InputItem>
                    <FastField
                      name="commercial_questions_email"
                      label="E-mail para dúvidas comerciais"
                      component={CustomCurrencyField}
                    />
                  </InputItem>
                  <InputItem>
                    <FastField
                      name="financial_questions_email"
                      label="E-mail para dúvidas financeiras"
                      component={CustomCurrencyField}
                    />
                  </InputItem>
                </InputContainer>
              </TabContainer>
            )}

            {value === 1 && (
              <TabContainer>
                <InputContainer>
                  <InputItem>
                    <Field
                      name="categories"
                      options={categoryList}
                      component={CustomSelect}
                      placeholder="Utilizar preço padrão dos produtos"
                      isMulti
                      isLoading={categoryListLoading}
                    />
                  </InputItem>
                </InputContainer>
                <hr />

                <Typography style={{ color: '#696969' }} variant="body1">
                  Exibição de preços de produto
                </Typography>
                <InputContainer style={{ marginBottom: 30 }}>
                  <InputItem>
                    <Field
                      name="show_product_price"
                      component={CustomRadioGroup}
                    >
                      <CustomRadioGroupItem
                        label="Produtos mais Vendidos"
                        value="1"
                      />
                      <CustomRadioGroupItem label="Vendas Cupom" value="2" />
                    </Field>
                  </InputItem>
                </InputContainer>
                <hr />
                <InputContainer style={{ marginTop: 40, marginBottom: 40 }}>
                  <InputItem>
                    <Field
                      name="url"
                      label="URL de retorno para gateway de pagamentos (https://exemplo.com.br)"
                      options={categoryList}
                      component={CustomTextField}
                    />
                  </InputItem>
                </InputContainer>
                <hr />
                <Typography style={{ color: '#696969' }} variant="body1">
                  Alteração de valor abaixo do preço padrão
                </Typography>
                <InputContainer style={{ marginBottom: 30 }}>
                  <InputItem>
                    <Field
                      name="price_default_alteration"
                      component={CustomRadioGroup}
                    >
                      <CustomRadioGroupItem
                        label="Permitir o lojista de alterar o valor abaixo do preço padrão cadastrado pelo shopping"
                        value="3"
                      />
                      <CustomRadioGroupItem
                        label="Impedir o lojista de alterar o valor abaixo do preço padrão cadastrado pelo shopping"
                        value="4"
                      />
                    </Field>
                  </InputItem>
                </InputContainer>
                <hr />
                <Typography style={{ color: '#696969' }} variant="body1">
                  Configuração de cadastro de produtos das lojas
                </Typography>
                <InputContainer style={{ marginBottom: 30 }}>
                  <InputItem>
                    <Field
                      name="product_register_configuration"
                      component={CustomRadioGroup}
                    >
                      <CustomRadioGroupItem
                        label="Produtos autorizados por padrão"
                        value="5"
                      />
                      <CustomRadioGroupItem
                        label="Produtos bloqueados por padrão"
                        value="6"
                      />
                    </Field>
                  </InputItem>
                </InputContainer>
                <hr />
                <Typography style={{ color: '#696969' }} variant="body1">
                  Publicação de lojas
                </Typography>
                <InputContainer style={{ marginBottom: 30 }}>
                  <InputItem>
                    <Field
                      name="store_publication"
                      component={CustomRadioGroup}
                    >
                      <CustomRadioGroupItem
                        label="O lojista deve aprovar a publicação da loja"
                        value="7"
                      />
                      <CustomRadioGroupItem
                        label="Produtos bloqueados por padrão"
                        value="8"
                      />
                    </Field>
                  </InputItem>
                </InputContainer>
                <hr />
                <Typography style={{ color: '#696969' }} variant="body1">
                  Avaliações e comentários dos produtos
                </Typography>
                <InputContainer style={{ marginBottom: 30 }}>
                  <InputItem>
                    <Field
                      name="products_comments"
                      component={CustomRadioGroup}
                    >
                      <CustomRadioGroupItem
                        label="Permitir somente comentários acompanhados de avaliação (nota)"
                        value="9"
                      />
                      <CustomRadioGroupItem
                        label="Permitir enviar uma avaliação (nota) sem comentário"
                        value="10"
                      />
                    </Field>
                  </InputItem>
                </InputContainer>
                <hr />
                <Typography style={{ color: '#696969' }} variant="body1">
                  Inserir reCAPTCHA do Google nos formulários de contato
                </Typography>
                <InputContainer style={{ marginBottom: 30 }}>
                  <InputItem>
                    <Field name="reCAPTCHA_insert" component={CustomRadioGroup}>
                      <CustomRadioGroupItem
                        label="Ativar reCAPTCHA (nota)"
                        value="11"
                      />
                      <CustomRadioGroupItem
                        label="O reCAPTCHA deve apenas aparecer para usuários deslogados"
                        value="12"
                      />
                    </Field>
                  </InputItem>
                </InputContainer>
                <InputContainer style={{ marginBottom: 30 }}>
                  <InputItem>
                    <FastField
                      name="key_site"
                      label="Informe a Key do site"
                      component={CustomCurrencyField}
                    />
                  </InputItem>
                  <InputItem>
                    <FastField
                      name="key_secret"
                      label="Informe a Secret Key"
                      component={CustomCurrencyField}
                    />
                  </InputItem>
                </InputContainer>
                <hr />

                <Box style={{ marginTop: 40, marginBottom: 50 }}>
                  <Typography variant="body1">Customize sua marca</Typography>
                  <Box>
                    <HeaderButton
                      style={{ color: '#696969' }}
                      icon="vertical_align_top"
                    >
                      ENVIAR MARCA
                    </HeaderButton>
                  </Box>
                </Box>
                <hr />
              </TabContainer>
            )}

            {value === 2 && (
              <TabContainer>
                <Typography style={{ padding: 8 }} variant="h6">
                  Regras para mudanças de status
                </Typography>
                <Grid container className={classes.root} spacing={2}>
                  <Grid item xs={6}>
                    <Typography style={{ color: '#B5B5B5' }} variant="body1">
                      Restrição de NF para alteração de status para
                      {' "Entregue/Concluído:"'}
                    </Typography>
                    <InputContainer>
                      <InputItem>
                        <Field
                          name="alteration_status_restriction_NF"
                          component={CustomRadioGroup}
                        >
                          <CustomRadioGroupItem
                            label="Pedido não precisa de Nota Fiscal para transição"
                            value="13"
                          />
                          <CustomRadioGroupItem
                            label="Pedido precisa de Nota Fiscal para transição"
                            value="14"
                          />
                        </Field>
                      </InputItem>
                    </InputContainer>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography style={{ color: '#B5B5B5' }} variant="body1">
                      Alteração de status ao criar NF:
                    </Typography>
                    <InputContainer>
                      <InputItem>
                        <Field
                          name="alteration_status_created_NF"
                          component={CustomRadioGroup}
                        >
                          <CustomRadioGroupItem
                            label="Não alterar status do pedido ao informar NF e chave"
                            value="15"
                          />
                          <CustomRadioGroupItem
                            label="Mudar status do pedido para 'Faturado' ao informar NF e chave"
                            value="16"
                          />
                        </Field>
                      </InputItem>
                    </InputContainer>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography style={{ color: '#B5B5B5' }} variant="body1">
                      Alteração de status ao informar código de rastreio:
                    </Typography>
                    <InputContainer>
                      <InputItem>
                        <Field
                          name="alteration_status_tracking_code"
                          component={CustomRadioGroup}
                        >
                          <CustomRadioGroupItem
                            label="Não alterar status do pedido ao informar código de rastreio"
                            value="17"
                          />
                          <CustomRadioGroupItem
                            label="Mudar status do pedido para 'Enviado' ao informar código de rastreio"
                            value="18"
                          />
                        </Field>
                      </InputItem>
                    </InputContainer>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography style={{ color: '#B5B5B5' }} variant="body1">
                      Pedido precisa de Nota Fiscal para adicionar código de
                      rastreio:
                    </Typography>
                    <InputContainer>
                      <InputItem>
                        <Field
                          name="invoice_request"
                          component={CustomRadioGroup}
                        >
                          <CustomRadioGroupItem
                            label="Não precisa de Nota Fiscal para informar código de rastreio"
                            value="19"
                          />
                          <CustomRadioGroupItem
                            label="Precisa de Nota Fiscal para informar código de rastreio"
                            value="20"
                          />
                        </Field>
                      </InputItem>
                    </InputContainer>
                  </Grid>
                </Grid>
                <hr style={{ marginTop: 30 }} />
                <Typography style={{ color: '#B5B5B5' }} variant="body1">
                  Valor mínimo para compra, configurado nos perfis de cliente,
                  será aplicado:
                </Typography>
                <InputContainer>
                  <InputItem>
                    <Field name="min_price_buy" component={CustomRadioGroup}>
                      <CustomRadioGroupItem
                        label="No valor total de cada loja pertencente ao carrinho"
                        value="21"
                      />
                      <CustomRadioGroupItem
                        label="No valor total do carrinho de compras"
                        value="22"
                      />
                    </Field>
                  </InputItem>
                </InputContainer>
                <hr style={{ marginTop: 30 }} />
                <Grid container className={classes.root} spacing={2}>
                  <Grid item xs={6}>
                    <Typography style={{ color: '#B5B5B5' }} variant="body1">
                      Notificar clientes sobre boletos não pagos
                    </Typography>
                    <InputContainer>
                      <InputItem>
                        <Field
                          name="client_notification"
                          component={CustomRadioGroup}
                        >
                          <CustomRadioGroupItem
                            label="Notificar os clientes"
                            value="23"
                          />
                          <CustomRadioGroupItem
                            label="Não notificar os clientes"
                            value="24"
                          />
                        </Field>
                      </InputItem>
                    </InputContainer>
                  </Grid>
                  <Grid item xs={6}>
                    <InputContainer>
                      <InputItem style={{ width: '50%' }}>
                        <Typography
                          style={{ color: '#696969' }}
                          variant="body1"
                        >
                          Reenviar notificação a cada quantos dias?
                        </Typography>
                        <FastField
                          name="number"
                          label="1 dia(s)"
                          component={CustomTextField}
                        />
                      </InputItem>
                    </InputContainer>
                  </Grid>
                </Grid>
                <hr style={{ marginTop: 30 }} />
                <Grid container className={classes.root} spacing={2}>
                  <Grid item xs={6}>
                    <Typography style={{ color: '#B5B5B5' }} variant="body1">
                      Obrigar o preenchimento dos seguintes campos da Nota
                      Fiscal:
                    </Typography>
                    <InputContainer>
                      <InputItem>
                        <Field
                          name="forcing_completion_NF"
                          component={CustomRadioGroup}
                        >
                          <CustomRadioGroupItem label="Número" value="25" />
                          <CustomRadioGroupItem label="Chave" value="26" />
                          <CustomRadioGroupItem label="Link" value="27" />
                        </Field>
                      </InputItem>
                    </InputContainer>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography style={{ color: '#B5B5B5' }} variant="body1">
                      Mostrar mensagem
                      {' "Nota fiscal no interior da Embalagem" '}
                      na etiqueta de envio do pedido:
                    </Typography>
                    <InputContainer>
                      <InputItem>
                        <Field
                          name="show_mensage_tag"
                          component={CustomRadioGroup}
                        >
                          <CustomRadioGroupItem
                            label="Mostrar mensagem na etiqueta de envio do pedido"
                            value="28"
                          />
                        </Field>
                      </InputItem>
                    </InputContainer>
                  </Grid>
                </Grid>
                <hr style={{ marginTop: 30 }} />
                <Typography variant="h6">
                  Transição de Status dos Pedidos
                </Typography>
                <Grid container className={classes.root} spacing={2}>
                  <Grid item xs={6}>
                    <Typography style={{ color: '#B5B5B5' }} variant="body1">
                      Aberto
                    </Typography>
                    <InputContainer>
                      <InputItem>
                        <Field name="open" component={CustomRadioGroup}>
                          <CustomRadioGroupItem
                            label="Permitir alterar para todos os status"
                            value="29"
                          />
                          <CustomRadioGroupItem
                            label="Não permitir alterar para todos os status"
                            value="30"
                          />
                        </Field>
                      </InputItem>
                    </InputContainer>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography style={{ color: '#B5B5B5' }} variant="body1">
                      Aguardando Pagamento
                    </Typography>
                    <InputContainer>
                      <InputItem>
                        <Field name="waiting_pay" component={CustomRadioGroup}>
                          <CustomRadioGroupItem
                            label="Permitir alterar para todos os status"
                            value="31"
                          />
                          <CustomRadioGroupItem
                            label="Não permitir alterar para todos os status"
                            value="32"
                          />
                        </Field>
                      </InputItem>
                    </InputContainer>
                  </Grid>
                </Grid>
                <hr style={{ marginTop: 30 }} />
                <Grid container className={classes.root} spacing={2}>
                  <Grid item xs={6}>
                    <Typography style={{ color: '#B5B5B5' }} variant="body1">
                      Pago parcialmente
                    </Typography>
                    <InputContainer>
                      <InputItem>
                        <Field name="parcial_pay" component={CustomRadioGroup}>
                          <CustomRadioGroupItem
                            label="Permitir alterar para todos os status"
                            value="33"
                          />
                          <CustomRadioGroupItem
                            label="Não permitir alterar para todos os status"
                            value="34"
                          />
                        </Field>
                      </InputItem>
                    </InputContainer>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography style={{ color: '#B5B5B5' }} variant="body1">
                      Não Autorizado/Não Pago:
                    </Typography>
                    <InputContainer>
                      <InputItem>
                        <Field name="not_pay" component={CustomRadioGroup}>
                          <CustomRadioGroupItem
                            label="Permitir alterar para todos os status"
                            value="35"
                          />
                          <CustomRadioGroupItem
                            label="Não permitir alterar para todos os status"
                            value="36"
                          />
                        </Field>
                      </InputItem>
                    </InputContainer>
                  </Grid>
                </Grid>
                <hr style={{ marginTop: 30 }} />
                <Grid container className={classes.root} spacing={2}>
                  <Grid item xs={6}>
                    <Typography style={{ color: '#B5B5B5' }} variant="body1">
                      Aprovado/Pago
                    </Typography>
                    <InputContainer>
                      <InputItem>
                        <Field name="pay" component={CustomRadioGroup}>
                          <CustomRadioGroupItem
                            label="Permitir alterar para todos os status"
                            value="37"
                          />
                          <CustomRadioGroupItem
                            label="Não permitir alterar para todos os status"
                            value="38"
                          />
                        </Field>
                      </InputItem>
                    </InputContainer>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography style={{ color: '#B5B5B5' }} variant="body1">
                      Faturado
                    </Typography>
                    <InputContainer>
                      <InputItem>
                        <Field name="factory" component={CustomRadioGroup}>
                          <CustomRadioGroupItem
                            label="Permitir alterar para todos os status"
                            value="39"
                          />
                          <CustomRadioGroupItem
                            label="Não permitir alterar para todos os status"
                            value="40"
                          />
                        </Field>
                      </InputItem>
                    </InputContainer>
                  </Grid>
                </Grid>
                <hr style={{ marginTop: 30 }} />
                <Grid container className={classes.root} spacing={2}>
                  <Grid item xs={6}>
                    <Typography style={{ color: '#B5B5B5' }} variant="body1">
                      Faturado parcialmente
                    </Typography>
                    <InputContainer>
                      <InputItem>
                        <Field
                          name="parcial_factory"
                          component={CustomRadioGroup}
                        >
                          <CustomRadioGroupItem
                            label="Permitir alterar para todos os status"
                            value="41"
                          />
                          <CustomRadioGroupItem
                            label="Não permitir alterar para todos os status"
                            value="42"
                          />
                        </Field>
                      </InputItem>
                    </InputContainer>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography style={{ color: '#B5B5B5' }} variant="body1">
                      Cancelado
                    </Typography>
                    <InputContainer>
                      <InputItem>
                        <Field name="cancel" component={CustomRadioGroup}>
                          <CustomRadioGroupItem
                            label="Permitir alterar para todos os status"
                            value="43"
                          />
                          <CustomRadioGroupItem
                            label="Não permitir alterar para todos os status"
                            value="44"
                          />
                        </Field>
                      </InputItem>
                    </InputContainer>
                  </Grid>
                </Grid>
                <hr style={{ marginTop: 30 }} />
                <Grid container className={classes.root} spacing={2}>
                  <Grid item xs={6}>
                    <Typography style={{ color: '#B5B5B5' }} variant="body1">
                      Aguardando Envio
                    </Typography>
                    <InputContainer>
                      <InputItem>
                        <Field name="waiting_send" component={CustomRadioGroup}>
                          <CustomRadioGroupItem
                            label="Permitir alterar para todos os status"
                            value="45"
                          />
                          <CustomRadioGroupItem
                            label="Não permitir alterar para todos os status"
                            value="46"
                          />
                        </Field>
                      </InputItem>
                    </InputContainer>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography style={{ color: '#B5B5B5' }} variant="body1">
                      Em separação
                    </Typography>
                    <InputContainer>
                      <InputItem>
                        <Field name="division" component={CustomRadioGroup}>
                          <CustomRadioGroupItem
                            label="Permitir alterar para todos os status"
                            value="47"
                          />
                          <CustomRadioGroupItem
                            label="Não permitir alterar para todos os status"
                            value="48"
                          />
                        </Field>
                      </InputItem>
                    </InputContainer>
                  </Grid>
                </Grid>
                <hr style={{ marginTop: 30 }} />
                <Grid container className={classes.root} spacing={2}>
                  <Grid item xs={6}>
                    <Typography style={{ color: '#B5B5B5' }} variant="body1">
                      Enviado
                    </Typography>
                    <InputContainer>
                      <InputItem>
                        <Field name="send" component={CustomRadioGroup}>
                          <CustomRadioGroupItem
                            label="Permitir alterar para todos os status"
                            value="49"
                          />
                          <CustomRadioGroupItem
                            label="Não permitir alterar para todos os status"
                            value="50"
                          />
                        </Field>
                      </InputItem>
                    </InputContainer>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography style={{ color: '#B5B5B5' }} variant="body1">
                      Aguardando retirada
                    </Typography>
                    <InputContainer>
                      <InputItem>
                        <Field
                          name="waiting_extract"
                          component={CustomRadioGroup}
                        >
                          <CustomRadioGroupItem
                            label="Permitir alterar para todos os status"
                            value="51"
                          />
                          <CustomRadioGroupItem
                            label="Não permitir alterar para todos os status"
                            value="52"
                          />
                        </Field>
                      </InputItem>
                    </InputContainer>
                  </Grid>
                </Grid>
                <hr style={{ marginTop: 30 }} />
                <Grid container className={classes.root} spacing={2}>
                  <Grid item xs={6}>
                    <Typography style={{ color: '#B5B5B5' }} variant="body1">
                      Entregue/Concluído
                    </Typography>
                    <InputContainer>
                      <InputItem>
                        <Field name="delivired" component={CustomRadioGroup}>
                          <CustomRadioGroupItem
                            label="Permitir alterar para todos os status"
                            value="53"
                          />
                          <CustomRadioGroupItem
                            label="Não permitir alterar para todos os status"
                            value="54"
                          />
                        </Field>
                      </InputItem>
                    </InputContainer>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography style={{ color: '#B5B5B5' }} variant="body1">
                      Entregue parcialmente
                    </Typography>
                    <InputContainer>
                      <InputItem>
                        <Field
                          name="parcial_delivired"
                          component={CustomRadioGroup}
                        >
                          <CustomRadioGroupItem
                            label="Permitir alterar para todos os status"
                            value="55"
                          />
                          <CustomRadioGroupItem
                            label="Não permitir alterar para todos os status"
                            value="56"
                          />
                        </Field>
                      </InputItem>
                    </InputContainer>
                  </Grid>
                </Grid>
                <hr style={{ marginTop: 30 }} />
                <Grid container className={classes.root} spacing={2}>
                  <Grid item xs={6}>
                    <Typography style={{ color: '#B5B5B5' }} variant="body1">
                      Devolvido
                    </Typography>
                    <InputContainer>
                      <InputItem>
                        <Field name="retorned" component={CustomRadioGroup}>
                          <CustomRadioGroupItem
                            label="Permitir alterar para todos os status"
                            value="57"
                          />
                          <CustomRadioGroupItem
                            label="Não permitir alterar para todos os status"
                            value="58"
                          />
                        </Field>
                      </InputItem>
                    </InputContainer>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography style={{ color: '#B5B5B5' }} variant="body1">
                      Devolvido parcialmente
                    </Typography>
                    <InputContainer>
                      <InputItem>
                        <Field
                          name="parcial_retorned"
                          component={CustomRadioGroup}
                        >
                          <CustomRadioGroupItem
                            label="Permitir alterar para todos os status"
                            value="59"
                          />
                          <CustomRadioGroupItem
                            label="Não permitir alterar para todos os status"
                            value="60"
                          />
                        </Field>
                      </InputItem>
                    </InputContainer>
                  </Grid>
                </Grid>
                <hr style={{ marginTop: 30 }} />
              </TabContainer>
            )}
            {value === 3 && (
              <TabContainer>
                <Typography style={{ color: '#696969' }} variant="body1">
                  Obrigar que produtos tenham ao menos uma categoria cadastrada
                </Typography>
                <InputContainer>
                  <InputItem>
                    <Field
                      name="forcing_category_product"
                      component={CustomRadioGroup}
                    >
                      <CustomRadioGroupItem
                        label="Produtos cadastrados não são obrigados a ter categorias"
                        value="61"
                      />
                      <CustomRadioGroupItem
                        label="Produtos cadastrados necessitam ter categorias associadas"
                        value="62"
                      />
                    </Field>
                  </InputItem>
                </InputContainer>
                <hr style={{ marginTop: 30 }} />
              </TabContainer>
            )}
            <FormButtons handleBack={handleBack} submitText={submitText} />
          </Card>
        </Form>
      )}
    />
  );
};

GeneralForm.propTypes = {
  onSubmit: PropTypes.func,
  initialValues: PropTypes.oneOfType([PropTypes.object]),
  submitText: PropTypes.string,
  handleBack: PropTypes.oneOfType([PropTypes.bool, PropTypes.func]),
};

GeneralForm.defaultProps = {
  initialValues: formInitialValues,
  submitText: 'Salvar',
  handleBack: false,
  onSubmit: () => {},
};

export default GeneralForm;
