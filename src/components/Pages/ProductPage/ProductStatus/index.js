import React from 'react';
import PropTypes from 'prop-types';
import LegendStatus from 'components/Legend/LegendStatus';

const ProductStatus = ({ rowData }) => (
  <div>
    {rowData.status === 0 && <LegendStatus color="#FF5151" letter="I" />}
    {rowData.status === 1 && <LegendStatus color="#00A146" letter="A" />}
    {rowData.status === 2 && <LegendStatus color="#9B6B34" letter="B" />}
    {Number(rowData.stock_control) === 1 && rowData.stock <= 0 && (
      <LegendStatus color="#EFA700" letter="E" />
    )}
    {rowData.images.length === 0 && <LegendStatus color="#B145E6" letter="M" />}
  </div>
);

ProductStatus.propTypes = {
  rowData: PropTypes.oneOfType([PropTypes.object]).isRequired,
};

export default ProductStatus;
