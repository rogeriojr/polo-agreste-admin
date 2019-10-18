import React from 'react';
import PropTypes from 'prop-types';
import LegendStatus from 'components/Legend/LegendStatus';

const StoreWirecardStatus = ({ rowData }) => (
  <div>
    {rowData.wirecard_id ? (
      <LegendStatus color="#00A146" letter="A" />
    ) : (
      <LegendStatus color="#FF5151" letter="I" />
    )}
  </div>
);

StoreWirecardStatus.propTypes = {
  rowData: PropTypes.oneOfType([PropTypes.object]).isRequired,
};

export default StoreWirecardStatus;
