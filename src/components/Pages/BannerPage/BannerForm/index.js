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
import { Creators as BannerCreators } from 'store/ducks/banner';
import GalleryField from './GalleryField';
import { useDispatch, useSelector } from 'react-redux';

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
  images: '',
  images_data: [],
  images_info: [],
};

const schema = Yup.object().shape({
  id: Yup.number(),
  name: Yup.string().required('Este campo é obrigatório'),
  status: Yup.number().required('Este campo é obrigatório'),
});

const BannerForm = ({
  onSubmit,
  initialValues = formInitialValues,
  submitText,
  handleBack,
}) => {
  const dispatch = useDispatch();
  const { bannerImageDeleteLoading, banner } = useSelector(
    state => state.banner,
  );

  const [value, setValue] = React.useState(0);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const onDeleteImageRequest = image => {
    dispatch(
      BannerCreators.getImageBannerDeleteRequest({
        id: image.id,
        id_banner: banner.id,
      }),
    );
  };

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
                  name="images"
                  label="Galeria"
                  component={GalleryField}
                  images={values.images_info}
                  deleteLoading={bannerImageDeleteLoading}
                  onDeleteRequest={onDeleteImageRequest}
                  isMulti
                />
              </InputItem>
            </InputContainer>
            <FormButtons handleBack={handleBack} submitText={submitText} />
          </Card>
        </Form>
      )}
    />
  );
};

BannerForm.propTypes = {
  onSubmit: PropTypes.func,
  initialValues: PropTypes.oneOfType([PropTypes.object]),
  submitText: PropTypes.string,
  handleBack: PropTypes.oneOfType([PropTypes.bool, PropTypes.func]),
};

BannerForm.defaultProps = {
  initialValues: formInitialValues,
  submitText: 'Salvar',
  handleBack: false,
  onSubmit: () => {},
};

export default BannerForm;
