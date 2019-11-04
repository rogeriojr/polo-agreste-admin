import React from 'react';
import PropTypes from 'prop-types';
import ActionFab from 'components/Actions/ActionFab';
import { Link } from 'react-router-dom';
import ActionMenuItem from 'components/Actions/ActionMenuItem';
import ActionMenu from 'components/Actions/ActionMenu';

const VirtualCatalogActions = ({ rowData, onDeleteRequest }) => {
  const [localState, setLocalState] = React.useState({
    anchorEl: null,
  });

  const handleClick = event => {
    setLocalState({ anchorEl: event.currentTarget });
  };

  const handleClose = () => {
    setLocalState({ anchorEl: null });
  };

  const onDelete = () => {
    onDeleteRequest(rowData);
  };

  return (
    <>
      <ActionFab icon="more_vert" onClick={handleClick} />
      <ActionMenu
        anchorEl={localState.anchorEl}
        onClose={handleClose}
        open={Boolean(localState.anchorEl)}
      >
        <ActionMenuItem>
          <Link to={`/virtual/catalogs/update/${rowData.id}`}>Editar</Link>
        </ActionMenuItem>
        <ActionMenuItem onClick={onDelete}>Remover</ActionMenuItem>
      </ActionMenu>
      <a
        href={`http://api.44express.com/v1/admin/virtual/catalogs/${rowData.id}/generate`}
        download
      >
        <ActionFab icon="get_app" />
      </a>
    </>
  );
};

VirtualCatalogActions.propTypes = {
  onDeleteRequest: PropTypes.func,
  rowData: PropTypes.oneOfType([PropTypes.object]).isRequired,
};

VirtualCatalogActions.defaultProps = {
  onDeleteRequest: () => {},
};

export default VirtualCatalogActions;
