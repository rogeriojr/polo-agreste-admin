/*
 *
 * Trend reducer
 *
 */

export const Types = {
  // Obtem catergorias
  GET_REQUEST: 'trend/GET_REQUEST',
  GET_SUCCESS: 'trend/GET_SUCCESS',
  GET_FAILURE: 'trend/GET_FAILURE',

  // Obtem catergorias
  GET_LIST_REQUEST: 'trend/GET_LIST_REQUEST',
  GET_LIST_SUCCESS: 'trend/GET_LIST_SUCCESS',
  GET_LIST_FAILURE: 'trend/GET_LIST_FAILURE',

  // Insere uma catergoria
  GET_INSERT_REQUEST: 'trend/GET_INSERT_REQUEST',
  GET_INSERT_SUCCESS: 'trend/GET_INSERT_SUCCESS',
  GET_INSERT_FAILURE: 'trend/GET_INSERT_FAILURE',

  // Atualiza uma catergoria
  GET_UPDATE_REQUEST: 'trend/GET_UPDATE_REQUEST',
  GET_UPDATE_SUCCESS: 'trend/GET_UPDATE_SUCCESS',
  GET_UPDATE_FAILURE: 'trend/GET_UPDATE_FAILURE',

  // Deleta uma catergoria
  GET_DELETE_REQUEST: 'trend/GET_DELETE_REQUEST',
  GET_DELETE_SUCCESS: 'trend/GET_DELETE_SUCCESS',
  GET_DELETE_FAILURE: 'trend/GET_DELETE_FAILURE',

  // Deleta uma catergoria
  GET_IMAGE_DELETE_REQUEST: 'trend/GET_IMAGE_DELETE_REQUEST',
  GET_IMAGE_DELETE_SUCCESS: 'trend/GET_IMAGE_DELETE_SUCCESS',
  GET_IMAGE_DELETE_FAILURE: 'trend/GET_IMAGE_DELETE_FAILURE',
};

export const initialState = {
  // Produto por id
  trend: {},
  trendLoading: false,
  trendError: null,
  // Lista de categorias
  trendList: [],
  trendListLoading: false,
  trendListError: null,
  trendListTotal: 0,
  // Insere uma categoria
  trendInsertLoading: false,
  trendInsertError: false,
  // Atualiza uma categoria
  trendUpdateLoading: false,
  trendUpdateError: false,
  // Deleta categoria
  trendDeleteLoading: false,
  trendDeleteError: null,

  // Deleta uma imagem de categoria
  trendImageDeleteLoading: false,
  trendImageDeleteError: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    // Produto por id
    case Types.GET_REQUEST:
      return {
        ...state,
        trend: {},
        trendError: null,
        trendLoading: true,
      };
    case Types.GET_SUCCESS:
      return {
        ...state,
        trend: action.payload.data,
        trendLoading: false,
        trendError: null,
      };
    case Types.GET_FAILURE:
      return {
        ...state,
        trendLoading: false,
        trendError: action.payload,
      };
    // Lista de categorias
    case Types.GET_LIST_REQUEST:
      return { ...state, trendListLoading: true };
    case Types.GET_LIST_SUCCESS:
      return {
        ...state,
        trendList: action.payload.data,
        trendListLoading: false,
        trendListError: null,
        trendListTotal: action.payload.total,
      };
    case Types.GET_LIST_FAILURE:
      return {
        ...state,
        trendListLoading: false,
        trendListError: action.payload,
      };
    // Insere um categoria
    case Types.GET_INSERT_REQUEST:
      return {
        ...state,
        trendInsertLoading: true,
        trendInsertError: null,
      };
    case Types.GET_INSERT_SUCCESS:
      return {
        ...state,
        trendInsertLoading: false,
        trendInsertError: null,
      };
    case Types.GET_INSERT_FAILURE:
      return {
        ...state,
        trendInsertLoading: false,
        trendInsertError: action.payload,
      };
    // Atualiza um categoria
    case Types.GET_UPDATE_REQUEST:
      return {
        ...state,
        trendUpdateLoading: true,
        trendUpdateError: null,
      };
    case Types.GET_UPDATE_SUCCESS:
      return {
        ...state,
        trendUpdateLoading: false,
        trendUpdateError: null,
      };
    case Types.GET_UPDATE_FAILURE:
      return {
        ...state,
        trendUpdateLoading: false,
        trendUpdateError: action.payload,
      };
    // Deleta uma categoria
    case Types.GET_DELETE_REQUEST:
      return {
        ...state,
        trendDeleteLoading: true,
        trendDeleteError: null,
      };
    case Types.GET_DELETE_SUCCESS:
      return {
        ...state,
        trendDeleteLoading: false,
        trendDeleteError: null,
      };
    case Types.GET_DELETE_FAILURE:
      return {
        ...state,
        trendDeleteLoading: false,
        trendDeleteError: action.payload,
      };
    // Deleta uma image de categoria
    case Types.GET_IMAGE_DELETE_REQUEST:
      return {
        ...state,
        trendImageDeleteLoading: true,
        trendImageDeleteError: null,
      };
    case Types.GET_IMAGE_DELETE_SUCCESS:
      return {
        ...state,
        trendImageDeleteLoading: false,
        trendImageDeleteError: null,
      };
    case Types.GET_IMAGE_DELETE_FAILURE:
      return {
        ...state,
        trendImageDeleteLoading: false,
        trendImageDeleteError: action.payload,
      };
    default:
      return state;
  }
};

