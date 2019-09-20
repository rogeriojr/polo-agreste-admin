import React from 'react';
import { Formik, FastField, Form, Field } from 'formik';
import * as Yup from 'yup';
import PropTypes from 'prop-types';
import { Card, Typography, Icon } from '@material-ui/core';
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
import { Creators as AttributeCreators } from 'store/ducks/attribute';
import CustomCurrencyField from 'components/form/components/CustomCurrencyField';
import CustomImageField from 'components/form/components/CustomImageField';
import VariationField from 'components/Pages/ProductPage/ProductForm/VariationField';

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
  images: '',
  images_data: [],
  images_info: [],
  variations: [],
};

const schema = Yup.object().shape({
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

const ProductForm = ({
  onSubmit,
  initialValues = formInitialValues,
  submitText,
  handleBack,
  isLoading,
}) => {
  const dispatch = useDispatch();
  const [value, setValue] = React.useState(0);

  const { category, store, product, attribute } = useSelector(state => state);

  const { categoryList, categoryListLoading } = category;
  const { storeList, storeListLoading } = store;
  const { productImageDeleteLoading } = product;
  const productInfo = product.product;
  const { attributeList, attributeListLoading } = attribute;

  const getInitialData = () => {
    dispatch(CategoryCreators.getCategoryListRequest({ perPage: 1000 }));
    dispatch(StoreCreators.getStoreListRequest({ perPage: 1000 }));
    dispatch(AttributeCreators.getAttributeListRequest({ perPage: 1000 }));
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
      render={({ values }) => (
        <Form>
          <Card style={{ padding: 20 }}>
            <InputContainer>
              <InputItem>
                <FastField
                  name="name"
                  label="Nome"
                  component={CustomTextField}
                />
              </InputItem>
            </InputContainer>
          </Card>
          <Card style={{ marginTop: 20 }}>
            <InputContainer>
              <InputItem>
                <Tabs value={value} onChange={handleChange}>
                  <Tab label="PRODUTO" icon={<Icon>style</Icon>} />
                  <Tab label="GALERIA" icon={<Icon>image</Icon>} />
                  <Tab label="DESCRIÇÕES" icon={<Icon>text_format</Icon>} />
                  <Tab label="CATEGORIAS" icon={<Icon>category</Icon>} />
                  <Tab label="VARIAÇÕES" icon={<Icon>toc</Icon>} />
                </Tabs>
                {value === 0 && (
                  <TabContainer>
                    <Typography variant="h6">Preços</Typography>
                    <InputContainer>
                      <InputItem>
                        <FastField
                          name="price"
                          label="Preço padrão"
                          component={CustomCurrencyField}
                        />
                      </InputItem>
                      <InputItem>
                        <FastField
                          name="price_discount"
                          label="Desconto"
                          component={CustomCurrencyField}
                        />
                      </InputItem>
                    </InputContainer>
                    <InputContainer>
                      <InputItem>
                        <FastField
                          name="price_whole"
                          label="Preço total"
                          component={CustomCurrencyField}
                        />
                      </InputItem>
                      <InputItem>
                        <FastField
                          name="price_whole_discount"
                          label="Preço total com desconto"
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
                          name="quantity_max"
                          type="number"
                          label="Quantidade máxima"
                          component={CustomTextField}
                        />
                      </InputItem>
                    </InputContainer>
                    <InputContainer>
                      <InputItem>
                        <FastField
                          name="quantity_min_whole"
                          type="number"
                          label="Quantidade minima total"
                          component={CustomTextField}
                        />
                      </InputItem>
                      <InputItem>
                        <FastField
                          name="quantity_max_whole"
                          type="number"
                          label="Quantidade máxima total"
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
                        />
                      </InputItem>
                      <InputItem>
                        <FastField
                          name="height"
                          label="Altura"
                          component={CustomTextField}
                        />
                      </InputItem>
                    </InputContainer>
                    <InputContainer>
                      <InputItem>
                        <FastField
                          name="length"
                          label="Profundidade"
                          component={CustomTextField}
                        />
                      </InputItem>
                      <InputItem>
                        <FastField
                          name="weight"
                          label="Peso"
                          component={CustomTextField}
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
                          component={CustomImageField}
                          images={values.images_info}
                          deleteLoading={productImageDeleteLoading}
                          onDeleteRequest={onDeleteImageRequest}
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
                {value === 4 && (
                  <TabContainer>
                    <Field
                      name="variations"
                      label="Variations"
                      component={VariationField}
                      placeholder="Variações"
                      variations={attributeList}
                      isLoading={attributeListLoading}
                    />
                  </TabContainer>
                )}
              </InputItem>
            </InputContainer>
            <FormButtons
              handleBack={handleBack}
              isLoading={isLoading}
              submitText={submitText}
            />
          </Card>
        </Form>
      )}
    />
  );
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
