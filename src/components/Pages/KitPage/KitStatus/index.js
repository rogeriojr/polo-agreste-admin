import React from 'react';
import PropTypes from 'prop-types';
import LegendStatus from 'components/Legend/LegendStatus';

const TrendStatus = ({ rowData }) => (
  <div>
    {rowData.status === 0 && <LegendStatus color="#FF5151" letter="I" />}
    {rowData.status === 1 && <LegendStatus color="#00A146" letter="A" />}
  </div>
);

TrendStatus.propTypes = {
  rowData: PropTypes.oneOfType([PropTypes.object]).isRequired,
};

export default TrendStatus;
