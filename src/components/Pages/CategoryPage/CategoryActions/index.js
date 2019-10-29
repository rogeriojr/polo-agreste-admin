import React from 'react';
import PropTypes from 'prop-types';
import ActionFab from 'components/Actions/ActionFab';
import { Link } from 'react-router-dom';
import ActionMenuItem from 'components/Actions/ActionMenuItem';
import ActionMenu from 'components/Actions/ActionMenu';

const CategoryActions = ({ rowData, onDeleteRequest }) => {
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
          <Link to={`/catalog/categories/update/${rowData.id}`}>Editar</Link>
        </ActionMenuItem>
        <ActionMenuItem>Ordernar produtos</ActionMenuItem>
        <ActionMenuItem>
          Pesquisar produtos que pertençam na mesma categoria
        </ActionMenuItem>
        <ActionMenuItem onClick={onDelete}>Remover</ActionMenuItem>
      </ActionMenu>
    </>
  );
};

CategoryActions.propTypes = {
  onDeleteRequest: PropTypes.func,
  rowData: PropTypes.oneOfType([PropTypes.object]).isRequired,
};

CategoryActions.defaultProps = {
  onDeleteRequest: () => {},
};

export default CategoryActions;
