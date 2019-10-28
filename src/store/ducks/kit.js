/*
 *
 * Kit reducer
 *
 */

export const Types = {
  // Obtem catergorias
  GET_REQUEST: 'kit/GET_REQUEST',
  GET_SUCCESS: 'kit/GET_SUCCESS',
  GET_FAILURE: 'kit/GET_FAILURE',

  // Obtem catergorias
  GET_LIST_REQUEST: 'kit/GET_LIST_REQUEST',
  GET_LIST_SUCCESS: 'kit/GET_LIST_SUCCESS',
  GET_LIST_FAILURE: 'kit/GET_LIST_FAILURE',

  // Insere uma catergoria
  GET_INSERT_REQUEST: 'kit/GET_INSERT_REQUEST',
  GET_INSERT_SUCCESS: 'kit/GET_INSERT_SUCCESS',
  GET_INSERT_FAILURE: 'kit/GET_INSERT_FAILURE',

  // Atualiza uma catergoria
  GET_UPDATE_REQUEST: 'kit/GET_UPDATE_REQUEST',
  GET_UPDATE_SUCCESS: 'kit/GET_UPDATE_SUCCESS',
  GET_UPDATE_FAILURE: 'kit/GET_UPDATE_FAILURE',

  // Deleta uma catergoria
  GET_DELETE_REQUEST: 'kit/GET_DELETE_REQUEST',
  GET_DELETE_SUCCESS: 'kit/GET_DELETE_SUCCESS',
  GET_DELETE_FAILURE: 'kit/GET_DELETE_FAILURE',

  // Deleta uma catergoria
  GET_IMAGE_DELETE_REQUEST: 'kit/GET_IMAGE_DELETE_REQUEST',
  GET_IMAGE_DELETE_SUCCESS: 'kit/GET_IMAGE_DELETE_SUCCESS',
  GET_IMAGE_DELETE_FAILURE: 'kit/GET_IMAGE_DELETE_FAILURE',
};

export const initialState = {
  // Produto por id
  kit: {},
  kitLoading: false,
  kitError: null,
  // Lista de categorias
  kitList: [],
  kitListLoading: false,
  kitListError: null,
  kitListTotal: 0,
  // Insere uma categoria
  kitInsertLoading: false,
  kitInsertError: false,
  // Atualiza uma categoria
  kitUpdateLoading: false,
  kitUpdateError: false,
  // Deleta categoria
  kitDeleteLoading: false,
  kitDeleteError: null,

  // Deleta uma imagem de categoria
  kitImageDeleteLoading: false,
  kitImageDeleteError: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    // Produto por id
    case Types.GET_REQUEST:
      return {
        ...state,
        kit: {},
        kitError: null,
        kitLoading: true,
      };
    case Types.GET_SUCCESS:
      return {
        ...state,
        kit: action.payload.data,
        kitLoading: false,
        kitError: null,
      };
    case Types.GET_FAILURE:
      return {
        ...state,
        kitLoading: false,
        kitError: action.payload,
      };
    // Lista de categorias
    case Types.GET_LIST_REQUEST:
      return { ...state, kitListLoading: true };
    case Types.GET_LIST_SUCCESS:
      return {
        ...state,
        kitList: action.payload.data,
        kitListLoading: false,
        kitListError: null,
        kitListTotal: action.payload.total,
      };
    case Types.GET_LIST_FAILURE:
      return {
        ...state,
        kitListLoading: false,
        kitListError: action.payload,
      };
    // Insere um categoria
    case Types.GET_INSERT_REQUEST:
      return {
        ...state,
        kitInsertLoading: true,
        kitInsertError: null,
      };
    case Types.GET_INSERT_SUCCESS:
      return {
        ...state,
        kitInsertLoading: false,
        kitInsertError: null,
      };
    case Types.GET_INSERT_FAILURE:
      return {
        ...state,
        kitInsertLoading: false,
        kitInsertError: action.payload,
      };
    // Atualiza um categoria
    case Types.GET_UPDATE_REQUEST:
      return {
        ...state,
        kitUpdateLoading: true,
        kitUpdateError: null,
      };
    case Types.GET_UPDATE_SUCCESS:
      return {
        ...state,
        kitUpdateLoading: false,
        kitUpdateError: null,
      };
    case Types.GET_UPDATE_FAILURE:
      return {
        ...state,
        kitUpdateLoading: false,
        kitUpdateError: action.payload,
      };
    // Deleta uma categoria
    case Types.GET_DELETE_REQUEST:
      return {
        ...state,
        kitDeleteLoading: true,
        kitDeleteError: null,
      };
    case Types.GET_DELETE_SUCCESS:
      return {
        ...state,
        kitDeleteLoading: false,
        kitDeleteError: null,
      };
    case Types.GET_DELETE_FAILURE:
      return {
        ...state,
        kitDeleteLoading: false,
        kitDeleteError: action.payload,
      };
    // Deleta uma image de categoria
    case Types.GET_IMAGE_DELETE_REQUEST:
      return {
        ...state,
        kitImageDeleteLoading: true,
        kitImageDeleteError: null,
      };
    case Types.GET_IMAGE_DELETE_SUCCESS:
      return {
        ...state,
        kitImageDeleteLoading: false,
        kitImageDeleteError: null,
      };
    case Types.GET_IMAGE_DELETE_FAILURE:
      return {
        ...state,
        kitImageDeleteLoading: false,
        kitImageDeleteError: action.payload,
      };
    default:
      return state;
  }
};

