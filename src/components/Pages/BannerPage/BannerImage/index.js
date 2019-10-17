import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const StyledImg = styled('img')`
  && {
    max-height: 60px;
    max-width: 60px;
  }
`;

const BannerImage = ({ rowData }) => (
  <div>
    {rowData.images.length > 0 && (
      <StyledImg src={rowData.images[0].sizes.small} />
    )}
  </div>
);

BannerImage.propTypes = {
  rowData: PropTypes.oneOfType([PropTypes.object]).isRequired,
};

export default BannerImage;
