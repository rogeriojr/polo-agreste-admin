/*
 *
 * ProductColor reducer
 *
 */

export const Types = {
  // Obtem catergorias
  GET_REQUEST: 'productColor/GET_REQUEST',
  GET_SUCCESS: 'productColor/GET_SUCCESS',
  GET_FAILURE: 'productColor/GET_FAILURE',

  // Obtem catergorias
  GET_LIST_REQUEST: 'productColor/GET_LIST_REQUEST',
  GET_LIST_SUCCESS: 'productColor/GET_LIST_SUCCESS',
  GET_LIST_FAILURE: 'productColor/GET_LIST_FAILURE',

  // Insere uma catergoria
  GET_INSERT_REQUEST: 'productColor/GET_INSERT_REQUEST',
  GET_INSERT_SUCCESS: 'productColor/GET_INSERT_SUCCESS',
  GET_INSERT_FAILURE: 'productColor/GET_INSERT_FAILURE',

  // Atualiza uma catergoria
  GET_UPDATE_REQUEST: 'productColor/GET_UPDATE_REQUEST',
  GET_UPDATE_SUCCESS: 'productColor/GET_UPDATE_SUCCESS',
  GET_UPDATE_FAILURE: 'productColor/GET_UPDATE_FAILURE',

  // Deleta uma catergoria
  GET_DELETE_REQUEST: 'productColor/GET_DELETE_REQUEST',
  GET_DELETE_SUCCESS: 'productColor/GET_DELETE_SUCCESS',
  GET_DELETE_FAILURE: 'productColor/GET_DELETE_FAILURE',
};

export const initialState = {
  // Categoria por id
  productColor: {},
  productColorLoading: false,
  productColorError: null,
  // Lista de categorias
  productColorList: [],
  productColorListLoading: false,
  productColorListError: null,
  productColorListTotal: 0,
  // Atualiza uma categoria
  productColorUpdateLoading: false,
  productColorUpdateError: false,
  // Deleta categoria
  productColorDeleteLoading: false,
  productColorDeleteError: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    // Categoria por id
    case Types.GET_REQUEST:
      return {
        ...state,
        productColor: {},
        productColorError: null,
        productColorLoading: true,
      };
    case Types.GET_SUCCESS:
      return {
        ...state,
        productColor: action.payload.data,
        productColorLoading: false,
        productColorError: null,
      };
    case Types.GET_FAILURE:
      return {
        ...state,
        productColorLoading: false,
        productColorError: action.payload,
      };
    // Lista de categorias
    case Types.GET_LIST_REQUEST:
      return { ...state, productColorListLoading: true };
    case Types.GET_LIST_SUCCESS:
      return {
        ...state,
        productColorList: action.payload.data,
        productColorListLoading: false,
        productColorListError: null,
        productColorListTotal: action.payload.total,
      };
    case Types.GET_LIST_FAILURE:
      return {
        ...state,
        productColorListLoading: false,
        productColorListError: action.payload,
      };
    // Atualiza um categoria
    case Types.GET_UPDATE_REQUEST:
      return {
        ...state,
        productColorUpdateLoading: true,
        productColorUpdateError: null,
      };
    case Types.GET_UPDATE_SUCCESS:
      return {
        ...state,
        productColorUpdateLoading: false,
        productColorUpdateError: null,
      };
    case Types.GET_UPDATE_FAILURE:
      return {
        ...state,
        productColorUpdateLoading: false,
        productColorListError: action.payload,
      };
    // Deleta uma categoria
    case Types.GET_DELETE_REQUEST:
      return {
        ...state,
        productColorDeleteLoading: true,
        productColorDeleteError: null,
      };
    case Types.GET_DELETE_SUCCESS:
      return {
        ...state,
        productColorDeleteLoading: false,
        productColorDeleteError: null,
      };
    case Types.GET_DELETE_FAILURE:
      return {
        ...state,
        productColorDeleteLoading: false,
        productColorDeleteError: action.payload,
      };
    default:
      return state;
  }
};

export const Creators = {
  // Busca uma categoria
  getProductColorRequest: ({ id }) => ({
    type: Types.GET_REQUEST,
    payload: { id },
  }),
  getProductColorSuccess: ({ data }) => ({
    type: Types.GET_SUCCESS,
    payload: { data },
  }),
  getProductColorFailure: error => ({
    type: Types.GET_FAILURE,
    payload: error,
  }),
  // Insere uma categoria
  getProductColorInsertRequest: ({
    order_position,
    hexa,
    code,
    name,
    status,
  }) => ({
    type: Types.GET_INSERT_REQUEST,
    payload: {
      order_position,
      hexa,
      code,
      name,
      status,
    },
  }),
  getProductColorInsertSuccess: () => ({
    type: Types.GET_INSERT_SUCCESS,
  }),
  getProductColorInsertFailure: error => ({
    type: Types.GET_INSERT_FAILURE,
    payload: error,
  }),
  // Busca lista de categorias
  getProductColorListRequest: ({
    page,
    perPage,
    search,
    orderByColumn,
    orderByDirection,
  }) => ({
    type: Types.GET_LIST_REQUEST,
    payload: { page, perPage, search, orderByColumn, orderByDirection },
  }),
  getProductColorListSuccess: ({ data, total }) => ({
    type: Types.GET_LIST_SUCCESS,
    payload: { data, total },
  }),
  getProductColorListFailure: error => ({
    type: Types.GET_LIST_FAILURE,
    payload: error,
  }),
  // Atualiza uma  Categoria
  // Insere uma categoria
  getProductColorUpdateRequest: ({
    id,
    order_position,
    hexa,
    code,
    name,
    status,
  }) => ({
    type: Types.GET_UPDATE_REQUEST,
    payload: {
      id,
      order_position,
      hexa,
      code,
      name,
      status,
    },
  }),
  getProductColorUpdateSuccess: () => ({
    type: Types.GET_UPDATE_SUCCESS,
  }),
  getProductColorUpdateFailure: error => ({
    type: Types.GET_UPDATE_FAILURE,
    payload: error,
  }),
  // Deleta uma categoria
  getProductColorDeleteRequest: id => ({
    type: Types.GET_DELETE_REQUEST,
    payload: { id },
  }),
  getProductColorDeleteSuccess: () => ({
    type: Types.GET_DELETE_SUCCESS,
  }),
  getProductColorDeleteFailure: error => ({
    type: Types.GET_DELETE_FAILURE,
    payload: error,
  }),
};
