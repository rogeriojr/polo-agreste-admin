/*
 *
 * Bank reducer
 *
 */

export const Types = {
  // Obtem catergorias
  GET_REQUEST: 'bank/GET_REQUEST',
  GET_SUCCESS: 'bank/GET_SUCCESS',
  GET_FAILURE: 'bank/GET_FAILURE',

  // Obtem catergorias
  GET_LIST_REQUEST: 'bank/GET_LIST_REQUEST',
  GET_LIST_SUCCESS: 'bank/GET_LIST_SUCCESS',
  GET_LIST_FAILURE: 'bank/GET_LIST_FAILURE',

  // Insere uma catergoria
  GET_INSERT_REQUEST: 'bank/GET_INSERT_REQUEST',
  GET_INSERT_SUCCESS: 'bank/GET_INSERT_SUCCESS',
  GET_INSERT_FAILURE: 'bank/GET_INSERT_FAILURE',

  // Atualiza uma catergoria
  GET_UPDATE_REQUEST: 'bank/GET_UPDATE_REQUEST',
  GET_UPDATE_SUCCESS: 'bank/GET_UPDATE_SUCCESS',
  GET_UPDATE_FAILURE: 'bank/GET_UPDATE_FAILURE',

  // Upload de uma imagem na catergoria
  GET_IMAGE_UPLOAD_REQUEST: 'bank/GET_IMAGE_UPLOAD_REQUEST',
  GET_IMAGE_UPLOAD_SUCCESS: 'bank/GET_IMAGE_UPLOAD_SUCCESS',
  GET_IMAGE_UPLOAD_FAILURE: 'bank/GET_IMAGE_UPLOAD_FAILURE',

  // Deleta uma catergoria
  GET_DELETE_REQUEST: 'bank/GET_DELETE_REQUEST',
  GET_DELETE_SUCCESS: 'bank/GET_DELETE_SUCCESS',
  GET_DELETE_FAILURE: 'bank/GET_DELETE_FAILURE',
};

export const initialState = {
  // Categoria por id
  bank: {},
  bankLoading: false,
  bankError: null,
  // Lista de categorias
  bankList: [],
  bankListLoading: false,
  bankListError: null,
  bankListTotal: 0,
  // Insere uma categoria
  bankInsertLoading: false,
  bankInsertError: false,
  // Atualiza uma categoria
  bankUpdateLoading: false,
  bankUpdateError: false,
  // Deleta categoria
  bankDeleteLoading: false,
  bankDeleteError: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    // Categoria por id
    case Types.GET_REQUEST:
      return {
        ...state,
        bank: {},
        bankError: null,
        bankLoading: true,
      };
    case Types.GET_SUCCESS:
      return {
        ...state,
        bank: action.payload.data,
        bankLoading: false,
        bankError: null,
      };
    case Types.GET_FAILURE:
      return {
        ...state,
        bankLoading: false,
        bankError: action.payload,
      };
    // Lista de categorias
    case Types.GET_LIST_REQUEST:
      return { ...state, bankListLoading: true };
    case Types.GET_LIST_SUCCESS:
      return {
        ...state,
        bankList: action.payload.data,
        bankListLoading: false,
        bankListError: null,
        bankListTotal: action.payload.total,
      };
    case Types.GET_LIST_FAILURE:
      return {
        ...state,
        bankListLoading: false,
        bankListError: action.payload,
      };
    case Types.GET_INSERT_REQUEST:
      return {
        ...state,
        bankInsertLoading: true,
        bankInsertError: null,
      };
    case Types.GET_INSERT_SUCCESS:
      return {
        ...state,
        bankInsertLoading: false,
        bankInsertError: null,
      };
    case Types.GET_INSERT_FAILURE:
      return {
        ...state,
        bankInsertLoading: false,
        bankInsertError: action.payload,
      };
    // Atualiza um categoria
    case Types.GET_UPDATE_REQUEST:
      return {
        ...state,
        bankUpdateLoading: true,
        bankUpdateError: null,
      };
    case Types.GET_UPDATE_SUCCESS:
      return {
        ...state,
        bankUpdateLoading: false,
        bankUpdateError: null,
      };
    case Types.GET_UPDATE_FAILURE:
      return {
        ...state,
        bankUpdateLoading: false,
        bankUpdateError: action.payload,
      };
    // Deleta uma categoria
    case Types.GET_DELETE_REQUEST:
      return {
        ...state,
        bankDeleteLoading: true,
        bankDeleteError: null,
      };
    case Types.GET_DELETE_SUCCESS:
      return {
        ...state,
        bankDeleteLoading: false,
        bankDeleteError: null,
      };
    case Types.GET_DELETE_FAILURE:
      return {
        ...state,
        bankDeleteLoading: false,
        bankDeleteError: action.payload,
      };
    default:
      return state;
  }
};

export const Creators = {
  // Busca uma categoria
  getBankRequest: ({ id }) => ({
    type: Types.GET_REQUEST,
    payload: { id },
  }),
  getBankSuccess: ({ data }) => ({
    type: Types.GET_SUCCESS,
    payload: { data },
  }),
  getBankFailure: error => ({
    type: Types.GET_FAILURE,
    payload: error,
  }),
  // Insere uma categoria
  getBankInsertRequest: ({
    bank_father,
    description,
    name,
    order_position,
    image_data,
  }) => ({
    type: Types.GET_INSERT_REQUEST,
    payload: { bank_father, description, name, order_position, image_data },
  }),
  getBankInsertSuccess: () => ({
    type: Types.GET_INSERT_SUCCESS,
  }),
  getBankInsertFailure: error => ({
    type: Types.GET_INSERT_FAILURE,
    payload: error,
  }),
  // Busca lista de categorias
  getBankListRequest: ({
    page,
    perPage,
    search,
    orderByColumn,
    orderByDirection,
  }) => ({
    type: Types.GET_LIST_REQUEST,
    payload: { page, perPage, search, orderByColumn, orderByDirection },
  }),
  getBankListSuccess: ({ data, total }) => ({
    type: Types.GET_LIST_SUCCESS,
    payload: { data, total },
  }),
  getBankListFailure: error => ({
    type: Types.GET_LIST_FAILURE,
    payload: error,
  }),
  // Atualiza uma  Categoria
  // Insere uma categoria
  getBankUpdateRequest: ({
    id,
    bank_father,
    description,
    name,
    order_position,
    image_data,
  }) => ({
    type: Types.GET_UPDATE_REQUEST,
    payload: {
      id,
      bank_father,
      description,
      name,
      order_position,
      image_data,
    },
  }),
  getBankUpdateSuccess: () => ({
    type: Types.GET_UPDATE_SUCCESS,
  }),
  getBankUpdateFailure: error => ({
    type: Types.GET_UPDATE_FAILURE,
    payload: error,
  }),
  // Deleta uma categoria
  getBankDeleteRequest: id => ({
    type: Types.GET_DELETE_REQUEST,
    payload: { id },
  }),
  getBankDeleteSuccess: () => ({
    type: Types.GET_DELETE_SUCCESS,
  }),
  getBankDeleteFailure: error => ({
    type: Types.GET_DELETE_FAILURE,
    payload: error,
  }),
};
