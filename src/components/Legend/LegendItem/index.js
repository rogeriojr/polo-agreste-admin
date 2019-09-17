import React from 'react';
import LegendStatus from 'components/Legend/LegendStatus';
import PropTypes from 'prop-types';

const LegendItem = ({ letter, color, children }) => (
  <LegendStatus letter={letter} color={color} item>
    {children}
  </LegendStatus>
);

LegendItem.propTypes = {
  letter: PropTypes.string,
  color: PropTypes.string,
  children: PropTypes.oneOfType([
    PropTypes.array,
    PropTypes.object,
    PropTypes.string,
  ]),
};

LegendItem.defaultProps = {
  children: null,
  letter: null,
  color: null,
};

export default LegendItem;
