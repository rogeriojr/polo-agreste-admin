/*
 *
 * Store reducer
 *
 */

export const Types = {
  // Obtem catergorias
  GET_REQUEST: 'store/GET_REQUEST',
  GET_SUCCESS: 'store/GET_SUCCESS',
  GET_FAILURE: 'store/GET_FAILURE',

  // Obtem catergorias
  GET_LIST_REQUEST: 'store/GET_LIST_REQUEST',
  GET_LIST_SUCCESS: 'store/GET_LIST_SUCCESS',
  GET_LIST_FAILURE: 'store/GET_LIST_FAILURE',

  // Insere uma catergoria
  GET_INSERT_REQUEST: 'store/GET_INSERT_REQUEST',
  GET_INSERT_SUCCESS: 'store/GET_INSERT_SUCCESS',
  GET_INSERT_FAILURE: 'store/GET_INSERT_FAILURE',

  // Atualiza uma catergoria
  GET_UPDATE_REQUEST: 'store/GET_UPDATE_REQUEST',
  GET_UPDATE_SUCCESS: 'store/GET_UPDATE_SUCCESS',
  GET_UPDATE_FAILURE: 'store/GET_UPDATE_FAILURE',

  // Deleta uma catergoria
  GET_DELETE_REQUEST: 'store/GET_DELETE_REQUEST',
  GET_DELETE_SUCCESS: 'store/GET_DELETE_SUCCESS',
  GET_DELETE_FAILURE: 'store/GET_DELETE_FAILURE',
};

export const initialState = {
  // Produto por id
  store: {},
  storeLoading: false,
  storeError: null,
  // Lista de categorias
  storeList: [],
  storeListLoading: false,
  storeListError: null,
  storeListTotal: 0,
  // Insere uma categoria
  storeInsertLoading: false,
  storeInsertError: false,
  // Atualiza uma categoria
  storeUpdateLoading: false,
  storeUpdateError: false,
  // Deleta categoria
  storeDeleteLoading: false,
  storeDeleteError: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    // Produto por id
    case Types.GET_REQUEST:
      return {
        ...state,
        store: {},
        storeError: null,
        storeLoading: true,
      };
    case Types.GET_SUCCESS:
      return {
        ...state,
        store: action.payload.data,
        storeLoading: false,
        storeError: null,
      };
    case Types.GET_FAILURE:
      return {
        ...state,
        storeLoading: false,
        storeError: action.payload,
      };
    // Lista de categorias
    case Types.GET_LIST_REQUEST:
      return { ...state, storeListLoading: true };
    case Types.GET_LIST_SUCCESS:
      return {
        ...state,
        storeList: action.payload.data,
        storeListLoading: false,
        storeListError: null,
        storeListTotal: action.payload.total,
      };
    case Types.GET_LIST_FAILURE:
      return {
        ...state,
        storeListLoading: false,
        storeListError: action.payload,
      };
    // Insere um categoria
    case Types.GET_INSERT_REQUEST:
      return {
        ...state,
        storeInsertLoading: true,
        storeInsertError: null,
      };
    case Types.GET_INSERT_SUCCESS:
      return {
        ...state,
        storeInsertLoading: false,
        storeInsertError: null,
      };
    case Types.GET_INSERT_FAILURE:
      return {
        ...state,
        storeInsertLoading: false,
        storeInsertError: action.payload,
      };
    // Atualiza um categoria
    case Types.GET_UPDATE_REQUEST:
      return {
        ...state,
        storeUpdateLoading: true,
        storeUpdateError: null,
      };
    case Types.GET_UPDATE_SUCCESS:
      return {
        ...state,
        storeUpdateLoading: false,
        storeUpdateError: null,
      };
    case Types.GET_UPDATE_FAILURE:
      return {
        ...state,
        storeUpdateLoading: false,
        storeUpdateError: action.payload,
      };
    // Deleta uma categoria
    case Types.GET_DELETE_REQUEST:
      return {
        ...state,
        storeDeleteLoading: true,
        storeDeleteError: null,
      };
    case Types.GET_DELETE_SUCCESS:
      return {
        ...state,
        storeDeleteLoading: false,
        storeDeleteError: null,
      };
    case Types.GET_DELETE_FAILURE:
      return {
        ...state,
        storeDeleteLoading: false,
        storeDeleteError: action.payload,
      };
    default:
      return state;
  }
};

export const Creators = {
  // Busca uma categoria
  getStoreRequest: ({ id }) => ({
    type: Types.GET_REQUEST,
    payload: { id },
  }),
  getStoreSuccess: ({ data }) => ({
    type: Types.GET_SUCCESS,
    payload: { data },
  }),
  getStoreFailure: error => ({
    type: Types.GET_FAILURE,
    payload: error,
  }),
  // Insere uma categoria
  getStoreInsertRequest: ({
    name,
    email,
    description,
    cnpj,
    social_name,
    state_register,
    cell_phone,
    cnae,
    website,
    address,
    manager,
    bank,
    image_data,
  }) => ({
    type: Types.GET_INSERT_REQUEST,
    payload: {
      name,
      email,
      description,
      cnpj,
      social_name,
      state_register,
      cell_phone,
      cnae,

      website,
      address,
      manager,
      bank,
      image_data,
    },
  }),
  getStoreInsertSuccess: () => ({
    type: Types.GET_INSERT_SUCCESS,
  }),
  getStoreInsertFailure: error => ({
    type: Types.GET_INSERT_FAILURE,
    payload: error,
  }),
  // Busca lista de categorias
  getStoreListRequest: ({
    page,
    perPage,
    search,
    orderByColumn,
    orderByDirection,
  }) => ({
    type: Types.GET_LIST_REQUEST,
    payload: { page, perPage, search, orderByColumn, orderByDirection },
  }),
  getStoreListSuccess: ({ data, total }) => ({
    type: Types.GET_LIST_SUCCESS,
    payload: { data, total },
  }),
  getStoreListFailure: error => ({
    type: Types.GET_LIST_FAILURE,
    payload: error,
  }),
  // Atualiza uma  Produto
  // Insere uma categoria
  getStoreUpdateRequest: ({
    id,
    name,
    email,
    description,
    cnpj,
    social_name,
    state_register,
    cell_phone,
    cnae,
    website,
    address,
    manager,
    bank,
    image_data,
  }) => ({
    type: Types.GET_UPDATE_REQUEST,
    payload: {
      id,
      name,
      email,
      description,
      cnpj,
      social_name,
      state_register,
      cell_phone,
      cnae,
      website,
      address,
      manager,
      bank,
      image_data,
    },
  }),
  getStoreUpdateSuccess: () => ({
    type: Types.GET_UPDATE_SUCCESS,
  }),
  getStoreUpdateFailure: error => ({
    type: Types.GET_UPDATE_FAILURE,
    payload: error,
  }),
  // Deleta uma categoria
  getStoreDeleteRequest: id => ({
    type: Types.GET_DELETE_REQUEST,
    payload: { id },
  }),
  getStoreDeleteSuccess: () => ({
    type: Types.GET_DELETE_SUCCESS,
  }),
  getStoreDeleteFailure: error => ({
    type: Types.GET_DELETE_FAILURE,
    payload: error,
  }),
};
