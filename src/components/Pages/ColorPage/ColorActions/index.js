import React from 'react';
import PropTypes from 'prop-types';
import ActionFab from 'components/Actions/ActionFab';
import { Link } from 'react-router-dom';
import ActionMenuItem from 'components/Actions/ActionMenuItem';
import ActionMenu from 'components/Actions/ActionMenu';

const ColorActions = ({ rowData, onDeleteRequest }) => {
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
          <Link to={`/catalog/colors/update/${rowData.id}`}>Editar</Link>
        </ActionMenuItem>
        <ActionMenuItem onClick={onDelete}>Remover</ActionMenuItem>
      </ActionMenu>
    </>
  );
};

ColorActions.propTypes = {
  onDeleteRequest: PropTypes.func,
  rowData: PropTypes.oneOfType([PropTypes.object]).isRequired,
};

ColorActions.defaultProps = {
  onDeleteRequest: () => {},
};

export default ColorActions;