export const Creators = {
  // Busca uma categoria
  getKitRequest: ({ id }) => ({
    type: Types.GET_REQUEST,
    payload: { id },
  }),
  getKitSuccess: ({ data }) => ({
    type: Types.GET_SUCCESS,
    payload: { data },
  }),
  getKitFailure: error => ({
    type: Types.GET_FAILURE,
    payload: error,
  }),
  // Insere uma categoria
  getKitInsertRequest: ({
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
  getKitInsertSuccess: () => ({
    type: Types.GET_INSERT_SUCCESS,
  }),
  getKitInsertFailure: error => ({
    type: Types.GET_INSERT_FAILURE,
    payload: error,
  }),
  // Busca lista de categorias
  getKitListRequest: ({
    page,
    perPage,
    search,
    orderByColumn,
    orderByDirection,
  }) => ({
    type: Types.GET_LIST_REQUEST,
    payload: { page, perPage, search, orderByColumn, orderByDirection },
  }),
  getKitListSuccess: ({ data, total }) => ({
    type: Types.GET_LIST_SUCCESS,
    payload: { data, total },
  }),
  getKitListFailure: error => ({
    type: Types.GET_LIST_FAILURE,
    payload: error,
  }),
  // Atualiza uma  Produto
  // Insere uma categoria
  getKitUpdateRequest: ({
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
  getKitUpdateSuccess: () => ({
    type: Types.GET_UPDATE_SUCCESS,
  }),
  getKitUpdateFailure: error => ({
    type: Types.GET_UPDATE_FAILURE,
    payload: error,
  }),
  // Deleta uma categoria
  getKitDeleteRequest: id => ({
    type: Types.GET_DELETE_REQUEST,
    payload: { id },
  }),
  getKitDeleteSuccess: () => ({
    type: Types.GET_DELETE_SUCCESS,
  }),
  getKitDeleteFailure: error => ({
    type: Types.GET_DELETE_FAILURE,
    payload: error,
  }),

  // Deleta uma image categoria
  getImageKitDeleteRequest: ({ id, id_kit }) => ({
    type: Types.GET_IMAGE_DELETE_REQUEST,
    payload: { id, id_kit },
  }),
  getImageKitDeleteSuccess: () => ({
    type: Types.GET_IMAGE_DELETE_SUCCESS,
  }),
  getImageKitDeleteFailure: error => ({
    type: Types.GET_IMAGE_DELETE_FAILURE,
    payload: error,
  }),
};
