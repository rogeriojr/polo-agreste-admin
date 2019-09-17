import React from 'react';

import GetAppIcon from '@material-ui/icons/GetApp';
import SearchIcon from '@material-ui/icons/Search';

import Button from '@material-ui/core/Button';

const ToolbarButtons = () => (
  <div className="toolbar-buttons">
    <span>
      <Button variant="contained" className="bt-orange">
        <SearchIcon className="bt-icon" />
        Busca avançada
      </Button>
      <Button variant="contained" className="bt-orange">
        <GetAppIcon className="bt-icon" />
        Exportar
      </Button>
    </span>
  </div>
);

export default ToolbarButtons;
