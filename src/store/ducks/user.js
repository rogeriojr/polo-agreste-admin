/*
 *
 * User reducer
 *
 */

export const Types = {
  // Obtem catergorias
  GET_REQUEST: 'user/GET_REQUEST',
  GET_SUCCESS: 'user/GET_SUCCESS',
  GET_FAILURE: 'user/GET_FAILURE',

  // Obtem catergorias
  GET_LIST_REQUEST: 'user/GET_LIST_REQUEST',
  GET_LIST_SUCCESS: 'user/GET_LIST_SUCCESS',
  GET_LIST_FAILURE: 'user/GET_LIST_FAILURE',

  // Insere uma catergoria
  GET_INSERT_REQUEST: 'user/GET_INSERT_REQUEST',
  GET_INSERT_SUCCESS: 'user/GET_INSERT_SUCCESS',
  GET_INSERT_FAILURE: 'user/GET_INSERT_FAILURE',

  // Atualiza uma catergoria
  GET_UPDATE_REQUEST: 'user/GET_UPDATE_REQUEST',
  GET_UPDATE_SUCCESS: 'user/GET_UPDATE_SUCCESS',
  GET_UPDATE_FAILURE: 'user/GET_UPDATE_FAILURE',

  // Deleta uma catergoria
  GET_DELETE_REQUEST: 'user/GET_DELETE_REQUEST',
  GET_DELETE_SUCCESS: 'user/GET_DELETE_SUCCESS',
  GET_DELETE_FAILURE: 'user/GET_DELETE_FAILURE',
};

export const initialState = {
  // Categoria por id
  user: {},
  userLoading: false,
  userError: null,
  // Lista de categorias
  userList: [],
  userListLoading: false,
  userListError: null,
  userListTotal: 0,
  // Insere uma categoria
  userInsertLoading: false,
  userInsertError: false,
  // Atualiza uma categoria
  userUpdateLoading: false,
  userUpdateError: false,
  // Deleta categoria
  userDeleteLoading: false,
  userDeleteError: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    // Categoria por id
    case Types.GET_REQUEST:
      return {
        ...state,
        user: {},
        userError: null,
        userLoading: true,
      };
    case Types.GET_SUCCESS:
      return {
        ...state,
        user: action.payload.data,
        userLoading: false,
        userError: null,
      };
    case Types.GET_FAILURE:
      return {
        ...state,
        userLoading: false,
        userError: action.payload,
      };
    // Lista de categorias
    case Types.GET_LIST_REQUEST:
      return { ...state, userListLoading: true };
    case Types.GET_LIST_SUCCESS:
      return {
        ...state,
        userList: action.payload.data,
        userListLoading: false,
        userListError: null,
        userListTotal: action.payload.total,
      };
    case Types.GET_LIST_FAILURE:
      return {
        ...state,
        userListLoading: false,
        userListError: action.payload,
      };
    case Types.GET_INSERT_REQUEST:
      return {
        ...state,
        userInsertLoading: true,
        userInsertError: null,
      };
    case Types.GET_INSERT_SUCCESS:
      return {
        ...state,
        userInsertLoading: false,
        userInsertError: null,
      };
    case Types.GET_INSERT_FAILURE:
      return {
        ...state,
        userInsertLoading: false,
        userInsertError: action.payload,
      };
    // Atualiza um categoria
    case Types.GET_UPDATE_REQUEST:
      return {
        ...state,
        userUpdateLoading: true,
        userUpdateError: null,
      };
    case Types.GET_UPDATE_SUCCESS:
      return {
        ...state,
        userUpdateLoading: false,
        userUpdateError: null,
      };
    case Types.GET_UPDATE_FAILURE:
      return {
        ...state,
        userUpdateLoading: false,
        userUpdateError: action.payload,
      };
    // Deleta uma categoria
    case Types.GET_DELETE_REQUEST:
      return {
        ...state,
        userDeleteLoading: true,
        userDeleteError: null,
      };
    case Types.GET_DELETE_SUCCESS:
      return {
        ...state,
        userDeleteLoading: false,
        userDeleteError: null,
      };
    case Types.GET_DELETE_FAILURE:
      return {
        ...state,
        userDeleteLoading: false,
        userDeleteError: action.payload,
      };
    default:
      return state;
  }
};

export const Creators = {
  // Busca uma categoria
  getUserRequest: ({ id }) => ({
    type: Types.GET_REQUEST,
    payload: { id },
  }),
  getUserSuccess: ({ data }) => ({
    type: Types.GET_SUCCESS,
    payload: { data },
  }),
  getUserFailure: error => ({
    type: Types.GET_FAILURE,
    payload: error,
  }),
  // Insere uma categoria
  getUserInsertRequest: ({
    email,
    password,
    name,
    cpf,
    genre,
    description,
    cell_phone,
    birth_date,
    store,
    group,
    address,
    image_data,
  }) => ({
    type: Types.GET_INSERT_REQUEST,
    payload: {
      email,
      password,
      name,
      cpf,
      genre,
      description,
      cell_phone,
      birth_date,
      store,
      group,
      address,
      image_data,
    },
  }),
  getUserInsertSuccess: () => ({
    type: Types.GET_INSERT_SUCCESS,
  }),
  getUserInsertFailure: error => ({
    type: Types.GET_INSERT_FAILURE,
    payload: error,
  }),
  // Busca lista de categorias
  getUserListRequest: ({
    page,
    perPage,
    search,
    orderByColumn,
    orderByDirection,
    group_id,
  }) => ({
    type: Types.GET_LIST_REQUEST,
    payload: {
      page,
      perPage,
      search,
      orderByColumn,
      orderByDirection,
      group_id,
    },
  }),
  getUserListSuccess: ({ data, total }) => ({
    type: Types.GET_LIST_SUCCESS,
    payload: { data, total },
  }),
  getUserListFailure: error => ({
    type: Types.GET_LIST_FAILURE,
    payload: error,
  }),
  // Atualiza uma  Categoria
  // Insere uma categoria
  getUserUpdateRequest: ({
    id,
    email,
    password,
    name,
    cpf,
    genre,
    description,
    cell_phone,
    birth_date,
    store,
    group,
    address,
    image_data,
  }) => ({
    type: Types.GET_UPDATE_REQUEST,
    payload: {
      id,
      email,
      password,
      name,
      cpf,
      store,
      genre,
      description,
      cell_phone,
      birth_date,
      group,
      address,
      image_data,
    },
  }),
  getUserUpdateSuccess: () => ({
    type: Types.GET_UPDATE_SUCCESS,
  }),
  getUserUpdateFailure: error => ({
    type: Types.GET_UPDATE_FAILURE,
    payload: error,
  }),
  // Deleta uma categoria
  getUserDeleteRequest: id => ({
    type: Types.GET_DELETE_REQUEST,
    payload: { id },
  }),
  getUserDeleteSuccess: () => ({
    type: Types.GET_DELETE_SUCCESS,
  }),
  getUserDeleteFailure: error => ({
    type: Types.GET_DELETE_FAILURE,
    payload: error,
  }),
};
