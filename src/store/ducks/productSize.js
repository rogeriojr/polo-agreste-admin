/*
 *
 * ProductSize reducer
 *
 */

export const Types = {
  // Obtem catergorias
  GET_REQUEST: 'productSize/GET_REQUEST',
  GET_SUCCESS: 'productSize/GET_SUCCESS',
  GET_FAILURE: 'productSize/GET_FAILURE',

  // Obtem catergorias
  GET_LIST_REQUEST: 'productSize/GET_LIST_REQUEST',
  GET_LIST_SUCCESS: 'productSize/GET_LIST_SUCCESS',
  GET_LIST_FAILURE: 'productSize/GET_LIST_FAILURE',

  // Insere uma catergoria
  GET_INSERT_REQUEST: 'productSize/GET_INSERT_REQUEST',
  GET_INSERT_SUCCESS: 'productSize/GET_INSERT_SUCCESS',
  GET_INSERT_FAILURE: 'productSize/GET_INSERT_FAILURE',

  // Atualiza uma catergoria
  GET_UPDATE_REQUEST: 'productSize/GET_UPDATE_REQUEST',
  GET_UPDATE_SUCCESS: 'productSize/GET_UPDATE_SUCCESS',
  GET_UPDATE_FAILURE: 'productSize/GET_UPDATE_FAILURE',

  // Deleta uma catergoria
  GET_DELETE_REQUEST: 'productSize/GET_DELETE_REQUEST',
  GET_DELETE_SUCCESS: 'productSize/GET_DELETE_SUCCESS',
  GET_DELETE_FAILURE: 'productSize/GET_DELETE_FAILURE',
};

export const initialState = {
  // Categoria por id
  productSize: {},
  productSizeLoading: false,
  productSizeError: null,
  // Lista de categorias
  productSizeList: [],
  productSizeListLoading: false,
  productSizeListError: null,
  productSizeListTotal: 0,
  // Atualiza uma categoria
  productSizeUpdateLoading: false,
  productSizeUpdateError: false,
  // Deleta categoria
  productSizeDeleteLoading: false,
  productSizeDeleteError: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    // Categoria por id
    case Types.GET_REQUEST:
      return {
        ...state,
        productSize: {},
        productSizeError: null,
        productSizeLoading: true,
      };
    case Types.GET_SUCCESS:
      return {
        ...state,
        productSize: action.payload.data,
        productSizeLoading: false,
        productSizeError: null,
      };
    case Types.GET_FAILURE:
      return {
        ...state,
        productSizeLoading: false,
        productSizeError: action.payload,
      };
    // Lista de categorias
    case Types.GET_LIST_REQUEST:
      return { ...state, productSizeListLoading: true };
    case Types.GET_LIST_SUCCESS:
      return {
        ...state,
        productSizeList: action.payload.data,
        productSizeListLoading: false,
        productSizeListError: null,
        productSizeListTotal: action.payload.total,
      };
    case Types.GET_LIST_FAILURE:
      return {
        ...state,
        productSizeListLoading: false,
        productSizeListError: action.payload,
      };
    // Atualiza um categoria
    case Types.GET_UPDATE_REQUEST:
      return {
        ...state,
        productSizeUpdateLoading: true,
        productSizeUpdateError: null,
      };
    case Types.GET_UPDATE_SUCCESS:
      return {
        ...state,
        productSizeUpdateLoading: false,
        productSizeUpdateError: null,
      };
    case Types.GET_UPDATE_FAILURE:
      return {
        ...state,
        productSizeUpdateLoading: false,
        productSizeListError: action.payload,
      };
    // Deleta uma categoria
    case Types.GET_DELETE_REQUEST:
      return {
        ...state,
        productSizeDeleteLoading: true,
        productSizeDeleteError: null,
      };
    case Types.GET_DELETE_SUCCESS:
      return {
        ...state,
        productSizeDeleteLoading: false,
        productSizeDeleteError: null,
      };
    case Types.GET_DELETE_FAILURE:
      return {
        ...state,
        productSizeDeleteLoading: false,
        productSizeDeleteError: action.payload,
      };
    default:
      return state;
  }
};

export const Creators = {
  // Busca uma categoria
  getProductSizeRequest: ({ id }) => ({
    type: Types.GET_REQUEST,
    payload: { id },
  }),
  getProductSizeSuccess: ({ data }) => ({
    type: Types.GET_SUCCESS,
    payload: { data },
  }),
  getProductSizeFailure: error => ({
    type: Types.GET_FAILURE,
    payload: error,
  }),
  // Insere uma categoria
  getProductSizeInsertRequest: ({
    productSize_father,
    description,
    name,
    order_position,
  }) => ({
    type: Types.GET_INSERT_REQUEST,
    payload: { productSize_father, description, name, order_position },
  }),
  getProductSizeInsertSuccess: ({ data }) => ({
    type: Types.GET_INSERT_SUCCESS,
    payload: { data },
  }),
  getProductSizeInsertFailure: error => ({
    type: Types.GET_INSERT_FAILURE,
    payload: error,
  }),
  // Busca lista de categorias
  getProductSizeListRequest: ({
    page,
    perPage,
    search,
    orderByColumn,
    orderByDirection,
  }) => ({
    type: Types.GET_LIST_REQUEST,
    payload: { page, perPage, search, orderByColumn, orderByDirection },
  }),
  getProductSizeListSuccess: ({ data, total }) => ({
    type: Types.GET_LIST_SUCCESS,
    payload: { data, total },
  }),
  getProductSizeListFailure: error => ({
    type: Types.GET_LIST_FAILURE,
    payload: error,
  }),
  // Atualiza uma  Categoria
  // Insere uma categoria
  getProductSizeUpdateRequest: ({
    id,
    productSize_father,
    description,
    name,
    order_position,
  }) => ({
    type: Types.GET_UPDATE_REQUEST,
    payload: { id, productSize_father, description, name, order_position },
  }),
  getProductSizeUpdateSuccess: () => ({
    type: Types.GET_UPDATE_SUCCESS,
  }),
  getProductSizeUpdateFailure: error => ({
    type: Types.GET_UPDATE_FAILURE,
    payload: error,
  }),
  // Deleta uma categoria
  getProductSizeDeleteRequest: id => ({
    type: Types.GET_DELETE_REQUEST,
    payload: { id },
  }),
  getProductSizeDeleteSuccess: () => ({
    type: Types.GET_DELETE_SUCCESS,
  }),
  getProductSizeDeleteFailure: error => ({
    type: Types.GET_DELETE_FAILURE,
    payload: error,
  }),
};
