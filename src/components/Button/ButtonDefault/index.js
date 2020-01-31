import { Button } from '@material-ui/core';
import styled from 'styled-components';

const ButtonDefault = styled(Button)`
  && {
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.2);
    background: #ce4899;
    padding: 10px;
    color: white;
    &:hover {
      background: #b53f86;
    }
  }
`;

export default ButtonDefault;
