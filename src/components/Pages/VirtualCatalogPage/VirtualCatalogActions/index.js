import React from 'react';
import PropTypes from 'prop-types';
import ActionFab from 'components/Actions/ActionFab';
import { Link } from 'react-router-dom';
import ActionMenuItem from 'components/Actions/ActionMenuItem';
import ActionMenu from 'components/Actions/ActionMenu';
import { Creators } from 'store/ducks/virtualCatalog';
import { useDispatch, useSelector } from 'react-redux';

const VirtualCatalogActions = ({ rowData, onDeleteRequest }) => {
  const dispatch = useDispatch();

  const [clicked, setClicked] = React.useState(false);

  const { virtualCatalogGeneratedLoading, virtualCatalogGenerated } = useSelector(
    state => state.virtualCatalog,
  );

  const onDownloadCatalog = () => {
    const { id, name } = rowData;
    setClicked(true);
    dispatch(Creators.getVirtualCatalogGenerateRequest({ id, name }));
  };

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

  React.useEffect(() => {
    if (!virtualCatalogGeneratedLoading && virtualCatalogGenerated === rowData.id && clicked) {
      setClicked(false);
    }
  }, [virtualCatalogGeneratedLoading,virtualCatalogGenerated]);
console.log({clicked, virtualCatalogGeneratedLoading,virtualCatalogGenerated})
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
      <ActionFab
        icon="get_app"
        onClick={onDownloadCatalog}
        isLoading={clicked}
      />
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
