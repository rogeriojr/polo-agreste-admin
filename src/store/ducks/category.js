/*
 *
 * Category reducer
 *
 */

export const Types = {
  // Obtem catergorias
  GET_REQUEST: 'category/GET_REQUEST',
  GET_SUCCESS: 'category/GET_SUCCESS',
  GET_FAILURE: 'category/GET_FAILURE',

  // Obtem catergorias
  GET_LIST_REQUEST: 'category/GET_LIST_REQUEST',
  GET_LIST_SUCCESS: 'category/GET_LIST_SUCCESS',
  GET_LIST_FAILURE: 'category/GET_LIST_FAILURE',

  // Insere uma catergoria
  GET_INSERT_REQUEST: 'category/GET_INSERT_REQUEST',
  GET_INSERT_SUCCESS: 'category/GET_INSERT_SUCCESS',
  GET_INSERT_FAILURE: 'category/GET_INSERT_FAILURE',

  // Atualiza uma catergoria
  GET_UPDATE_REQUEST: 'category/GET_UPDATE_REQUEST',
  GET_UPDATE_SUCCESS: 'category/GET_UPDATE_SUCCESS',
  GET_UPDATE_FAILURE: 'category/GET_UPDATE_FAILURE',

  // Upload de uma imagem na catergoria
  GET_IMAGE_UPLOAD_REQUEST: 'category/GET_IMAGE_UPLOAD_REQUEST',
  GET_IMAGE_UPLOAD_SUCCESS: 'category/GET_IMAGE_UPLOAD_SUCCESS',
  GET_IMAGE_UPLOAD_FAILURE: 'category/GET_IMAGE_UPLOAD_FAILURE',

  // Deleta uma catergoria
  GET_DELETE_REQUEST: 'category/GET_DELETE_REQUEST',
  GET_DELETE_SUCCESS: 'category/GET_DELETE_SUCCESS',
  GET_DELETE_FAILURE: 'category/GET_DELETE_FAILURE',
};

export const initialState = {
  // Categoria por id
  category: {},
  categoryLoading: false,
  categoryError: null,
  // Lista de categorias
  categoryList: [],
  categoryListLoading: false,
  categoryListError: null,
  categoryListTotal: 0,
  // Insere uma categoria
  categoryInsertLoading: false,
  categoryInsertError: false,
  // Atualiza uma categoria
  categoryUpdateLoading: false,
  categoryUpdateError: false,
  // Deleta categoria
  categoryDeleteLoading: false,
  categoryDeleteError: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    // Categoria por id
    case Types.GET_REQUEST:
      return {
        ...state,
        category: {},
        categoryError: null,
        categoryLoading: true,
      };
    case Types.GET_SUCCESS:
      return {
        ...state,
        category: action.payload.data,
        categoryLoading: false,
        categoryError: null,
      };
    case Types.GET_FAILURE:
      return {
        ...state,
        categoryLoading: false,
        categoryError: action.payload,
      };
    // Lista de categorias
    case Types.GET_LIST_REQUEST:
      return { ...state, categoryListLoading: true };
    case Types.GET_LIST_SUCCESS:
      return {
        ...state,
        categoryList: action.payload.data,
        categoryListLoading: false,
        categoryListError: null,
        categoryListTotal: action.payload.total,
      };
    case Types.GET_LIST_FAILURE:
      return {
        ...state,
        categoryListLoading: false,
        categoryListError: action.payload,
      };
    case Types.GET_INSERT_REQUEST:
      return {
        ...state,
        categoryInsertLoading: true,
        categoryInsertError: null,
      };
    case Types.GET_INSERT_SUCCESS:
      return {
        ...state,
        categoryInsertLoading: false,
        categoryInsertError: null,
      };
    case Types.GET_INSERT_FAILURE:
      return {
        ...state,
        categoryInsertLoading: false,
        categoryInsertError: action.payload,
      };
    // Atualiza um categoria
    case Types.GET_UPDATE_REQUEST:
      return {
        ...state,
        categoryUpdateLoading: true,
        categoryUpdateError: null,
      };
    case Types.GET_UPDATE_SUCCESS:
      return {
        ...state,
        categoryUpdateLoading: false,
        categoryUpdateError: null,
      };
    case Types.GET_UPDATE_FAILURE:
      return {
        ...state,
        categoryUpdateLoading: false,
        categoryUpdateError: action.payload,
      };
    // Deleta uma categoria
    case Types.GET_DELETE_REQUEST:
      return {
        ...state,
        categoryDeleteLoading: true,
        categoryDeleteError: null,
      };
    case Types.GET_DELETE_SUCCESS:
      return {
        ...state,
        categoryDeleteLoading: false,
        categoryDeleteError: null,
      };
    case Types.GET_DELETE_FAILURE:
      return {
        ...state,
        categoryDeleteLoading: false,
        categoryDeleteError: action.payload,
      };
    default:
      return state;
  }
};

export const Creators = {
  // Busca uma categoria
  getCategoryRequest: ({ id }) => ({
    type: Types.GET_REQUEST,
    payload: { id },
  }),
  getCategorySuccess: ({ data }) => ({
    type: Types.GET_SUCCESS,
    payload: { data },
  }),
  getCategoryFailure: error => ({
    type: Types.GET_FAILURE,
    payload: error,
  }),
  // Insere uma categoria
  getCategoryInsertRequest: ({
    category_father,
    description,
    name,
    order_position,
    image_data,
  }) => ({
    type: Types.GET_INSERT_REQUEST,
    payload: { category_father, description, name, order_position, image_data },
  }),
  getCategoryInsertSuccess: () => ({
    type: Types.GET_INSERT_SUCCESS,
  }),
  getCategoryInsertFailure: error => ({
    type: Types.GET_INSERT_FAILURE,
    payload: error,
  }),
  // Busca lista de categorias
  getCategoryListRequest: ({
    page,
    perPage,
    search,
    orderByColumn,
    orderByDirection,
  }) => ({
    type: Types.GET_LIST_REQUEST,
    payload: { page, perPage, search, orderByColumn, orderByDirection },
  }),
  getCategoryListSuccess: ({ data, total }) => ({
    type: Types.GET_LIST_SUCCESS,
    payload: { data, total },
  }),
  getCategoryListFailure: error => ({
    type: Types.GET_LIST_FAILURE,
    payload: error,
  }),
  // Atualiza uma  Categoria
  // Insere uma categoria
  getCategoryUpdateRequest: ({
    id,
    category_father,
    description,
    name,
    order_position,
    image_data,
  }) => ({
    type: Types.GET_UPDATE_REQUEST,
    payload: {
      id,
      category_father,
      description,
      name,
      order_position,
      image_data,
    },
  }),
  getCategoryUpdateSuccess: () => ({
    type: Types.GET_UPDATE_SUCCESS,
  }),
  getCategoryUpdateFailure: error => ({
    type: Types.GET_UPDATE_FAILURE,
    payload: error,
  }),
  // Deleta uma categoria
  getCategoryDeleteRequest: id => ({
    type: Types.GET_DELETE_REQUEST,
    payload: { id },
  }),
  getCategoryDeleteSuccess: () => ({
    type: Types.GET_DELETE_SUCCESS,
  }),
  getCategoryDeleteFailure: error => ({
    type: Types.GET_DELETE_FAILURE,
    payload: error,
  }),
};
