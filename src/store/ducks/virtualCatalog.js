/*
 *
 * VirtualCatalog reducer
 *
 */

export const Types = {
  // Obtem catergorias
  GET_REQUEST: 'virtualCatalog/GET_REQUEST',
  GET_SUCCESS: 'virtualCatalog/GET_SUCCESS',
  GET_FAILURE: 'virtualCatalog/GET_FAILURE',

  // Obtem catergorias
  GET_LIST_REQUEST: 'virtualCatalog/GET_LIST_REQUEST',
  GET_LIST_SUCCESS: 'virtualCatalog/GET_LIST_SUCCESS',
  GET_LIST_FAILURE: 'virtualCatalog/GET_LIST_FAILURE',

  // Insere uma catergoria
  GET_INSERT_REQUEST: 'virtualCatalog/GET_INSERT_REQUEST',
  GET_INSERT_SUCCESS: 'virtualCatalog/GET_INSERT_SUCCESS',
  GET_INSERT_FAILURE: 'virtualCatalog/GET_INSERT_FAILURE',

  // Atualiza uma catergoria
  GET_UPDATE_REQUEST: 'virtualCatalog/GET_UPDATE_REQUEST',
  GET_UPDATE_SUCCESS: 'virtualCatalog/GET_UPDATE_SUCCESS',
  GET_UPDATE_FAILURE: 'virtualCatalog/GET_UPDATE_FAILURE',

  // Upload de uma imagem na catergoria
  GET_IMAGE_UPLOAD_REQUEST: 'virtualCatalog/GET_IMAGE_UPLOAD_REQUEST',
  GET_IMAGE_UPLOAD_SUCCESS: 'virtualCatalog/GET_IMAGE_UPLOAD_SUCCESS',
  GET_IMAGE_UPLOAD_FAILURE: 'virtualCatalog/GET_IMAGE_UPLOAD_FAILURE',

  // Deleta uma catergoria
  GET_DELETE_REQUEST: 'virtualCatalog/GET_DELETE_REQUEST',
  GET_DELETE_SUCCESS: 'virtualCatalog/GET_DELETE_SUCCESS',
  GET_DELETE_FAILURE: 'virtualCatalog/GET_DELETE_FAILURE',
};

export const initialState = {
  // Categoria por id
  virtualCatalog: {},
  virtualCatalogLoading: false,
  virtualCatalogError: null,
  // Lista de categorias
  virtualCatalogList: [],
  virtualCatalogListLoading: false,
  virtualCatalogListError: null,
  virtualCatalogListTotal: 0,
  // Insere uma categoria
  virtualCatalogInsertLoading: false,
  virtualCatalogInsertError: false,
  // Atualiza uma categoria
  virtualCatalogUpdateLoading: false,
  virtualCatalogUpdateError: false,
  // Deleta categoria
  virtualCatalogDeleteLoading: false,
  virtualCatalogDeleteError: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    // Categoria por id
    case Types.GET_REQUEST:
      return {
        ...state,
        virtualCatalog: {},
        virtualCatalogError: null,
        virtualCatalogLoading: true,
      };
    case Types.GET_SUCCESS:
      return {
        ...state,
        virtualCatalog: action.payload.data,
        virtualCatalogLoading: false,
        virtualCatalogError: null,
      };
    case Types.GET_FAILURE:
      return {
        ...state,
        virtualCatalogLoading: false,
        virtualCatalogError: action.payload,
      };
    // Lista de categorias
    case Types.GET_LIST_REQUEST:
      return { ...state, virtualCatalogListLoading: true };
    case Types.GET_LIST_SUCCESS:
      return {
        ...state,
        virtualCatalogList: action.payload.data,
        virtualCatalogListLoading: false,
        virtualCatalogListError: null,
        virtualCatalogListTotal: action.payload.total,
      };
    case Types.GET_LIST_FAILURE:
      return {
        ...state,
        virtualCatalogListLoading: false,
        virtualCatalogListError: action.payload,
      };
    case Types.GET_INSERT_REQUEST:
      return {
        ...state,
        virtualCatalogInsertLoading: true,
        virtualCatalogInsertError: null,
      };
    case Types.GET_INSERT_SUCCESS:
      return {
        ...state,
        virtualCatalogInsertLoading: false,
        virtualCatalogInsertError: null,
      };
    case Types.GET_INSERT_FAILURE:
      return {
        ...state,
        virtualCatalogInsertLoading: false,
        virtualCatalogInsertError: action.payload,
      };
    // Atualiza um categoria
    case Types.GET_UPDATE_REQUEST:
      return {
        ...state,
        virtualCatalogUpdateLoading: true,
        virtualCatalogUpdateError: null,
      };
    case Types.GET_UPDATE_SUCCESS:
      return {
        ...state,
        virtualCatalogUpdateLoading: false,
        virtualCatalogUpdateError: null,
      };
    case Types.GET_UPDATE_FAILURE:
      return {
        ...state,
        virtualCatalogUpdateLoading: false,
        virtualCatalogUpdateError: action.payload,
      };
    // Deleta uma categoria
    case Types.GET_DELETE_REQUEST:
      return {
        ...state,
        virtualCatalogDeleteLoading: true,
        virtualCatalogDeleteError: null,
      };
    case Types.GET_DELETE_SUCCESS:
      return {
        ...state,
        virtualCatalogDeleteLoading: false,
        virtualCatalogDeleteError: null,
      };
    case Types.GET_DELETE_FAILURE:
      return {
        ...state,
        virtualCatalogDeleteLoading: false,
        virtualCatalogDeleteError: action.payload,
      };
    default:
      return state;
  }
};

