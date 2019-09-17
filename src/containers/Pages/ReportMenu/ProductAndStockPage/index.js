import React from 'react';
import PageBase from 'components/PageBase';
import HeaderComponent from 'components/HeaderComponent';
import StoreSelect from 'components/Pages/StorePage/StoreSelect';
import ProductFooter from 'components/Pages/ProductPage/ProductFooter';
import DefaultTable from 'components/Tables/DefaultTable';
import { Paper } from '@material-ui/core';
import ProductStatus from 'components/Pages/ProductPage/ProductStatus';
import ProductAndStockTableHeader from 'components/Pages/ProductAndStockPage/ProductAndStockTableHeader';
import { InputItem, InputContainer } from 'components/form/StyledComponents';
import CustomSelect from 'components/form/components/CustomSelect';

const ProductAndStockPage = () => {
  const [storesState, setStoresState] = React.useState({
    list: [
      { name: 'Loja 1', id: 0 },
      { name: 'Loja 2', id: 1 },
      { name: 'Loja 3', id: 2 },
    ],
    selectedStore: '',
    isLoading: false,
  });

  const [localState, setLocalState] = React.useState({
    search: '',
    orderByColumn: '',
    orderByDirection: '',
    page: 1,
    perPage: 10,
  });

  const [deleteState, setDeleteState] = React.useState({
    open: false,
    item: {},
  });

  const { list, selectedStore, isLoading } = storesState;

  const onChange = newValue => {
    setStoresState(oldState => ({ ...oldState, selectedStore: newValue }));
  };

  const getFunction = data => {
    setLocalState(oldLocalState => ({ ...oldLocalState, ...data }));
  };

  const onDeleteRequest = item => {
    setDeleteState({ open: true, item });
  };

  const columns = ({ onDeleteRequest }) => [
    {
      title: 'Referência',
      field: 'id',
      sorting: false,
    },
    {
      title: 'Nome',
      field: 'name',
      sorting: false,
    },
    {
      title: 'Preço',
      field: 'price',
      sorting: false,
    },
    {
      title: 'Estoque',
      field: 'stock',
      sorting: false,
    },
    {
      title: 'Estoque Min.',
      field: 'update_at',
      sorting: false,
    },
    {
      title: 'Aguard. Pág.',
      field: 'awaiting_page',
      sorting: false,
    },
    {
      title: 'Aguard. Env.',
      field: 'awaiting_env',
      sorting: false,
    },
    {
      title: 'Tipo',
      field: 'type',
      sorting: false,
    },
    {
      title: 'Dimensões',
      field: 'dimensions',
      sorting: false,
    },
    {
      title: 'Peso',
      field: 'weight',
      sorting: false,
    },
    {
      title: 'EAN',
      field: 'ean',
      sorting: false,
    },
    {
      title: 'Status',
      sorting: false,
      render: rowData => <ProductStatus rowData={rowData} />,
    },
  ];

  const data = [
    {
      id: 0,
      name: 'Sukita',
      price: '125',
      stock: '10',
      update_at: 'campo teste',
      awaiting_page: '17',
      awaiting_env: '9',
      type: 'simples',
      dimensions: '16x8x8cm',
      weight: '80g',
      ean: '--',
      status: 1,
    },
  ];

  const replaceSelect = {
    setFieldValue: (event, newValue) => {
      onChange(newValue);
    },
  };

  return (
    <PageBase>
      {selectedStore !== '' && (
        <>
          <HeaderComponent title="Produto e Estoque">
            <InputContainer>
              <InputItem>
                <CustomSelect
                  name="store_select"
                  label="Selecione"
                  field={{ value: list[selectedStore].id }}
                  options={list}
                  component={CustomSelect}
                  placeholder="Selecione"
                  isLoading={isLoading}
                  form={replaceSelect}
                />
              </InputItem>
            </InputContainer>
          </HeaderComponent>
          <HeaderComponent variant="h6" title={list[selectedStore].name}>
            <ProductAndStockTableHeader
              getFunction={getFunction}
              initialValues={{ search: localState.search }}
            />
          </HeaderComponent>
          <Paper>
            <DefaultTable
              getFunction={getFunction}
                columns={columns({ onDeleteRequest })}
              data={data}
              total={data.length}
              isLoading={false}
              page={localState.page}
              perPage={localState.perPage}
              footer={<ProductFooter />}
            />
          </Paper>
        </>
      )}

      {storesState.selectedStore === '' && (
        <Paper style={{marginTop:100}}>
        <StoreSelect list={list} isLoading={isLoading} onChange={onChange} />
        </Paper>
      )}
    </PageBase>
  );
};

export default ProductAndStockPage;
