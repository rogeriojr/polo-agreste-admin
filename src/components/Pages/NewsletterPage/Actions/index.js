import React from 'react';
import PropTypes from 'prop-types';
import ActionFab from 'components/Actions/ActionFab';
import ActionMenu from 'components/Actions/ActionMenu';
import ActionMenuItem from 'components/Actions/ActionMenuItem';

const NewActions = ({ rowData, onDeleteRequest }) => {
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
        <ActionMenuItem>Desativar </ActionMenuItem>
        <ActionMenuItem onClick={onDelete}>Remover</ActionMenuItem>
      </ActionMenu>
    </>
  );
};

NewActions.propTypes = {
  rowData: PropTypes.oneOfType([PropTypes.object]).isRequired,
  onDeleteRequest: PropTypes.func,
};

NewActions.defaultProps = {
  onDeleteRequest: () => {},
};

export default NewActions;
