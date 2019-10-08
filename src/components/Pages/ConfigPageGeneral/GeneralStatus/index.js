import React from 'react';
import PropTypes from 'prop-types';
import LegendStatus from 'components/Legend/LegendStatus';

const ProductStatus = ({ rowData }) => (
  <div>
    {rowData.status === 1 ? (
      <LegendStatus color="#00A146" letter="A" />
    ) : (
      <LegendStatus color="#FF5151" letter="I" />
    )}
    {Number(rowData.stock_control) === 0 && (
      <LegendStatus color="#EFA700" letter="E" />
    )}
    {!rowData.image_uuid && <LegendStatus color="#B145E6" letter="M" />}
  </div>
);

ProductStatus.propTypes = {
  rowData: PropTypes.oneOfType([PropTypes.object]).isRequired,
};

export default ProductStatus;