export const Creators = {
  // Busca uma categoria
  getVirtualCatalogRequest: ({ id }) => ({
    type: Types.GET_REQUEST,
    payload: { id },
  }),
  getVirtualCatalogSuccess: ({ data }) => ({
    type: Types.GET_SUCCESS,
    payload: { data },
  }),
  getVirtualCatalogFailure: error => ({
    type: Types.GET_FAILURE,
    payload: error,
  }),
  // Insere uma categoria
  getVirtualCatalogInsertRequest: ({
    name,
    categories,
    products,
    store,
    image_data,
  }) => ({
    type: Types.GET_INSERT_REQUEST,
    payload: { name, categories, products, store, image_data },
  }),
  getVirtualCatalogInsertSuccess: () => ({
    type: Types.GET_INSERT_SUCCESS,
  }),
  getVirtualCatalogInsertFailure: error => ({
    type: Types.GET_INSERT_FAILURE,
    payload: error,
  }),
  // Busca lista de categorias
  getVirtualCatalogListRequest: ({
    page,
    perPage,
    search,
    orderByColumn,
    orderByDirection,
  }) => ({
    type: Types.GET_LIST_REQUEST,
    payload: { page, perPage, search, orderByColumn, orderByDirection },
  }),
  getVirtualCatalogListSuccess: ({ data, total }) => ({
    type: Types.GET_LIST_SUCCESS,
    payload: { data, total },
  }),
  getVirtualCatalogListFailure: error => ({
    type: Types.GET_LIST_FAILURE,
    payload: error,
  }),
  // Atualiza uma  Categoria
  // Insere uma categoria
  getVirtualCatalogUpdateRequest: ({
    id,
    name,
    categories,
    products,
    store,
    image_data,
  }) => ({
    type: Types.GET_UPDATE_REQUEST,
    payload: {
      id,
      name,
      categories,
      products,
      store,
      image_data,
    },
  }),
  getVirtualCatalogUpdateSuccess: () => ({
    type: Types.GET_UPDATE_SUCCESS,
  }),
  getVirtualCatalogUpdateFailure: error => ({
    type: Types.GET_UPDATE_FAILURE,
    payload: error,
  }),
  // Deleta uma categoria
  getVirtualCatalogDeleteRequest: id => ({
    type: Types.GET_DELETE_REQUEST,
    payload: { id },
  }),
  getVirtualCatalogDeleteSuccess: () => ({
    type: Types.GET_DELETE_SUCCESS,
  }),
  getVirtualCatalogDeleteFailure: error => ({
    type: Types.GET_DELETE_FAILURE,
    payload: error,
  }),
};
