import React, { useState } from 'react';
import { Grid, Typography } from '@material-ui/core';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import CustomButton from 'components/form/components/CustomButton';
import { Creators } from 'store/ducks/virtualCatalog';
import { useDispatch, useSelector } from 'react-redux';

const StyledGridImg = styled.img`
  && {
    width: 100%;
    height: 200px;
    object-fit: cover;
    border: 1px solid rgba(0, 0, 0, 0.23);
    border-radius: 4px;
  }
`;

const VirtualCatalogPreview = ({ form: { values }, items, isLoading }) => {
  const dispatch = useDispatch();

  const { virtualCatalogGeneratedLoading } = useSelector(
    state => state.virtualCatalog,
  );
  const { products } = values;

  const onDownloadCatalog = () => {
    const { id, name } = values;
    dispatch(Creators.getVirtualCatalogGenerateRequest({ id, name }));
  };

  return (
    <>
      {!isLoading && items.length > 0 && products.length > 0 && (
        <>
          <Typography variant="h6" style={{ marginTop: -20, marginBottom: 30 }}>
            Pré-Visualização
          </Typography>
          <Grid container spacing={1} style={{ marginBottom: 10 }}>
            {products.map(product => {
              return (
                <Grid
                  item
                  xs={6}
                  sm={3}
                  key={product.id}
                  style={{ position: 'relative' }}
                >
                  <StyledGridImg src={product.images[0].sizes.medium} />
                  {product.name}
                </Grid>
              );
            })}
          </Grid>
        </>
      )}
      {values.id && (
        <CustomButton
          isLoading={virtualCatalogGeneratedLoading}
          label="Baixar Catálogo"
          onClick={onDownloadCatalog}
        />
      )}
    </>
  );
};

VirtualCatalogPreview.propTypes = {
  form: PropTypes.oneOfType([PropTypes.object]).isRequired,
  items: PropTypes.oneOfType([PropTypes.array]).isRequired,
  isLoading: PropTypes.bool.isRequired,
};

export default VirtualCatalogPreview;
