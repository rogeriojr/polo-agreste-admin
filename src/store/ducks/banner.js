/*
 *
 * Banner reducer
 *
 */

export const Types = {
  // Obtem catergorias
  GET_REQUEST: 'banner/GET_REQUEST',
  GET_SUCCESS: 'banner/GET_SUCCESS',
  GET_FAILURE: 'banner/GET_FAILURE',

  // Obtem catergorias
  GET_LIST_REQUEST: 'banner/GET_LIST_REQUEST',
  GET_LIST_SUCCESS: 'banner/GET_LIST_SUCCESS',
  GET_LIST_FAILURE: 'banner/GET_LIST_FAILURE',

  // Insere uma catergoria
  GET_INSERT_REQUEST: 'banner/GET_INSERT_REQUEST',
  GET_INSERT_SUCCESS: 'banner/GET_INSERT_SUCCESS',
  GET_INSERT_FAILURE: 'banner/GET_INSERT_FAILURE',

  // Atualiza uma catergoria
  GET_UPDATE_REQUEST: 'banner/GET_UPDATE_REQUEST',
  GET_UPDATE_SUCCESS: 'banner/GET_UPDATE_SUCCESS',
  GET_UPDATE_FAILURE: 'banner/GET_UPDATE_FAILURE',

  // Deleta uma catergoria
  GET_DELETE_REQUEST: 'banner/GET_DELETE_REQUEST',
  GET_DELETE_SUCCESS: 'banner/GET_DELETE_SUCCESS',
  GET_DELETE_FAILURE: 'banner/GET_DELETE_FAILURE',

  // Deleta uma catergoria
  GET_IMAGE_DELETE_REQUEST: 'banner/GET_IMAGE_DELETE_REQUEST',
  GET_IMAGE_DELETE_SUCCESS: 'banner/GET_IMAGE_DELETE_SUCCESS',
  GET_IMAGE_DELETE_FAILURE: 'banner/GET_IMAGE_DELETE_FAILURE',
};

export const initialState = {
  // Produto por id
  banner: {},
  bannerLoading: false,
  bannerError: null,
  // Lista de categorias
  bannerList: [],
  bannerListLoading: false,
  bannerListError: null,
  bannerListTotal: 0,
  // Insere uma categoria
  bannerInsertLoading: false,
  bannerInsertError: false,
  // Atualiza uma categoria
  bannerUpdateLoading: false,
  bannerUpdateError: false,
  // Deleta categoria
  bannerDeleteLoading: false,
  bannerDeleteError: null,

  // Deleta uma imagem de categoria
  bannerImageDeleteLoading: false,
  bannerImageDeleteError: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    // Produto por id
    case Types.GET_REQUEST:
      return {
        ...state,
        banner: {},
        bannerError: null,
        bannerLoading: true,
      };
    case Types.GET_SUCCESS:
      return {
        ...state,
        banner: action.payload.data,
        bannerLoading: false,
        bannerError: null,
      };
    case Types.GET_FAILURE:
      return {
        ...state,
        bannerLoading: false,
        bannerError: action.payload,
      };
    // Lista de categorias
    case Types.GET_LIST_REQUEST:
      return { ...state, bannerListLoading: true };
    case Types.GET_LIST_SUCCESS:
      return {
        ...state,
        bannerList: action.payload.data,
        bannerListLoading: false,
        bannerListError: null,
        bannerListTotal: action.payload.total,
      };
    case Types.GET_LIST_FAILURE:
      return {
        ...state,
        bannerListLoading: false,
        bannerListError: action.payload,
      };
    // Insere um categoria
    case Types.GET_INSERT_REQUEST:
      return {
        ...state,
        bannerInsertLoading: true,
        bannerInsertError: null,
      };
    case Types.GET_INSERT_SUCCESS:
      return {
        ...state,
        bannerInsertLoading: false,
        bannerInsertError: null,
      };
    case Types.GET_INSERT_FAILURE:
      return {
        ...state,
        bannerInsertLoading: false,
        bannerInsertError: action.payload,
      };
    // Atualiza um categoria
    case Types.GET_UPDATE_REQUEST:
      return {
        ...state,
        bannerUpdateLoading: true,
        bannerUpdateError: null,
      };
    case Types.GET_UPDATE_SUCCESS:
      return {
        ...state,
        bannerUpdateLoading: false,
        bannerUpdateError: null,
      };
    case Types.GET_UPDATE_FAILURE:
      return {
        ...state,
        bannerUpdateLoading: false,
        bannerUpdateError: action.payload,
      };
    // Deleta uma categoria
    case Types.GET_DELETE_REQUEST:
      return {
        ...state,
        bannerDeleteLoading: true,
        bannerDeleteError: null,
      };
    case Types.GET_DELETE_SUCCESS:
      return {
        ...state,
        bannerDeleteLoading: false,
        bannerDeleteError: null,
      };
    case Types.GET_DELETE_FAILURE:
      return {
        ...state,
        bannerDeleteLoading: false,
        bannerDeleteError: action.payload,
      };
    // Deleta uma image de categoria
    case Types.GET_IMAGE_DELETE_REQUEST:
      return {
        ...state,
        bannerImageDeleteLoading: true,
        bannerImageDeleteError: null,
      };
    case Types.GET_IMAGE_DELETE_SUCCESS:
      return {
        ...state,
        bannerImageDeleteLoading: false,
        bannerImageDeleteError: null,
      };
    case Types.GET_IMAGE_DELETE_FAILURE:
      return {
        ...state,
        bannerImageDeleteLoading: false,
        bannerImageDeleteError: action.payload,
      };
    default:
      return state;
  }
};

