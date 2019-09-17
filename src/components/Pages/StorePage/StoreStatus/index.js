import React from 'react';
import PropTypes from 'prop-types';
import LegendStatus from 'components/Legend/LegendStatus';

const StoreStatus = ({ rowData }) => (
  <div>
    {rowData.status === 1 ? (
      <LegendStatus color="#286de5" letter="A" />
    ) : (
      <LegendStatus color="#EFA700" letter="A" />
    )}
  </div>
);

StoreStatus.propTypes = {
  rowData: PropTypes.oneOfType([PropTypes.object]).isRequired,
};

export default StoreStatus;
