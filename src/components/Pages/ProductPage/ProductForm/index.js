import React from 'react';
import { Formik, FastField, Form, Field } from 'formik';
import * as Yup from 'yup';
import PropTypes from 'prop-types';
import {
  Card,
  Typography,
  Icon,
  Box,
  CircularProgress,
} from '@material-ui/core';
import { Tab, Tabs } from 'components/Layout/Tabs';
import { InputContainer, InputItem } from 'components/form/StyledComponents';
import CustomTextField from 'components/form/components/CustomTextField';
import CustomSelect from 'components/form/components/CustomSelect';
import FormButtons from 'components/form/components/FormButtons';
import CustomRichText from 'components/form/components/CustomRichText';
import { useDispatch, useSelector } from 'react-redux';
import { Creators as CategoryCreators } from 'store/ducks/category';
import { Creators as StoreCreators } from 'store/ducks/stores';
import { Creators as ProductCreators } from 'store/ducks/product';
import { Creators as ProductColorCreators } from 'store/ducks/productColor';
import { Creators as ProductSizeCreators } from 'store/ducks/productSize';
import CustomCurrencyField from 'components/form/components/CustomCurrencyField';
import VariationField from 'components/Pages/ProductPage/ProductForm/VariationField';
import ProductImageField from 'components/Pages/ProductPage/ProductImageField';
import {
  CustomCheckboxGroup,
  CustomCheckboxGroupItem,
} from 'components/form/components/CustomCheckboxGroup';
import { CategoryCheckboxGroupItem } from 'components/Pages/ProductPage/ProductForm/CategoryCheckbox';
import { CustomCheckboxGroupNumber } from 'components/form/components/CustomCheckboxGroupNumber';
import {
  CustomObjectCheckboxGroup,
  CustomObjectCheckboxGroupItem,
} from 'components/form/components/CustomObjectCheckboxGroup';
import ProductSelect from 'components/form/components/CustomSearchSelect/ProductSelect';
import ProductsRelated from 'components/Pages/ProductPage/ProductForm/ProductsRelated';

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
  id: '',
  featured: '0',
  code_integration: '',
  genres: [],
  code_ncm: '',
  code_ean: '',
  name: '',
  description: '',
  description_tec: '',
  price_whole: '',
  stock_control: 1,
  stock: '',
  price: '',
  price_discount: '',
  quantity_max: '',
  quantity_min_whole: '',
  quantity_max_whole: '',
  height: '',
  width: '',
  length: '',
  weight: '',
  status: 0,
  store: {},
  categories: [],
  images: '',
  images_data: [],
  images_info: [],
  variations: [],
  related: [],
};

const schema = Yup.object().shape({
  featured: Yup.string(),
  id: Yup.number(),
  code_integration: Yup.string(),
  genres: Yup.array()
    .of(
      Yup.object().shape({
        id: Yup.number(),
      }),
    )
    .required('Selecione um gênero'),
  code_ncm: Yup.string(),
  code_ean: Yup.string(),
  name: Yup.string().required('Campo obrigatório'),
  price_whole: Yup.string().required('Campo obrigatório'),
  description: Yup.string().required('Campo obrigatório'),
  description_tec: Yup.string(),
  stock_control: Yup.string().required('Campo obrigatório'),
  stock: Yup.number(),
  price_discount: Yup.string(),
  quantity_min_whole: Yup.number(),
  height: Yup.string(),
  width: Yup.string(),
  length: Yup.string(),
  weight: Yup.string(),
  status: Yup.number().required('Campo obrigatório'),
  store: Yup.object().shape({
    id: Yup.number(),
  }),
  categories: Yup.array()
    .of(
      Yup.object().shape({
        id: Yup.number(),
      }),
    )
    .required('Selecione uma categoria'),
});

