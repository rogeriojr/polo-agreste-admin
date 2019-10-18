import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const StyledImg = styled('img')`
  && {
    max-height: 60px;
    max-width: 60px;
  }
`;

const StoreImage = ({ rowData }) => (
  <div>
    {rowData.image.small !== '' && <StyledImg src={rowData.image.small} />}
  </div>
);

StoreImage.propTypes = {
  rowData: PropTypes.oneOfType([PropTypes.object]).isRequired,
};

export default StoreImage;
