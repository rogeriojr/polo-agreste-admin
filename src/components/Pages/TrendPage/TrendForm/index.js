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
import { Creators as TrendCreators } from 'store/ducks/trend';
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
  products: Yup.array().of(
    Yup.object().shape({
      id: Yup.number(),
    }),
  ),
});

const TrendForm = ({
  onSubmit,
  initialValues = formInitialValues,
  submitText,
  handleBack,
  isLoading,
}) => {
  const dispatch = useDispatch();
  const { trendImageDeleteLoading, trend } = useSelector(state => state.trend);
  const { productListLoading, productList } = useSelector(
    state => state.product,
  );

  const [value, setValue] = React.useState(0);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const onDeleteImageRequest = image => {
    dispatch(
      TrendCreators.getImageTrendDeleteRequest({
        id: image.id,
        id_trend: trend.id,
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
              <InputItem style={{ flexGrow: 2 }}>
                <Field name="name" label="Nome" component={CustomTextField} />
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
                  deleteLoading={trendImageDeleteLoading}
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

TrendForm.propTypes = {
  onSubmit: PropTypes.func,
  initialValues: PropTypes.oneOfType([PropTypes.object]),
  submitText: PropTypes.string,
  handleBack: PropTypes.oneOfType([PropTypes.bool, PropTypes.func]),
  isLoading: PropTypes.bool.isRequired,
};

TrendForm.defaultProps = {
  initialValues: formInitialValues,
  submitText: 'Salvar',
  handleBack: false,
  onSubmit: () => {},
};

export default TrendForm;
