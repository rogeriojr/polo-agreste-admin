import React from 'react';
import PropTypes from 'prop-types';
import MaterialTable, { MTableBody } from 'material-table';
import { TablePagination, TableCell } from '@material-ui/core';
import { MUIDatatablesTranslations } from 'constants/translations';
import Immutable from 'seamless-immutable';
import FooterTable from 'components/Tables/DefaultTable/FooterTable';

const DefaultTable = ({
  getFunction,
  perPage,
  page,
  columns,
  total,
  data,
  isLoading,
  onOrderChange,
  footer,
}) => {
  const [tableData, setTableData] = React.useState([]);

  const loadData = (pageL = 1, perPageL = perPage) => {
    getFunction({ page: pageL, perPage: perPageL });
  };

  const onChangePage = (event, requestPage) => {
    loadData(requestPage + 1, perPage);
  };

  const onChangeRowsPerPage = event => {
    const { value } = event.target;
    loadData(1, value);
  };

  React.useEffect(() => {
    if (data.length < 1) return;
    setTableData(Immutable.asMutable(data, { deep: true }));
  }, [data]);

  const onOrderChangeCall = (columnIndex, direction) => {
    if (
      columns[columnIndex].field &&
      typeof columns[columnIndex].field === 'string'
    ) {
      onOrderChange(columns[columnIndex].field, direction);
    }
    loadData();
  };

  return (
    <div style={{ maxWidth: '99.99%' }}>
      <MaterialTable
        localization={MUIDatatablesTranslations}
        isLoading={isLoading}
        data={tableData}
        columns={columns}
        options={{
          filtering: false,
          search: false,
          showTitle: false,
          toolbar: false,
          headerStyle: {
            color: 'black',
            fontWeight: 'bold',
            textTransform: 'uppercase',
            fontSize: 15,
          },
        }}
        onOrderChange={onOrderChangeCall}
        components={{
          Pagination: props => (
            <FooterTable footer={footer}>
              <TablePagination
                {...props}
                page={page - 1}
                rowsPerPage={perPage}
                count={total}
                onChangePage={onChangePage}
                component={footer !== null ? 'div' : TableCell}
                onChangeRowsPerPage={onChangeRowsPerPage}
              />
            </FooterTable>
          ),
          Body: ({ renderData, ...subProps }) => (
            <MTableBody
              {...subProps}
              options={{ ...subProps.options, paging: false }} // set paging:false to avoid array slice
              currentPage={page}
              renderData={tableData}
              pageSize={perPage}
            />
          ),
        }}
      />
    </div>
  );
};

DefaultTable.propTypes = {
  data: PropTypes.arrayOf(PropTypes.object).isRequired,
  getFunction: PropTypes.func,
  onOrderChange: PropTypes.func,
  columns: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      value: PropTypes.string,
    }),
  ),
  total: PropTypes.number.isRequired,
  page: PropTypes.number,
  perPage: PropTypes.number,
  isLoading: PropTypes.bool.isRequired,
  footer: PropTypes.oneOfType([
    PropTypes.array,
    PropTypes.object,
    PropTypes.string,
  ]),
};

DefaultTable.defaultProps = {
  getFunction: () => {},
  onOrderChange: () => {},
  columns: [],
  page: 1,
  perPage: 10,
  footer: null,
};

export default DefaultTable;