export const Creators = {
  // Busca uma categoria
  getTrendRequest: ({ id }) => ({
    type: Types.GET_REQUEST,
    payload: { id },
  }),
  getTrendSuccess: ({ data }) => ({
    type: Types.GET_SUCCESS,
    payload: { data },
  }),
  getTrendFailure: error => ({
    type: Types.GET_FAILURE,
    payload: error,
  }),
  // Insere uma categoria
  getTrendInsertRequest: ({
    name,
    price,
    price_whole,
    date_end,
    status,
    products,
    images_data,
  }) => ({
    type: Types.GET_INSERT_REQUEST,
    payload: {
      name,
      price,
      price_whole,
      date_end,
      status,
      products,
      images_data,
    },
  }),
  getTrendInsertSuccess: () => ({
    type: Types.GET_INSERT_SUCCESS,
  }),
  getTrendInsertFailure: error => ({
    type: Types.GET_INSERT_FAILURE,
    payload: error,
  }),
  // Busca lista de categorias
  getTrendListRequest: ({
    page,
    perPage,
    search,
    orderByColumn,
    orderByDirection,
  }) => ({
    type: Types.GET_LIST_REQUEST,
    payload: { page, perPage, search, orderByColumn, orderByDirection },
  }),
  getTrendListSuccess: ({ data, total }) => ({
    type: Types.GET_LIST_SUCCESS,
    payload: { data, total },
  }),
  getTrendListFailure: error => ({
    type: Types.GET_LIST_FAILURE,
    payload: error,
  }),
  // Atualiza uma  Produto
  // Insere uma categoria
  getTrendUpdateRequest: ({
    id,
    name,
    price,
    price_whole,
    date_end,
    status,
    products,
    images_data,
  }) => ({
    type: Types.GET_UPDATE_REQUEST,
    payload: {
      id,
      name,
      price,
      price_whole,
      date_end,
      status,
      products,
      images_data,
    },
  }),
  getTrendUpdateSuccess: () => ({
    type: Types.GET_UPDATE_SUCCESS,
  }),
  getTrendUpdateFailure: error => ({
    type: Types.GET_UPDATE_FAILURE,
    payload: error,
  }),
  // Deleta uma categoria
  getTrendDeleteRequest: id => ({
    type: Types.GET_DELETE_REQUEST,
    payload: { id },
  }),
  getTrendDeleteSuccess: () => ({
    type: Types.GET_DELETE_SUCCESS,
  }),
  getTrendDeleteFailure: error => ({
    type: Types.GET_DELETE_FAILURE,
    payload: error,
  }),

  // Deleta uma image categoria
  getImageTrendDeleteRequest: ({ id, id_trend }) => ({
    type: Types.GET_IMAGE_DELETE_REQUEST,
    payload: { id, id_trend },
  }),
  getImageTrendDeleteSuccess: () => ({
    type: Types.GET_IMAGE_DELETE_SUCCESS,
  }),
  getImageTrendDeleteFailure: error => ({
    type: Types.GET_IMAGE_DELETE_FAILURE,
    payload: error,
  }),
};
