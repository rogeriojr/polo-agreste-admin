/*
 *
 * Scroll reducer
 *
 */

export const Types = {
  // Obtem catergorias
  GET_REQUEST: 'scroll/GET_REQUEST',
  GET_SUCCESS: 'scroll/GET_SUCCESS',
  GET_FAILURE: 'scroll/GET_FAILURE',

  // Obtem catergorias
  GET_LIST_REQUEST: 'scroll/GET_LIST_REQUEST',
  GET_LIST_SUCCESS: 'scroll/GET_LIST_SUCCESS',
  GET_LIST_FAILURE: 'scroll/GET_LIST_FAILURE',

  // Insere uma catergoria
  GET_INSERT_REQUEST: 'scroll/GET_INSERT_REQUEST',
  GET_INSERT_SUCCESS: 'scroll/GET_INSERT_SUCCESS',
  GET_INSERT_FAILURE: 'scroll/GET_INSERT_FAILURE',

  // Atualiza uma catergoria
  GET_UPDATE_REQUEST: 'scroll/GET_UPDATE_REQUEST',
  GET_UPDATE_SUCCESS: 'scroll/GET_UPDATE_SUCCESS',
  GET_UPDATE_FAILURE: 'scroll/GET_UPDATE_FAILURE',

  // Deleta uma catergoria
  GET_DELETE_REQUEST: 'scroll/GET_DELETE_REQUEST',
  GET_DELETE_SUCCESS: 'scroll/GET_DELETE_SUCCESS',
  GET_DELETE_FAILURE: 'scroll/GET_DELETE_FAILURE',

  // Deleta uma catergoria
  GET_IMAGE_DELETE_REQUEST: 'scroll/GET_IMAGE_DELETE_REQUEST',
  GET_IMAGE_DELETE_SUCCESS: 'scroll/GET_IMAGE_DELETE_SUCCESS',
  GET_IMAGE_DELETE_FAILURE: 'scroll/GET_IMAGE_DELETE_FAILURE',
};

export const initialState = {
  // Produto por id
  scroll: {},
  scrollLoading: false,
  scrollError: null,
  // Lista de categorias
  scrollList: [],
  scrollListLoading: false,
  scrollListError: null,
  scrollListTotal: 0,
  // Insere uma categoria
  scrollInsertLoading: false,
  scrollInsertError: false,
  // Atualiza uma categoria
  scrollUpdateLoading: false,
  scrollUpdateError: false,
  // Deleta categoria
  scrollDeleteLoading: false,
  scrollDeleteError: null,

  // Deleta uma imagem de categoria
  scrollImageDeleteLoading: false,
  scrollImageDeleteError: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    // Produto por id
    case Types.GET_REQUEST:
      return {
        ...state,
        scroll: {},
        scrollError: null,
        scrollLoading: true,
      };
    case Types.GET_SUCCESS:
      return {
        ...state,
        scroll: action.payload.data,
        scrollLoading: false,
        scrollError: null,
      };
    case Types.GET_FAILURE:
      return {
        ...state,
        scrollLoading: false,
        scrollError: action.payload,
      };
    // Lista de categorias
    case Types.GET_LIST_REQUEST:
      return { ...state, scrollListLoading: true };
    case Types.GET_LIST_SUCCESS:
      return {
        ...state,
        scrollList: action.payload.data,
        scrollListLoading: false,
        scrollListError: null,
        scrollListTotal: action.payload.total,
      };
    case Types.GET_LIST_FAILURE:
      return {
        ...state,
        scrollListLoading: false,
        scrollListError: action.payload,
      };
    // Insere um categoria
    case Types.GET_INSERT_REQUEST:
      return {
        ...state,
        scrollInsertLoading: true,
        scrollInsertError: null,
      };
    case Types.GET_INSERT_SUCCESS:
      return {
        ...state,
        scrollInsertLoading: false,
        scrollInsertError: null,
      };
    case Types.GET_INSERT_FAILURE:
      return {
        ...state,
        scrollInsertLoading: false,
        scrollInsertError: action.payload,
      };
    // Atualiza um categoria
    case Types.GET_UPDATE_REQUEST:
      return {
        ...state,
        scrollUpdateLoading: true,
        scrollUpdateError: null,
      };
    case Types.GET_UPDATE_SUCCESS:
      return {
        ...state,
        scrollUpdateLoading: false,
        scrollUpdateError: null,
      };
    case Types.GET_UPDATE_FAILURE:
      return {
        ...state,
        scrollUpdateLoading: false,
        scrollUpdateError: action.payload,
      };
    // Deleta uma categoria
    case Types.GET_DELETE_REQUEST:
      return {
        ...state,
        scrollDeleteLoading: true,
        scrollDeleteError: null,
      };
    case Types.GET_DELETE_SUCCESS:
      return {
        ...state,
        scrollDeleteLoading: false,
        scrollDeleteError: null,
      };
    case Types.GET_DELETE_FAILURE:
      return {
        ...state,
        scrollDeleteLoading: false,
        scrollDeleteError: action.payload,
      };
    // Deleta uma image de categoria
    case Types.GET_IMAGE_DELETE_REQUEST:
      return {
        ...state,
        scrollImageDeleteLoading: true,
        scrollImageDeleteError: null,
      };
    case Types.GET_IMAGE_DELETE_SUCCESS:
      return {
        ...state,
        scrollImageDeleteLoading: false,
        scrollImageDeleteError: null,
      };
    case Types.GET_IMAGE_DELETE_FAILURE:
      return {
        ...state,
        scrollImageDeleteLoading: false,
        scrollImageDeleteError: action.payload,
      };
    default:
      return state;
  }
};

