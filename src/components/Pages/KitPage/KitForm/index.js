import React from 'react';
import { Formik, Field, Form, FastField } from 'formik';
import * as Yup from 'yup';
import PropTypes from 'prop-types';
import { Card, Typography } from '@material-ui/core';
import { InputContainer, InputItem } from 'components/form/StyledComponents';
import CustomTextField from 'components/form/components/CustomTextField';
import FormButtons from 'components/form/components/FormButtons';
import CustomRichText from 'components/form/components/CustomRichText';
import CustomSelect from 'components/form/components/CustomSelect';
import { Creators as KitCreators } from 'store/ducks/kit';
import { Creators as ProductCreators } from 'store/ducks/product';
import { useDispatch, useSelector } from 'react-redux';
import CustomImageField from 'components/form/components/CustomImageField';
import CustomCurrencyField from 'components/form/components/CustomCurrencyField';
import CustomInputDate from 'components/form/components/CustomInputDate';
import ProductSelect from 'components/form/components/CustomSearchSelect/ProductSelect';

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
  name: '',
  price: '',
  price_whole: '',
  date_end: '',
  status: 1,
  products: [],
  images: '',
  images_data: [],
  images_info: [],
};

const schema = Yup.object().shape({
  id: Yup.number(),
  name: Yup.string().required('Este campo é obrigatório'),
  status: Yup.number().required('Este campo é obrigatório'),
  price: Yup.string().required('Campo obrigatório'),
  price_whole: Yup.string(),
  date_end: Yup.string().required('Campo obrigatório'),
  products: Yup.array().of(
    Yup.object().shape({
      id: Yup.number(),
    }),
  ),
});

const KitForm = ({
  onSubmit,
  initialValues = formInitialValues,
  submitText,
  handleBack,
  isLoading,
}) => {
  const dispatch = useDispatch();
  const { kitImageDeleteLoading, kit } = useSelector(state => state.kit);
  const { productListLoading, productList } = useSelector(
    state => state.product,
  );

  const [value, setValue] = React.useState(0);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const onDeleteImageRequest = image => {
    dispatch(
      KitCreators.getImageKitDeleteRequest({
        id: image.id,
        id_kit: kit.id,
      }),
    );
  };

  const getInitialData = () => {
    dispatch(ProductCreators.getProductListRequest({ perPage: 50 }));
  };

  const searchProduct = searchInfo => {
    dispatch(
      ProductCreators.getProductListRequest({ perPage: 50, ...searchInfo }),
    );
  };

  console.log(productList);

  React.useEffect(() => {
    getInitialData();
  }, []);

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={schema}
      onSubmit={onSubmit}
      validateOnBlur
      enableReinitialize
      render={({ values }) => (
        <Form>
          <Card style={{ padding: 20 }}>
            <InputContainer>
              <InputItem>
                <Field name="name" label="Nome" component={CustomTextField} />
              </InputItem>
              <InputItem>
                <FastField
                  name="date_end"
                  label="Data de finalização"
                  component={CustomInputDate}
                />
              </InputItem>
              <InputItem>
                <Field
                  name="status"
                  label="Status"
                  options={[
                    { id: 0, name: 'Inativo' },
                    { id: 1, name: 'Ativo' },
                  ]}
                  component={CustomSelect}
                  placeholder="Status"
                  isLoading={false}
                />
              </InputItem>
            </InputContainer>
            <InputContainer>
              {/* <InputItem>
                <FastField
                  name="price"
                  label="Preço varejo"
                  component={CustomCurrencyField}
                />
              </InputItem> */}
              <InputItem>
                <FastField
                  name="price_whole"
                  label="Preço atacado"
                  component={CustomCurrencyField}
                />
              </InputItem>
            </InputContainer>
            <InputContainer>
              <InputItem>
                <Field
                  name="products"
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
                  name="images"
                  label="Galeria"
                  component={CustomImageField}
                  images={values.images_info}
                  deleteLoading={kitImageDeleteLoading}
                  onDeleteRequest={onDeleteImageRequest}
                  isMulti
                />
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

KitForm.propTypes = {
  onSubmit: PropTypes.func,
  initialValues: PropTypes.oneOfType([PropTypes.object]),
  submitText: PropTypes.string,
  handleBack: PropTypes.oneOfType([PropTypes.bool, PropTypes.func]),
  isLoading: PropTypes.bool.isRequired,
};

KitForm.defaultProps = {
  initialValues: formInitialValues,
  submitText: 'Salvar',
  handleBack: false,
  onSubmit: () => {},
};

export default KitForm;
