/*
 *
 * Attribute reducer
 *
 */

export const Types = {
  // Obtem catergorias
  GET_REQUEST: 'attribute/GET_REQUEST',
  GET_SUCCESS: 'attribute/GET_SUCCESS',
  GET_FAILURE: 'attribute/GET_FAILURE',

  // Obtem catergorias
  GET_LIST_REQUEST: 'attribute/GET_LIST_REQUEST',
  GET_LIST_SUCCESS: 'attribute/GET_LIST_SUCCESS',
  GET_LIST_FAILURE: 'attribute/GET_LIST_FAILURE',

  // Insere uma catergoria
  GET_INSERT_REQUEST: 'attribute/GET_INSERT_REQUEST',
  GET_INSERT_SUCCESS: 'attribute/GET_INSERT_SUCCESS',
  GET_INSERT_FAILURE: 'attribute/GET_INSERT_FAILURE',

  // Atualiza uma catergoria
  GET_UPDATE_REQUEST: 'attribute/GET_UPDATE_REQUEST',
  GET_UPDATE_SUCCESS: 'attribute/GET_UPDATE_SUCCESS',
  GET_UPDATE_FAILURE: 'attribute/GET_UPDATE_FAILURE',

  // Deleta uma catergoria
  GET_DELETE_REQUEST: 'attribute/GET_DELETE_REQUEST',
  GET_DELETE_SUCCESS: 'attribute/GET_DELETE_SUCCESS',
  GET_DELETE_FAILURE: 'attribute/GET_DELETE_FAILURE',
};

export const initialState = {
  // Categoria por id
  attribute: {},
  attributeLoading: false,
  attributeError: null,
  // Lista de categorias
  attributeList: [],
  attributeListLoading: false,
  attributeListError: null,
  attributeListTotal: 0,
  // Atualiza uma categoria
  attributeUpdateLoading: false,
  attributeUpdateError: false,
  // Deleta categoria
  attributeDeleteLoading: false,
  attributeDeleteError: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    // Categoria por id
    case Types.GET_REQUEST:
      return {
        ...state,
        attribute: {},
        attributeError: null,
        attributeLoading: true,
      };
    case Types.GET_SUCCESS:
      return {
        ...state,
        attribute: action.payload.data,
        attributeLoading: false,
        attributeError: null,
      };
    case Types.GET_FAILURE:
      return {
        ...state,
        attributeLoading: false,
        attributeError: action.payload,
      };
    // Lista de categorias
    case Types.GET_LIST_REQUEST:
      return { ...state, attributeListLoading: true };
    case Types.GET_LIST_SUCCESS:
      return {
        ...state,
        attributeList: action.payload.data,
        attributeListLoading: false,
        attributeListError: null,
        attributeListTotal: action.payload.total,
      };
    case Types.GET_LIST_FAILURE:
      return {
        ...state,
        attributeListLoading: false,
        attributeListError: action.payload,
      };
    // Atualiza um categoria
    case Types.GET_UPDATE_REQUEST:
      return {
        ...state,
        attributeUpdateLoading: true,
        attributeUpdateError: null,
      };
    case Types.GET_UPDATE_SUCCESS:
      return {
        ...state,
        attributeUpdateLoading: false,
        attributeUpdateError: null,
      };
    case Types.GET_UPDATE_FAILURE:
      return {
        ...state,
        attributeUpdateLoading: false,
        attributeListError: action.payload,
      };
    // Deleta uma categoria
    case Types.GET_DELETE_REQUEST:
      return {
        ...state,
        attributeDeleteLoading: true,
        attributeDeleteError: null,
      };
    case Types.GET_DELETE_SUCCESS:
      return {
        ...state,
        attributeDeleteLoading: false,
        attributeDeleteError: null,
      };
    case Types.GET_DELETE_FAILURE:
      return {
        ...state,
        attributeDeleteLoading: false,
        attributeDeleteError: action.payload,
      };
    default:
      return state;
  }
};

export const Creators = {
  // Busca uma categoria
  getAttributeRequest: ({ id }) => ({
    type: Types.GET_REQUEST,
    payload: { id },
  }),
  getAttributeSuccess: ({ data }) => ({
    type: Types.GET_SUCCESS,
    payload: { data },
  }),
  getAttributeFailure: error => ({
    type: Types.GET_FAILURE,
    payload: error,
  }),
  // Insere uma categoria
  getAttributeInsertRequest: ({
    attribute_father,
    description,
    name,
    order_position,
  }) => ({
    type: Types.GET_INSERT_REQUEST,
    payload: { attribute_father, description, name, order_position },
  }),
  getAttributeInsertSuccess: ({ data }) => ({
    type: Types.GET_INSERT_SUCCESS,
    payload: { data },
  }),
  getAttributeInsertFailure: error => ({
    type: Types.GET_INSERT_FAILURE,
    payload: error,
  }),
  // Busca lista de categorias
  getAttributeListRequest: ({
    page,
    perPage,
    search,
    orderByColumn,
    orderByDirection,
  }) => ({
    type: Types.GET_LIST_REQUEST,
    payload: { page, perPage, search, orderByColumn, orderByDirection },
  }),
  getAttributeListSuccess: ({ data, total }) => ({
    type: Types.GET_LIST_SUCCESS,
    payload: { data, total },
  }),
  getAttributeListFailure: error => ({
    type: Types.GET_LIST_FAILURE,
    payload: error,
  }),
  // Atualiza uma  Categoria
  // Insere uma categoria
  getAttributeUpdateRequest: ({
    id,
    attribute_father,
    description,
    name,
    order_position,
  }) => ({
    type: Types.GET_UPDATE_REQUEST,
    payload: { id, attribute_father, description, name, order_position },
  }),
  getAttributeUpdateSuccess: () => ({
    type: Types.GET_UPDATE_SUCCESS,
  }),
  getAttributeUpdateFailure: error => ({
    type: Types.GET_UPDATE_FAILURE,
    payload: error,
  }),
  // Deleta uma categoria
  getAttributeDeleteRequest: id => ({
    type: Types.GET_DELETE_REQUEST,
    payload: { id },
  }),
  getAttributeDeleteSuccess: () => ({
    type: Types.GET_DELETE_SUCCESS,
  }),
  getAttributeDeleteFailure: error => ({
    type: Types.GET_DELETE_FAILURE,
    payload: error,
  }),
};