export const Creators = {
  // Busca uma categoria
  getBannerRequest: ({ id }) => ({
    type: Types.GET_REQUEST,
    payload: { id },
  }),
  getBannerSuccess: ({ data }) => ({
    type: Types.GET_SUCCESS,
    payload: { data },
  }),
  getBannerFailure: error => ({
    type: Types.GET_FAILURE,
    payload: error,
  }),
  // Insere uma categoria
  getBannerInsertRequest: ({ name, status, images_data }) => ({
    type: Types.GET_INSERT_REQUEST,
    payload: {
      name,
      status,
      images_data,
    },
  }),
  getBannerInsertSuccess: () => ({
    type: Types.GET_INSERT_SUCCESS,
  }),
  getBannerInsertFailure: error => ({
    type: Types.GET_INSERT_FAILURE,
    payload: error,
  }),
  // Busca lista de categorias
  getBannerListRequest: ({
    page,
    perPage,
    search,
    orderByColumn,
    orderByDirection,
  }) => ({
    type: Types.GET_LIST_REQUEST,
    payload: { page, perPage, search, orderByColumn, orderByDirection },
  }),
  getBannerListSuccess: ({ data, total }) => ({
    type: Types.GET_LIST_SUCCESS,
    payload: { data, total },
  }),
  getBannerListFailure: error => ({
    type: Types.GET_LIST_FAILURE,
    payload: error,
  }),
  // Atualiza uma  Produto
  // Insere uma categoria
  getBannerUpdateRequest: ({ id, name, status, images_data }) => ({
    type: Types.GET_UPDATE_REQUEST,
    payload: {
      id,
      name,
      status,
      images_data,
    },
  }),
  getBannerUpdateSuccess: () => ({
    type: Types.GET_UPDATE_SUCCESS,
  }),
  getBannerUpdateFailure: error => ({
    type: Types.GET_UPDATE_FAILURE,
    payload: error,
  }),
  // Deleta uma categoria
  getBannerDeleteRequest: id => ({
    type: Types.GET_DELETE_REQUEST,
    payload: { id },
  }),
  getBannerDeleteSuccess: () => ({
    type: Types.GET_DELETE_SUCCESS,
  }),
  getBannerDeleteFailure: error => ({
    type: Types.GET_DELETE_FAILURE,
    payload: error,
  }),

  // Deleta uma image categoria
  getImageBannerDeleteRequest: ({ id, id_banner }) => ({
    type: Types.GET_IMAGE_DELETE_REQUEST,
    payload: { id, id_banner },
  }),
  getImageBannerDeleteSuccess: () => ({
    type: Types.GET_IMAGE_DELETE_SUCCESS,
  }),
  getImageBannerDeleteFailure: error => ({
    type: Types.GET_IMAGE_DELETE_FAILURE,
    payload: error,
  }),
};
