import React from 'react';
import PropTypes from 'prop-types';
import LegendStatus from 'components/Legend/LegendStatus';

const ColorStatus = ({ rowData }) => (
  <div>
    {rowData.status === 0 && <LegendStatus color="#FF5151" letter="I" />}
    {rowData.status === 1 && <LegendStatus color="#00A146" letter="A" />}
  </div>
);

ColorStatus.propTypes = {
  rowData: PropTypes.oneOfType([PropTypes.object]).isRequired,
};

export default ColorStatus;
