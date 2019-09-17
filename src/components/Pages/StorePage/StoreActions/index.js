import React from 'react';
import PropTypes from 'prop-types';
import ActionFab from 'components/Actions/ActionFab';
import ActionMenu from 'components/Actions/ActionMenu';
import ActionMenuItem from 'components/Actions/ActionMenuItem';
import { Link } from 'react-router-dom';

const StoreActions = ({ rowData, onDeleteRequest }) => {
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
        <ActionMenuItem>Acessar Vitrine</ActionMenuItem>
        <ActionMenuItem>Gateways de pagamento</ActionMenuItem>
        <ActionMenuItem>
          <Link to={`/store/update/${rowData.id}`}>Editar</Link>
        </ActionMenuItem>
        <ActionMenuItem>Editar usuário</ActionMenuItem>
        <ActionMenuItem>Bloquear</ActionMenuItem>
        <ActionMenuItem onClick={onDelete}>Remover</ActionMenuItem>
      </ActionMenu>
    </>
  );
};

StoreActions.propTypes = {
  rowData: PropTypes.oneOfType([PropTypes.object]).isRequired,
  onDeleteRequest: PropTypes.func,
};

StoreActions.defaultProps = {
  onDeleteRequest: () => {},
};

export default StoreActions;
