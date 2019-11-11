import React from 'react';
import { FormHelperText, Typography, Grid, Fab, Icon } from '@material-ui/core';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { ErrorMessage } from 'formik';
import CustomButton from 'components/form/components/CustomButton';
import AlertDialog from 'components/AlertDialog';
import CardDnD from 'components/form/components/CustomImageField/DragAndDrop';

const StyledInput = styled.input`
  && {
    opacity: 0;
    max-width: 150px;
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

const CustomImageField = ({
  field,
  label,
  form: { setFieldValue, values },
  previewUrl,
  isMulti,
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

  const ReadImageFile = file => {
    const reader = new FileReader();
    reader.onloadend = () => {
      setLocalState({
        ...localState,
        previewUrl: reader.result,
      });
    };
    reader.readAsDataURL(file);
  };

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

  React.useEffect(() => {
    if (!isMulti) {
      const file = values[`${field.name}_data`];
      if (typeof file !== 'undefined' && file !== '') {
        ReadImageFile(file);
      } else if (previewUrl !== '') {
        setLocalState({
          ...localState,
          previewUrl,
        });
      }
    } else {
      const files = values[`${field.name}_data`];

      const imagesInfo = images.map(image => {
        return {
          id: image.id,
          type: 'remote',
          url: image.sizes.medium,
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
    }
  }, []);

  React.useEffect(() => {
    if (isMulti) {
      const imagesInfo = images.map(image => {
        if (image.type) {
          return image;
        }
        return {
          id: image.id,
          type: 'remote',
          url: image.sizes.medium,
        };
      });
      if (images.length > 0) {
        setLocalState({
          ...localState,
          images: imagesInfo,
        });
      }
    }
  }, [values[`${field.name}_data`]]);

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
            <Grid
              item
              xs={6}
              sm={3}
              key={image.id}
              style={{ position: 'relative' }}
            >
              <StyledFab
                onClick={() => {
                  onDelete(image);
                }}
              >
                <StyledIcon>delete</StyledIcon>
              </StyledFab>
              <StyledGridImg src={image.url} alt="" />
            </Grid>
          ))}
        </Grid>
      )}
      <div style={{ position: 'relative' }}>
        <StyledInput
          {...field}
          {...props}
          onChange={event => {
            if (!isMulti) {
              const file = event.currentTarget.files[0];
              setFieldValue(field.name, '');
              setFieldValue(`${field.name}_data`, file);
              ReadImageFile(file);
            } else {
              const { files } = event.currentTarget;
              ReadMultipleImageFiles(files);
            }
          }}
          type="file"
          accept="image/*"
          multiple={isMulti}
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

CustomImageField.propTypes = {
  field: PropTypes.oneOfType([PropTypes.object]).isRequired,
  form: PropTypes.oneOfType([PropTypes.object]).isRequired,
  label: PropTypes.string.isRequired,
  previewUrl: PropTypes.string,
  isMulti: PropTypes.bool,
  onDeleteRequest: PropTypes.func,
  deleteLoading: PropTypes.bool,
  images: PropTypes.arrayOf(PropTypes.object),
};

CustomImageField.defaultProps = {
  previewUrl: '',
  isMulti: false,
  onDeleteRequest: () => {},
  deleteLoading: false,
  images: [],
};

export default CustomImageField;
