import React from 'react';
import {
  FormHelperText,
  Typography,
  Grid,
  Fab,
  Icon,
  TextField,
  FormControlLabel,
  Checkbox,
} from '@material-ui/core';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { ErrorMessage } from 'formik';
import CustomButton from 'components/form/components/CustomButton';
import AlertDialog from 'components/AlertDialog';
import { InputContainer, InputItem } from 'components/form/StyledComponents';

const StyledInput = styled.input`
  && {
    opacity: 0;
    width: 100%;
    display: block;
    height: 36px;
  }
`;

const StyledCustomButton = styled(CustomButton)`
  && {
    top: 0;
    left: 0;
    position: absolute;
    pointer-events: none;
  }
`;

const StyledImg = styled.img`
  && {
    max-width: 100%;
    max-height: 200px;
    margin-bottom: 10px;
  }
`;

const StyledGridImg = styled.img`
  && {
    width: 100%;
    height: 200px;
    object-fit: cover;
    border: 1px solid rgba(0, 0, 0, 0.23);
    border-radius: 4px;
  }
`;

const StyledFab = styled(Fab)`
  && {
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.2);
    background: #ce4899;
    color: white;
    width: 32px;
    height: 32px;
    margin: 0 2px;
    min-height: 0;
    &:hover {
      background: #b53f86;
      box-shadow: 0 1px 6px rgba(0, 0, 0, 0.4);
    }
    &:active {
      box-shadow: 0 1px 6px rgba(0, 0, 0, 0.4);
    }
    position: absolute;
    right: 10px;
    top: 10px;
  }
`;

const StyledIcon = styled(Icon)`
  && {
    width: auto;
    height: auto;
    font-size: 22px;
    text-align: center;
  }
`;

const StyledTextField = styled(TextField)`
  && {
    .MuiOutlinedInput-root {
      background: white;
    }
    & .MuiOutlinedInput-input {
      padding: 12px 12px;
    }
    & .MuiInputLabel-outlined[data-shrink='false'] {
      transform: translate(14px, 14px) scale(1);
    }
  }
`;