export const Creators = {
  // Busca uma categoria
  getScrollRequest: ({ id }) => ({
    type: Types.GET_REQUEST,
    payload: { id },
  }),
  getScrollSuccess: ({ data }) => ({
    type: Types.GET_SUCCESS,
    payload: { data },
  }),
  getScrollFailure: error => ({
    type: Types.GET_FAILURE,
    payload: error,
  }),
  // Insere uma categoria
  getScrollInsertRequest: ({
    name,
    route_app,
    status,
    description,
    order_position,
    image_data,
  }) => ({
    type: Types.GET_INSERT_REQUEST,
    payload: {
      name,
      route_app,
      status,
      description,
      order_position,
      image_data,
    },
  }),
  getScrollInsertSuccess: () => ({
    type: Types.GET_INSERT_SUCCESS,
  }),
  getScrollInsertFailure: error => ({
    type: Types.GET_INSERT_FAILURE,
    payload: error,
  }),
  // Busca lista de categorias
  getScrollListRequest: ({
    page,
    perPage,
    search,
    orderByColumn,
    orderByDirection,
  }) => ({
    type: Types.GET_LIST_REQUEST,
    payload: { page, perPage, search, orderByColumn, orderByDirection },
  }),
  getScrollListSuccess: ({ data, total }) => ({
    type: Types.GET_LIST_SUCCESS,
    payload: { data, total },
  }),
  getScrollListFailure: error => ({
    type: Types.GET_LIST_FAILURE,
    payload: error,
  }),
  // Atualiza uma  Produto
  // Insere uma categoria
  getScrollUpdateRequest: ({
    id,
    name,
    route_app,
    status,
    description,
    order_position,
    image_data,
  }) => ({
    type: Types.GET_UPDATE_REQUEST,
    payload: {
      id,
      name,
      route_app,
      status,
      description,
      order_position,
      image_data,
    },
  }),
  getScrollUpdateSuccess: () => ({
    type: Types.GET_UPDATE_SUCCESS,
  }),
  getScrollUpdateFailure: error => ({
    type: Types.GET_UPDATE_FAILURE,
    payload: error,
  }),
  // Deleta uma categoria
  getScrollDeleteRequest: id => ({
    type: Types.GET_DELETE_REQUEST,
    payload: { id },
  }),
  getScrollDeleteSuccess: () => ({
    type: Types.GET_DELETE_SUCCESS,
  }),
  getScrollDeleteFailure: error => ({
    type: Types.GET_DELETE_FAILURE,
    payload: error,
  }),

  // Deleta uma image categoria
  getImageScrollDeleteRequest: ({ id, id_scroll }) => ({
    type: Types.GET_IMAGE_DELETE_REQUEST,
    payload: { id, id_scroll },
  }),
  getImageScrollDeleteSuccess: () => ({
    type: Types.GET_IMAGE_DELETE_SUCCESS,
  }),
  getImageScrollDeleteFailure: error => ({
    type: Types.GET_IMAGE_DELETE_FAILURE,
    payload: error,
  }),
};
