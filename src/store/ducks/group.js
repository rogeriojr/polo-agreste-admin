/*
 *
 * Group reducer
 *
 */

export const Types = {
  // Obtem catergorias
  GET_REQUEST: 'group/GET_REQUEST',
  GET_SUCCESS: 'group/GET_SUCCESS',
  GET_FAILURE: 'group/GET_FAILURE',

  // Obtem catergorias
  GET_LIST_REQUEST: 'group/GET_LIST_REQUEST',
  GET_LIST_SUCCESS: 'group/GET_LIST_SUCCESS',
  GET_LIST_FAILURE: 'group/GET_LIST_FAILURE',

  // Insere uma catergoria
  GET_INSERT_REQUEST: 'group/GET_INSERT_REQUEST',
  GET_INSERT_SUCCESS: 'group/GET_INSERT_SUCCESS',
  GET_INSERT_FAILURE: 'group/GET_INSERT_FAILURE',

  // Atualiza uma catergoria
  GET_UPDATE_REQUEST: 'group/GET_UPDATE_REQUEST',
  GET_UPDATE_SUCCESS: 'group/GET_UPDATE_SUCCESS',
  GET_UPDATE_FAILURE: 'group/GET_UPDATE_FAILURE',

  // Deleta uma catergoria
  GET_DELETE_REQUEST: 'group/GET_DELETE_REQUEST',
  GET_DELETE_SUCCESS: 'group/GET_DELETE_SUCCESS',
  GET_DELETE_FAILURE: 'group/GET_DELETE_FAILURE',
};

export const initialState = {
  // Categoria por id
  group: {},
  groupLoading: false,
  groupError: null,
  // Lista de categorias
  groupList: [],
  groupListLoading: false,
  groupListError: null,
  groupListTotal: 0,
  // Insere uma categoria
  groupInsertLoading: false,
  groupInsertError: false,
  // Atualiza uma categoria
  groupUpdateLoading: false,
  groupUpdateError: false,
  // Deleta categoria
  groupDeleteLoading: false,
  groupDeleteError: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    // Categoria por id
    case Types.GET_REQUEST:
      return {
        ...state,
        group: {},
        groupError: null,
        groupLoading: true,
      };
    case Types.GET_SUCCESS:
      return {
        ...state,
        group: action.payload.data,
        groupLoading: false,
        groupError: null,
      };
    case Types.GET_FAILURE:
      return {
        ...state,
        groupLoading: false,
        groupError: action.payload,
      };
    // Lista de categorias
    case Types.GET_LIST_REQUEST:
      return { ...state, groupListLoading: true };
    case Types.GET_LIST_SUCCESS:
      return {
        ...state,
        groupList: action.payload.data,
        groupListLoading: false,
        groupListError: null,
        groupListTotal: action.payload.total,
      };
    case Types.GET_LIST_FAILURE:
      return {
        ...state,
        groupListLoading: false,
        groupListError: action.payload,
      };
    case Types.GET_INSERT_REQUEST:
      return {
        ...state,
        groupInsertLoading: true,
        groupInsertError: null,
      };
    case Types.GET_INSERT_SUCCESS:
      return {
        ...state,
        groupInsertLoading: false,
        groupInsertError: null,
      };
    case Types.GET_INSERT_FAILURE:
      return {
        ...state,
        groupInsertLoading: false,
        groupInsertError: action.payload,
      };
    // Atualiza um categoria
    case Types.GET_UPDATE_REQUEST:
      return {
        ...state,
        groupUpdateLoading: true,
        groupUpdateError: null,
      };
    case Types.GET_UPDATE_SUCCESS:
      return {
        ...state,
        groupUpdateLoading: false,
        groupUpdateError: null,
      };
    case Types.GET_UPDATE_FAILURE:
      return {
        ...state,
        groupUpdateLoading: false,
        groupUpdateError: action.payload,
      };
    // Deleta uma categoria
    case Types.GET_DELETE_REQUEST:
      return {
        ...state,
        groupDeleteLoading: true,
        groupDeleteError: null,
      };
    case Types.GET_DELETE_SUCCESS:
      return {
        ...state,
        groupDeleteLoading: false,
        groupDeleteError: null,
      };
    case Types.GET_DELETE_FAILURE:
      return {
        ...state,
        groupDeleteLoading: false,
        groupDeleteError: action.payload,
      };
    default:
      return state;
  }
};

export const Creators = {
  // Busca uma categoria
  getGroupRequest: ({ id }) => ({
    type: Types.GET_REQUEST,
    payload: { id },
  }),
  getGroupSuccess: ({ data }) => ({
    type: Types.GET_SUCCESS,
    payload: { data },
  }),
  getGroupFailure: error => ({
    type: Types.GET_FAILURE,
    payload: error,
  }),
  // Insere uma categoria
  getGroupInsertRequest: ({
    group_father,
    description,
    name,
    order_position,
  }) => ({
    type: Types.GET_INSERT_REQUEST,
    payload: { group_father, description, name, order_position },
  }),
  getGroupInsertSuccess: () => ({
    type: Types.GET_INSERT_SUCCESS,
  }),
  getGroupInsertFailure: error => ({
    type: Types.GET_INSERT_FAILURE,
    payload: error,
  }),
  // Busca lista de categorias
  getGroupListRequest: ({
    page,
    perPage,
    search,
    orderByColumn,
    orderByDirection,
  }) => ({
    type: Types.GET_LIST_REQUEST,
    payload: { page, perPage, search, orderByColumn, orderByDirection },
  }),
  getGroupListSuccess: ({ data, total }) => ({
    type: Types.GET_LIST_SUCCESS,
    payload: { data, total },
  }),
  getGroupListFailure: error => ({
    type: Types.GET_LIST_FAILURE,
    payload: error,
  }),
  // Atualiza uma  Categoria
  // Insere uma categoria
  getGroupUpdateRequest: ({
    id,
    group_father,
    description,
    name,
    order_position,
  }) => ({
    type: Types.GET_UPDATE_REQUEST,
    payload: { id, group_father, description, name, order_position },
  }),
  getGroupUpdateSuccess: () => ({
    type: Types.GET_UPDATE_SUCCESS,
  }),
  getGroupUpdateFailure: error => ({
    type: Types.GET_UPDATE_FAILURE,
    payload: error,
  }),
  // Deleta uma categoria
  getGroupDeleteRequest: id => ({
    type: Types.GET_DELETE_REQUEST,
    payload: { id },
  }),
  getGroupDeleteSuccess: () => ({
    type: Types.GET_DELETE_SUCCESS,
  }),
  getGroupDeleteFailure: error => ({
    type: Types.GET_DELETE_FAILURE,
    payload: error,
  }),
};
