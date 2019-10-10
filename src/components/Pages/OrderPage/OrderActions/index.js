import React from 'react';
import PropTypes from 'prop-types';
import ActionFab from 'components/Actions/ActionFab';
import ActionMenu from 'components/Actions/ActionMenu';
import ActionMenuItem from 'components/Actions/ActionMenuItem';
import { Link } from 'react-router-dom';

const OrderActions = ({ rowData, onDeleteRequest }) => {
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
          <Link to={`/order/view/${rowData.id}`}>Visualizar</Link>
        </ActionMenuItem>
        <ActionMenuItem onClick={()=>{}}>Gerar Etiqueta</ActionMenuItem>
        <ActionMenuItem onClick={()=>{}}>Imprimir</ActionMenuItem>
        <ActionMenuItem onClick={()=>{}}>Remover</ActionMenuItem>
      </ActionMenu>
    </>
  );
};

OrderActions.propTypes = {
  rowData: PropTypes.oneOfType([PropTypes.object]).isRequired,
  onDeleteRequest: PropTypes.func,
};

OrderActions.defaultProps = {
  onDeleteRequest: () => {},
};

export default OrderActions;