const ProductForm = ({
  onSubmit,
  initialValues = formInitialValues,
  submitText,
  handleBack,
  isLoading,
  stateImages,
  setStateImages,
}) => {
  const dispatch = useDispatch();
  const [value, setValue] = React.useState(0);

  const { category, store, product, productColor, productSize } = useSelector(
    state => state,
  );
  const { productList, productListLoading } = useSelector(
    state => state.product,
  );

  const { categoryList, categoryListLoading } = category;
  const { storeList, storeListLoading } = store;
  const { productImageDeleteLoading } = product;
  const productInfo = product.product;
  const { productColorList, productColorListLoading } = productColor;
  const { productSizeList, productSizeListLoading } = productSize;

  const getInitialData = () => {
    dispatch(CategoryCreators.getCategoryListRequest({ perPage: 1000 }));
    dispatch(StoreCreators.getStoreListRequest({ perPage: 1000 }));
    dispatch(
      ProductColorCreators.getProductColorListRequest({ perPage: 1000 }),
    );
    dispatch(ProductSizeCreators.getProductSizeListRequest({ perPage: 1000 }));
  };

  const searchProduct = searchInfo => {
    dispatch(
      ProductCreators.getProductListRequest({ perPage: 50, ...searchInfo }),
    );
  };

  const onDeleteImageRequest = image => {
    dispatch(
      ProductCreators.getImageProductDeleteRequest({
        id: image.id,
        id_product: productInfo.id,
      }),
    );
  };

  React.useEffect(() => {
    getInitialData();
  }, []);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={schema}
      onSubmit={onSubmit}
      validateOnBlur
      enableReinitialize
      render={({ values, errors }) => (
        <Form>
          <Box display="flex" flexDirection="row" flexWrap="wrap">
            <Box flex="1">
              <Card style={{ padding: 20 }}>
                <InputContainer>
                  <InputItem style={{ flexGrow: 2 }}>
                    <FastField
                      name="name"
                      label="Nome"
                      component={CustomTextField}
                    />
                  </InputItem>
                  <InputItem>
                    <FastField
                      name="status"
                      label="Status"
                      options={[
                        { id: 0, name: 'Inativo' },
                        { id: 1, name: 'Ativo' },
                        { id: 2, name: 'Bloqueado' },
                      ]}
                      component={CustomSelect}
                      placeholder="Status"
                      isLoading={false}
                    />
                  </InputItem>
                </InputContainer>
              </Card>
              <Card style={{ marginTop: 20, marginBottom: 20 }}>
                <InputContainer>
                  <InputItem>
                    <Tabs value={value} onChange={handleChange}>
                      <Tab label="PRODUTO" icon={<Icon>style</Icon>} />
                      <Tab label="GALERIA" icon={<Icon>image</Icon>} />
                      <Tab label="DESCRIÇÕES" icon={<Icon>text_format</Icon>} />
                      {/*<Tab label="CATEGORIAS" icon={<Icon>category</Icon>} /> */}
                      <Tab label="VARIAÇÕES" icon={<Icon>toc</Icon>} />
                      <Tab
                        label="PRODUTOS RELACIONADOS"
                        icon={<Icon>shuffle</Icon>}
                      />
                    </Tabs>
                    {value === 0 && (
                      <TabContainer>
                        <Typography variant="h6">Preços</Typography>
                        <InputContainer>
                          <InputItem>
                            <FastField
                              name="price"
                              label="Preço varejo"
                              component={CustomCurrencyField}
                            />
                          </InputItem>
                          <InputItem>
                            <FastField
                              name="price_whole"
                              label="Preço atacado"
                              component={CustomCurrencyField}
                            />
                          </InputItem>
                        </InputContainer>
                        <Typography variant="h6">Estoques</Typography>
                        <InputContainer>
                          <InputItem>
                            <FastField
                              name="stock_control"
                              label="Controle de estoque"
                              options={[
                                { name: 'Não', id: 0 },
                                { name: 'Sim', id: 1 },
                              ]}
                              component={CustomSelect}
                              placeholder="Controle de estoque"
                              isLoading={false}
                            />
                          </InputItem>
                          <InputItem>
                            <FastField
                              name="stock"
                              type="number"
                              label="Quantidade de estoque"
                              component={CustomTextField}
                            />
                          </InputItem>
                        </InputContainer>
                        <Typography variant="h6">Limite de vendas</Typography>
                        <InputContainer>
                          <InputItem>
                            <FastField
                              name="quantity_max"
                              type="number"
                              label="Quantidade máxima de varejo"
                              component={CustomTextField}
                            />
                          </InputItem>
                          <InputItem>
                            <FastField
                              name="quantity_min_whole"
                              type="number"
                              label="Quantidade minima de atacado"
                              component={CustomTextField}
                            />
                          </InputItem>
                          <InputItem>
                            <FastField
                              name="quantity_max_whole"
                              type="number"
                              label="Quantidade máxima de atacado"
                              component={CustomTextField}
                            />
                          </InputItem>
                        </InputContainer>
                        <Typography variant="h6">Dimensões</Typography>
                        <InputContainer>
                          <InputItem>
                            <FastField
                              name="width"
                              label="Largura"
                              component={CustomTextField}
                              endAdornment="cm"
                            />
                          </InputItem>
                          <InputItem>
                            <FastField
                              name="height"
                              label="Altura"
                              component={CustomTextField}
                              endAdornment="cm"
                            />
                          </InputItem>
                        </InputContainer>
                        <InputContainer>
                          <InputItem>
                            <FastField
                              name="length"
                              label="Profundidade"
                              component={CustomTextField}
                              endAdornment="cm"
                            />
                          </InputItem>
                          <InputItem>
                            <FastField
                              name="weight"
                              label="Peso"
                              component={CustomTextField}
                              endAdornment="g"
                            />
                          </InputItem>
                        </InputContainer>
                        <Typography variant="h6">Códigos</Typography>
                        <InputContainer>
                          <InputItem>
                            <FastField
                              name="code_ean"
                              label="Código EAN"
                              component={CustomTextField}
                            />
                          </InputItem>
                          <InputItem>
                            <FastField
                              name="code_ncm"
                              label="Código NCM"
                              component={CustomTextField}
                            />
                          </InputItem>
                          <InputItem>
                            <FastField
                              name="code_integration"
                              label="Código de integração"
                              component={CustomTextField}
                            />
                          </InputItem>
                        </InputContainer>
                        <Typography variant="h6">Empresa</Typography>
                        <InputContainer>
                          <InputItem>
                            <Field
                              name="store.id"
                              label="Loja"
                              options={storeList}
                              component={CustomSelect}
                              placeholder="Loja"
                              isLoading={storeListLoading}
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
                              name="images"
                              label="Galeria"
                              component={ProductImageField}
                              images={values.images_info}
                              deleteLoading={productImageDeleteLoading}
                              onDeleteRequest={onDeleteImageRequest}
                              localState={stateImages}
                              setLocalState={setStateImages}
                              isMulti
                            />
                          </InputItem>
                        </InputContainer>
                      </TabContainer>
                    )}
                    {value === 2 && (
                      <TabContainer>
                        <InputContainer>
                          <InputItem style={{ width: '50%' }}>
                            <FastField
                              name="description"
                              label="Descrição"
                              component={CustomRichText}
                            />
                          </InputItem>
                        </InputContainer>
                        <InputContainer>
                          <InputItem style={{ width: '50%' }}>
                            <FastField
                              name="description_tec"
                              label="Descrição técnica"
                              component={CustomRichText}
                            />
                          </InputItem>
                        </InputContainer>
                      </TabContainer>
                    )}
                    {/*
                    {value === 3 && (
                      <TabContainer>
                        <Typography variant="h6">Categorias</Typography>
                        <InputContainer>
                          <InputItem>
                            <Field
                              name="categories"
                              label="Categoria"
                              options={categoryList}
                              component={CustomSelect}
                              placeholder="Categoria"
                              isMulti
                              isLoading={categoryListLoading}
                            />
                          </InputItem>
                        </InputContainer>
                      </TabContainer>
                    )}
                    */}
                    {value === 3 && (
                      <TabContainer>
                        <Field
                          name="variations"
                          label="Variations"
                          component={VariationField}
                          placeholder="Variações"
                          colors={productColorList}
                          sizes={productSizeList}
                          isLoadingColor={productColorListLoading}
                          isLoadingSize={productSizeListLoading}
                        />
                      </TabContainer>
                    )}
                    {value === 4 && (
                      <TabContainer>
                        <Typography variant="h6">
                          Produtos Relacionados
                        </Typography>
                        <InputContainer>
                          <InputItem style={{ width: '50%' }}>
                            <Field
                              name="related"
                              label="Produtos"
                              options={productList}
                              component={ProductSelect}
                              placeholder="Produtos"
                              isMulti
                              search={searchProduct}
                              isLoading={productListLoading}
                            />
                          </InputItem>
                        </InputContainer>
                        <InputContainer>
                          <InputItem>
                            <Field
                              name="products_preview"
                              component={ProductsRelated}
                              items={productList}
                              isLoading={productListLoading}
                            />
                          </InputItem>
                        </InputContainer>
                      </TabContainer>
                    )}
                  </InputItem>
                </InputContainer>
              </Card>
            </Box>
            <Box style={{ minWidth: 300 }}>
              <Card style={{ marginLeft: 20, padding: 20 }}>
                <Typography variant="h6">Gêneros</Typography>
                <Box style={{ marginTop: 20 }}>
                  <Typography style={styles.purpleTitle}>Adulto</Typography>
                  <Field name="genres" component={CustomObjectCheckboxGroup}>
                    <Field
                      label="Homem"
                      value={{ id: 1, name: 'Homem' }}
                      component={CustomObjectCheckboxGroupItem}
                    />
                    <Field
                      label="Mulher"
                      value={{ id: 2, name: 'Mulher' }}
                      component={CustomObjectCheckboxGroupItem}
                    />
                  </Field>
                </Box>
                <Box style={{ marginTop: 20 }}>
                  <Typography style={styles.purpleTitle}>Criança</Typography>
                  <Field name="genres" component={CustomObjectCheckboxGroup}>
                    <Field
                      label="Menino"
                      value={{ id: 3, name: 'Menino' }}
                      component={CustomObjectCheckboxGroupItem}
                    />
                    <Field
                      label="Menina"
                      value={{ id: 4, name: 'Menina' }}
                      component={CustomObjectCheckboxGroupItem}
                    />
                  </Field>
                </Box>
                <Box style={{ marginTop: 20 }}>
                  <Typography style={styles.purpleTitle}>Bebê</Typography>
                  <Field name="genres" component={CustomObjectCheckboxGroup}>
                    <Field
                      label="Masculino"
                      value={{ id: 5, name: 'Masculino' }}
                      component={CustomObjectCheckboxGroupItem}
                    />
                    <Field
                      label="Feminino"
                      value={{ id: 6, name: 'Feminino' }}
                      component={CustomObjectCheckboxGroupItem}
                    />
                  </Field>
                </Box>
                {typeof errors.genres !== 'undefined' && (
                  <Typography style={{ color: 'red' }}>
                    {errors.genres}
                  </Typography>
                )}
              </Card>

              <Card
                style={{
                  marginLeft: 20,
                  marginTop: 20,
                  paddingTop: 20,
                  paddingLeft: 20,
                  paddingRight: 20,
                }}
              >
                <Typography variant="h6">Categorias de Produtos</Typography>
                <Box
                  style={{ maxHeight: 200, overflow: 'auto', marginTop: 10 }}
                >
                  {categoryList.length > 0 && (
                    <>
                      {categoryList
                        .filter(
                          item =>
                            Object.keys(item.category_father).length === 0,
                        )
                        .map(item => (
                          <Box
                            key={item.id}
                            style={{ marginTop: 10, marginLeft: 10 }}
                          >
                            <Box>
                              <Field
                                name="categories"
                                component={CustomObjectCheckboxGroup}
                              >
                                <Field
                                  label={item.name}
                                  name="categories"
                                  value={{ id: item.id, name: item.name }}
                                  component={CustomObjectCheckboxGroupItem}
                                />
                              </Field>
                            </Box>
                            <Box
                              display="flex"
                              flexDirection="column"
                              style={{ marginLeft: 25 }}
                            >
                              {item.category_child.map(item => (
                                <Field
                                  name="categories"
                                  component={CustomObjectCheckboxGroup}
                                >
                                  <Field
                                    label={item.name}
                                    name="categories"
                                    value={{ id: item.id, name: item.name }}
                                    component={CustomObjectCheckboxGroupItem}
                                  />
                                </Field>
                              ))}
                            </Box>
                          </Box>
                        ))}
                    </>
                  )}
                </Box>
                {typeof errors['categories'] != 'undefined' && (
                  <Box>
                    <Typography style={{ color: 'red' }}>
                      {errors['categories']}
                    </Typography>
                  </Box>
                )}
                {categoryListLoading && (
                  <Box flex="1" display="flex" justifyContent="center">
                    <CircularProgress size={25} style={{ color: '#003B40' }} />
                  </Box>
                )}
                <FormButtons
                  handleBack={handleBack}
                  isLoading={isLoading}
                  submitText={submitText}
                />
              </Card>
            </Box>
          </Box>
        </Form>
      )}
    />
  );
};

const styles = {
  purpleTitle: {
    color: '#003B40',
    fontWeight: 'bold',
    fontSize: 16,
  },
};

ProductForm.propTypes = {
  onSubmit: PropTypes.func,
  initialValues: PropTypes.oneOfType([PropTypes.object]),
  submitText: PropTypes.string,
  handleBack: PropTypes.oneOfType([PropTypes.bool, PropTypes.func]),
  isLoading: PropTypes.bool.isRequired,
};

ProductForm.defaultProps = {
  initialValues: formInitialValues,
  submitText: 'Salvar',
  handleBack: false,
  onSubmit: () => {},
};

export default ProductForm;
