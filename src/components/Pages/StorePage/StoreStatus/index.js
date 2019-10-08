import React from 'react';
import PropTypes from 'prop-types';
import LegendStatus from 'components/Legend/LegendStatus';

const StoreStatus = ({ rowData }) => (
  <div>
    {rowData.status === 0 && <LegendStatus color="#EFA700" letter="A" />}
    {rowData.status === 1 && <LegendStatus color="#00A146" letter="A" />}
    {rowData.status === 2 && <LegendStatus color="#9B6B34" letter="B" />}
  </div>
);

StoreStatus.propTypes = {
  rowData: PropTypes.oneOfType([PropTypes.object]).isRequired,
};

export default StoreStatus;
