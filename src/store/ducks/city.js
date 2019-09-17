/*
 *
 * City reducer
 *
 */

export const Types = {
  // Obtem catergorias
  GET_REQUEST: 'city/GET_REQUEST',
  GET_SUCCESS: 'city/GET_SUCCESS',
  GET_FAILURE: 'city/GET_FAILURE',

  // Obtem catergorias
  GET_LIST_REQUEST: 'city/GET_LIST_REQUEST',
  GET_LIST_SUCCESS: 'city/GET_LIST_SUCCESS',
  GET_LIST_FAILURE: 'city/GET_LIST_FAILURE',

  // Insere uma catergoria
  GET_INSERT_REQUEST: 'city/GET_INSERT_REQUEST',
  GET_INSERT_SUCCESS: 'city/GET_INSERT_SUCCESS',
  GET_INSERT_FAILURE: 'city/GET_INSERT_FAILURE',

  // Atualiza uma catergoria
  GET_UPDATE_REQUEST: 'city/GET_UPDATE_REQUEST',
  GET_UPDATE_SUCCESS: 'city/GET_UPDATE_SUCCESS',
  GET_UPDATE_FAILURE: 'city/GET_UPDATE_FAILURE',

  // Deleta uma catergoria
  GET_DELETE_REQUEST: 'city/GET_DELETE_REQUEST',
  GET_DELETE_SUCCESS: 'city/GET_DELETE_SUCCESS',
  GET_DELETE_FAILURE: 'city/GET_DELETE_FAILURE',
};

export const initialState = {
  // Categoria por id
  city: {},
  cityLoading: false,
  cityError: null,
  // Lista de categorias
  cityList: [],
  cityListLoading: false,
  cityListError: null,
  cityListTotal: 0,
  // Atualiza uma categoria
  cityUpdateLoading: false,
  cityUpdateError: false,
  // Deleta categoria
  cityDeleteLoading: false,
  cityDeleteError: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    // Categoria por id
    case Types.GET_REQUEST:
      return {
        ...state,
        city: {},
        cityError: null,
        cityLoading: true,
      };
    case Types.GET_SUCCESS:
      return {
        ...state,
        city: action.payload.data,
        cityLoading: false,
        cityError: null,
      };
    case Types.GET_FAILURE:
      return {
        ...state,
        cityLoading: false,
        cityError: action.payload,
      };
    // Lista de categorias
    case Types.GET_LIST_REQUEST:
      return { ...state, cityListLoading: true };
    case Types.GET_LIST_SUCCESS:
      return {
        ...state,
        cityList: action.payload.data,
        cityListLoading: false,
        cityListError: null,
        cityListTotal: action.payload.total,
      };
    case Types.GET_LIST_FAILURE:
      return {
        ...state,
        cityListLoading: false,
        cityListError: action.payload,
      };
    // Atualiza um categoria
    case Types.GET_UPDATE_REQUEST:
      return {
        ...state,
        cityUpdateLoading: true,
        cityUpdateError: null,
      };
    case Types.GET_UPDATE_SUCCESS:
      return {
        ...state,
        cityUpdateLoading: false,
        cityUpdateError: null,
      };
    case Types.GET_UPDATE_FAILURE:
      return {
        ...state,
        cityUpdateLoading: false,
        cityListError: action.payload,
      };
    // Deleta uma categoria
    case Types.GET_DELETE_REQUEST:
      return {
        ...state,
        cityDeleteLoading: true,
        cityDeleteError: null,
      };
    case Types.GET_DELETE_SUCCESS:
      return {
        ...state,
        cityDeleteLoading: false,
        cityDeleteError: null,
      };
    case Types.GET_DELETE_FAILURE:
      return {
        ...state,
        cityDeleteLoading: false,
        cityDeleteError: action.payload,
      };
    default:
      return state;
  }
};

export const Creators = {
  // Busca uma categoria
  getCityRequest: ({ id }) => ({
    type: Types.GET_REQUEST,
    payload: { id },
  }),
  getCitySuccess: ({ data }) => ({
    type: Types.GET_SUCCESS,
    payload: { data },
  }),
  getCityFailure: error => ({
    type: Types.GET_FAILURE,
    payload: error,
  }),
  // Insere uma categoria
  getCityInsertRequest: ({
    city_father,
    description,
    name,
    order_position,
  }) => ({
    type: Types.GET_INSERT_REQUEST,
    payload: { city_father, description, name, order_position },
  }),
  getCityInsertSuccess: ({ data }) => ({
    type: Types.GET_INSERT_SUCCESS,
    payload: { data },
  }),
  getCityInsertFailure: error => ({
    type: Types.GET_INSERT_FAILURE,
    payload: error,
  }),
  // Busca lista de categorias
  getCityListRequest: ({
    page,
    perPage,
    search,
    orderByColumn,
    orderByDirection,
  }) => ({
    type: Types.GET_LIST_REQUEST,
    payload: { page, perPage, search, orderByColumn, orderByDirection },
  }),
  getCityListSuccess: ({ data, total }) => ({
    type: Types.GET_LIST_SUCCESS,
    payload: { data, total },
  }),
  getCityListFailure: error => ({
    type: Types.GET_LIST_FAILURE,
    payload: error,
  }),
  // Atualiza uma  Categoria
  // Insere uma categoria
  getCityUpdateRequest: ({
    id,
    city_father,
    description,
    name,
    order_position,
  }) => ({
    type: Types.GET_UPDATE_REQUEST,
    payload: { id, city_father, description, name, order_position },
  }),
  getCityUpdateSuccess: () => ({
    type: Types.GET_UPDATE_SUCCESS,
  }),
  getCityUpdateFailure: error => ({
    type: Types.GET_UPDATE_FAILURE,
    payload: error,
  }),
  // Deleta uma categoria
  getCityDeleteRequest: id => ({
    type: Types.GET_DELETE_REQUEST,
    payload: { id },
  }),
  getCityDeleteSuccess: () => ({
    type: Types.GET_DELETE_SUCCESS,
  }),
  getCityDeleteFailure: error => ({
    type: Types.GET_DELETE_FAILURE,
    payload: error,
  }),
};
