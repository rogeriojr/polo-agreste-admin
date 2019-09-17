/*
 *
 * Page reducer
 *
 */

export const Types = {
  // Obtem catergorias
  GET_REQUEST: 'page/GET_REQUEST',
  GET_SUCCESS: 'page/GET_SUCCESS',
  GET_FAILURE: 'page/GET_FAILURE',

  // Obtem catergorias
  GET_LIST_REQUEST: 'page/GET_LIST_REQUEST',
  GET_LIST_SUCCESS: 'page/GET_LIST_SUCCESS',
  GET_LIST_FAILURE: 'page/GET_LIST_FAILURE',

  // Insere uma catergoria
  GET_INSERT_REQUEST: 'page/GET_INSERT_REQUEST',
  GET_INSERT_SUCCESS: 'page/GET_INSERT_SUCCESS',
  GET_INSERT_FAILURE: 'page/GET_INSERT_FAILURE',

  // Atualiza uma catergoria
  GET_UPDATE_REQUEST: 'page/GET_UPDATE_REQUEST',
  GET_UPDATE_SUCCESS: 'page/GET_UPDATE_SUCCESS',
  GET_UPDATE_FAILURE: 'page/GET_UPDATE_FAILURE',

  // Deleta uma catergoria
  GET_DELETE_REQUEST: 'page/GET_DELETE_REQUEST',
  GET_DELETE_SUCCESS: 'page/GET_DELETE_SUCCESS',
  GET_DELETE_FAILURE: 'page/GET_DELETE_FAILURE',
};

export const initialState = {
  // Categoria por id
  page: {},
  pageLoading: false,
  pageError: null,
  // Lista de categorias
  pageList: [],
  pageListLoading: false,
  pageListError: null,
  pageListTotal: 0,
  // Insere uma categoria
  pageInsertLoading: false,
  pageInsertError: false,
  // Atualiza uma categoria
  pageUpdateLoading: false,
  pageUpdateError: false,
  // Deleta categoria
  pageDeleteLoading: false,
  pageDeleteError: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    // Categoria por id
    case Types.GET_REQUEST:
      return {
        ...state,
        page: {},
        pageError: null,
        pageLoading: true,
      };
    case Types.GET_SUCCESS:
      return {
        ...state,
        page: action.payload.data,
        pageLoading: false,
        pageError: null,
      };
    case Types.GET_FAILURE:
      return {
        ...state,
        pageLoading: false,
        pageError: action.payload,
      };
    // Lista de categorias
    case Types.GET_LIST_REQUEST:
      return { ...state, pageListLoading: true };
    case Types.GET_LIST_SUCCESS:
      return {
        ...state,
        pageList: action.payload.data,
        pageListLoading: false,
        pageListError: null,
        pageListTotal: action.payload.total,
      };
    case Types.GET_LIST_FAILURE:
      return {
        ...state,
        pageListLoading: false,
        pageListError: action.payload,
      };
    case Types.GET_INSERT_REQUEST:
      return {
        ...state,
        pageInsertLoading: true,
        pageInsertError: null,
      };
    case Types.GET_INSERT_SUCCESS:
      return {
        ...state,
        pageInsertLoading: false,
        pageInsertError: null,
      };
    case Types.GET_INSERT_FAILURE:
      return {
        ...state,
        pageInsertLoading: false,
        pageInsertError: action.payload,
      };
    // Atualiza um categoria
    case Types.GET_UPDATE_REQUEST:
      return {
        ...state,
        pageUpdateLoading: true,
        pageUpdateError: null,
      };
    case Types.GET_UPDATE_SUCCESS:
      return {
        ...state,
        pageUpdateLoading: false,
        pageUpdateError: null,
      };
    case Types.GET_UPDATE_FAILURE:
      return {
        ...state,
        pageUpdateLoading: false,
        pageUpdateError: action.payload,
      };
    // Deleta uma categoria
    case Types.GET_DELETE_REQUEST:
      return {
        ...state,
        pageDeleteLoading: true,
        pageDeleteError: null,
      };
    case Types.GET_DELETE_SUCCESS:
      return {
        ...state,
        pageDeleteLoading: false,
        pageDeleteError: null,
      };
    case Types.GET_DELETE_FAILURE:
      return {
        ...state,
        pageDeleteLoading: false,
        pageDeleteError: action.payload,
      };
    default:
      return state;
  }
};

export const Creators = {
  // Busca uma categoria
  getPageRequest: ({ id }) => ({
    type: Types.GET_REQUEST,
    payload: { id },
  }),
  getPageSuccess: ({ data }) => ({
    type: Types.GET_SUCCESS,
    payload: { data },
  }),
  getPageFailure: error => ({
    type: Types.GET_FAILURE,
    payload: error,
  }),
  // Insere uma categoria
  getPageInsertRequest: ({ name, description }) => ({
    type: Types.GET_INSERT_REQUEST,
    payload: { name, description },
  }),
  getPageInsertSuccess: () => ({
    type: Types.GET_INSERT_SUCCESS,
  }),
  getPageInsertFailure: error => ({
    type: Types.GET_INSERT_FAILURE,
    payload: error,
  }),
  // Busca lista de categorias
  getPageListRequest: ({
    page,
    perPage,
    search,
    orderByColumn,
    orderByDirection,
  }) => ({
    type: Types.GET_LIST_REQUEST,
    payload: { page, perPage, search, orderByColumn, orderByDirection },
  }),
  getPageListSuccess: ({ data, total }) => ({
    type: Types.GET_LIST_SUCCESS,
    payload: { data, total },
  }),
  getPageListFailure: error => ({
    type: Types.GET_LIST_FAILURE,
    payload: error,
  }),
  // Atualiza uma  Categoria
  // Insere uma categoria
  getPageUpdateRequest: ({ id, name, description }) => ({
    type: Types.GET_UPDATE_REQUEST,
    payload: { id, name, description },
  }),
  getPageUpdateSuccess: () => ({
    type: Types.GET_UPDATE_SUCCESS,
  }),
  getPageUpdateFailure: error => ({
    type: Types.GET_UPDATE_FAILURE,
    payload: error,
  }),
  // Deleta uma categoria
  getPageDeleteRequest: id => ({
    type: Types.GET_DELETE_REQUEST,
    payload: { id },
  }),
  getPageDeleteSuccess: () => ({
    type: Types.GET_DELETE_SUCCESS,
  }),
  getPageDeleteFailure: error => ({
    type: Types.GET_DELETE_FAILURE,
    payload: error,
  }),
};
