import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const StyledSpan = styled.span`
  && {
    &::before {
      color: white;
      width: 24px;
      height: 24px;
      content: '${props => props.theme.letter}';
      background-color: ${props => props.theme.color};
      display: inline-block;
      padding: 5px 0;
      font-size: 10px;
      text-align: center;
      font-weight: 600;
      margin-right: 3px;
      border-radius: 3px;
    }
    font-size: 13px;
    flex: ${props => (props.theme.item ? 1 : 'none')};
  }
`;

const LegendStatus = ({ letter, color, children, item }) => (
  <StyledSpan theme={{ letter, color, item }}>{children}</StyledSpan>
);

LegendStatus.propTypes = {
  letter: PropTypes.string,
  color: PropTypes.string,
  item: PropTypes.bool,
  children: PropTypes.oneOfType([
    PropTypes.array,
    PropTypes.object,
    PropTypes.string,
  ]),
};

LegendStatus.defaultProps = {
  children: null,
  item: false,
  letter: null,
  color: null,
};

export default LegendStatus;
