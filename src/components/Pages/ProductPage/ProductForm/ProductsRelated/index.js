import React from 'react';
import { Grid, Typography } from '@material-ui/core';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import CustomButton from 'components/form/components/CustomButton';

const StyledGridImg = styled.img`
  && {
    width: 100%;
    height: 200px;
    object-fit: cover;
    border: 1px solid rgba(0, 0, 0, 0.23);
    border-radius: 4px;
  }
`;

const ProductsRelated = ({ form: { values }, items, isLoading }) => {
  const { related } = values;

  return (
    <>
      {!isLoading && items.length > 0 && related.length > 0 && (
        <>
          <Typography variant="h6" style={{ marginTop: -20, marginBottom: 30 }}>Pré-Visualização</Typography>
          <Grid container spacing={1} style={{ marginBottom: 10 }}>
            {related.map(product => {
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
    </>
  );
};

ProductsRelated.propTypes = {
  form: PropTypes.oneOfType([PropTypes.object]).isRequired,
  items: PropTypes.oneOfType([PropTypes.array]).isRequired,
  isLoading: PropTypes.bool.isRequired,
};

export default ProductsRelated;