const GalleryField = ({
  field,
  label,
  form: { setFieldValue, values },
  previewUrl,
  images,
  onDeleteRequest,
  deleteLoading,
  ...props
}) => {
  const [localState, setLocalState] = React.useState({
    previewUrl: '',
    images: [],
  });

  const [deleteState, setDeleteState] = React.useState({
    open: false,
    item: {},
  });

  const ReadMultipleImageFiles = (files, imagesAdd = [], firstTime = false) => {
    const filesArr = Array.from(files);
    const imagesArr = [];
    const currentTimestamp = new Date().getTime();
    const readFile = index => {
      const reader = new FileReader();
      if (index >= filesArr.length) {
        if (imagesArr.length > 0) {
          setFieldValue(field.name, '');
          if (!firstTime) {
            setFieldValue(`${field.name}_data`, [
              ...values[`${field.name}_data`],
              ...filesArr,
            ]);
          }
          setLocalState({
            ...localState,
            images: [...imagesAdd, ...localState.images, ...imagesArr],
          });
        }
        return;
      }
      const file = filesArr[index];
      reader.onloadend = () => {
        imagesArr.push({
          id: `local-${index}-${currentTimestamp}`,
          type: 'local',
          url: reader.result,
          order_position: '',
          link: '',
          route: '',
          show_mobile: false,
          show_tablet: false,
          show_desktop: false,
          file,
        });
        readFile(index + 1);
      };
      reader.readAsDataURL(file);
    };
    readFile(0);
  };

  const handleAlertDialogClose = () => {
    setDeleteState({ open: false, item: {} });
  };

  const onDelete = item => {
    setDeleteState({ open: true, item });
  };

  const deleteImageOnList = image => {
    const imagesFiltered = localState.images.filter(imageInfo => {
      if (imageInfo.id === image.id) {
        return false;
      }
      return true;
    });
    setLocalState({
      ...localState,
      images: imagesFiltered,
    });
  };

  const onDeleteConfirm = () => {
    const image = deleteState.item;
    if (image.type === 'remote') {
      onDeleteRequest(image);
    }
    if (image.type === 'local') {
      deleteImageOnList(image);
      setFieldValue(`${field.name}_data`, [
        ...values[`${field.name}_data`].filter(file => {
          if (file === image.file) {
            return false;
          }
          return true;
        }),
      ]);
      handleAlertDialogClose();
    }
  };

  const getInitialData = () => {
    const files = values[`${field.name}_data`];

    const imagesInfo = images.map(image => {
      return {
        id: image.id,
        type: 'remote',
        url: image.sizes.medium,
        order_position: image.order_position,
        link: image.link,
        route: image.route,
        show_mobile: image.show_mobile,
        show_tablet: image.show_tablet,
        show_desktop: image.show_desktop,
      };
    });
    if (Array.isArray(files) && files.length > 0) {
      ReadMultipleImageFiles(files, imagesInfo, true);
    } else if (images.length > 0) {
      setLocalState({
        ...localState,
        images: imagesInfo,
      });
    }
  };

  React.useEffect(() => {
    getInitialData();
  }, []);

  React.useEffect(() => {
    const imagesInfo = images.map(image => {
      if (image.type) {
        return image;
      }
      return {
        id: image.id,
        type: 'remote',
        url: image.sizes.medium,
        order_position: image.order_position,
        link: image.link,
        route: image.route,
        show_mobile: image.show_mobile,
        show_tablet: image.show_tablet,
        show_desktop: image.show_desktop,
      };
    });
    if (images.length > 0) {
      setLocalState({
        ...localState,
        images: imagesInfo,
      });
    }
  }, [values]);

  React.useEffect(() => {
    if (deleteLoading === false && deleteState.open) {
      const image = deleteState.item;
      deleteImageOnList(image);
      setFieldValue(`${field.name}_info`, [
        ...values[`${field.name}_info`].filter(imageInfo => {
          if (imageInfo.id === image.id) {
            return false;
          }
          return true;
        }),
      ]);
      handleAlertDialogClose();
    }
  }, [deleteLoading]);

  const onChangeImageField = (image, curField) => option => {
    const imagesMapped = localState.images.map(imageInfo => {
      if (image.id === imageInfo.id) {
        if (
          curField === 'show_mobile' ||
          curField === 'show_tablet' ||
          curField === 'show_desktop'
        ) {
          const curFieldInfo = {};
          curFieldInfo[curField] = option.currentTarget.checked;
          return {
            ...imageInfo,
            ...curFieldInfo,
          };
        }
        const curFieldInfo = {};
        curFieldInfo[curField] = option.currentTarget.value;
        return {
          ...imageInfo,
          ...curFieldInfo,
        };
      }
      return imageInfo;
    });
    setLocalState({
      ...localState,
      images: imagesMapped,
    });
    setFieldValue(`${field.name}_info`, imagesMapped);
  };

  return (
    <>
      <Typography
        variant="h6"
        style={{
          color: '#282829',
          marginTop: 10,
          marginBottom: 14,
          marginLeft: -1,
        }}
      >
        {label}
      </Typography>
      {localState.previewUrl !== '' && (
        <StyledImg src={localState.previewUrl} alt="" />
      )}
      {localState.images.length > 0 && (
        <Grid container spacing={1} style={{ marginBottom: 10 }}>
          {localState.images.map(image => (
            <Grid item xs={6} sm={4} key={image.id}>
              <div
                style={{
                  position: 'relative',
                  border: '1px solid rgba(0, 0, 0, 0.23)',
                  borderRadius: '4px',
                }}
              >
                <InputContainer>
                  <InputItem style={{ position: 'relative' }}>
                    <StyledFab
                      onClick={() => {
                        onDelete(image);
                      }}
                    >
                      <StyledIcon>delete</StyledIcon>
                    </StyledFab>
                    <StyledGridImg src={image.url} alt="" />
                  </InputItem>
                </InputContainer>
                <InputContainer>
                  <InputItem>
                    <StyledTextField
                      value={image.order_position}
                      onChange={onChangeImageField(image, 'order_position')}
                      fullWidth
                      variant="outlined"
                      label="Ordem"
                      type="number"
                    />
                  </InputItem>
                </InputContainer>
                <InputContainer>
                  <InputItem>
                    <StyledTextField
                      value={image.link}
                      onChange={onChangeImageField(image, 'link')}
                      fullWidth
                      variant="outlined"
                      label="Link"
                    />
                  </InputItem>
                </InputContainer>
                <InputContainer>
                  <InputItem>
                    <StyledTextField
                      value={image.route}
                      onChange={onChangeImageField(image, 'route')}
                      fullWidth
                      variant="outlined"
                      label="Rota"
                    />
                  </InputItem>
                </InputContainer>
                <InputContainer>
                  <InputItem>
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={image.show_mobile}
                          onChange={onChangeImageField(image, 'show_mobile')}
                        />
                      }
                      label="Mostrar no celular"
                    />
                  </InputItem>
                </InputContainer>
                <InputContainer>
                  <InputItem>
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={image.show_tablet}
                          onChange={onChangeImageField(image, 'show_tablet')}
                        />
                      }
                      label="Mostrar no tablet"
                    />
                  </InputItem>
                </InputContainer>
                <InputContainer>
                  <InputItem>
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={image.show_desktop}
                          onChange={onChangeImageField(image, 'show_desktop')}
                        />
                      }
                      label="Mostrar no desktop"
                    />
                  </InputItem>
                </InputContainer>
              </div>
            </Grid>
          ))}
        </Grid>
      )}
      <div style={{ position: 'relative' }}>
        <StyledInput
          {...field}
          {...props}
          onChange={event => {
            const { files } = event.currentTarget;
            ReadMultipleImageFiles(files);
          }}
          type="file"
          accept="image/*"
          multiple
        />
        <StyledCustomButton label="Escolher imagem" />
      </div>
      <ErrorMessage name={field.name}>
        {msg => <FormHelperText error>{msg}</FormHelperText>}
      </ErrorMessage>
      <AlertDialog
        isOpen={deleteState.open}
        isLoading={deleteLoading}
        handleClose={handleAlertDialogClose}
        onConfirm={onDeleteConfirm}
        title="Excluir registro?"
        description="Excluir registro de uma imagem"
      />
    </>
  );
};

GalleryField.propTypes = {
  field: PropTypes.oneOfType([PropTypes.object]).isRequired,
  form: PropTypes.oneOfType([PropTypes.object]).isRequired,
  label: PropTypes.string.isRequired,
  previewUrl: PropTypes.string,
  onDeleteRequest: PropTypes.func,
  deleteLoading: PropTypes.bool,
  images: PropTypes.arrayOf(PropTypes.object),
};

GalleryField.defaultProps = {
  previewUrl: '',
  onDeleteRequest: () => {},
  deleteLoading: false,
  images: [],
};

export default GalleryField;
