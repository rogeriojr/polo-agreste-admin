/*
 *
 * Shopping reducer
 *
 */

export const Types = {
  // Obtem catergorias
  GET_REQUEST: 'shopping/GET_REQUEST',
  GET_SUCCESS: 'shopping/GET_SUCCESS',
  GET_FAILURE: 'shopping/GET_FAILURE',

  // Obtem catergorias
  GET_LIST_REQUEST: 'shopping/GET_LIST_REQUEST',
  GET_LIST_SUCCESS: 'shopping/GET_LIST_SUCCESS',
  GET_LIST_FAILURE: 'shopping/GET_LIST_FAILURE',

  // Insere uma catergoria
  GET_INSERT_REQUEST: 'shopping/GET_INSERT_REQUEST',
  GET_INSERT_SUCCESS: 'shopping/GET_INSERT_SUCCESS',
  GET_INSERT_FAILURE: 'shopping/GET_INSERT_FAILURE',

  // Atualiza uma catergoria
  GET_UPDATE_REQUEST: 'shopping/GET_UPDATE_REQUEST',
  GET_UPDATE_SUCCESS: 'shopping/GET_UPDATE_SUCCESS',
  GET_UPDATE_FAILURE: 'shopping/GET_UPDATE_FAILURE',

  // Deleta uma catergoria
  GET_DELETE_REQUEST: 'shopping/GET_DELETE_REQUEST',
  GET_DELETE_SUCCESS: 'shopping/GET_DELETE_SUCCESS',
  GET_DELETE_FAILURE: 'shopping/GET_DELETE_FAILURE',
};

export const initialState = {
  // Produto por id
  shopping: {},
  shoppingLoading: false,
  shoppingError: null,
  // Lista de categorias
  shoppingList: [],
  shoppingListLoading: false,
  shoppingListError: null,
  shoppingListTotal: 0,
  // Insere uma categoria
  shoppingInsertLoading: false,
  shoppingInsertError: false,
  // Atualiza uma categoria
  shoppingUpdateLoading: false,
  shoppingUpdateError: false,
  // Deleta categoria
  shoppingDeleteLoading: false,
  shoppingDeleteError: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    // Produto por id
    case Types.GET_REQUEST:
      return {
        ...state,
        shopping: {},
        shoppingError: null,
        shoppingLoading: true,
      };
    case Types.GET_SUCCESS:
      return {
        ...state,
        shopping: action.payload.data,
        shoppingLoading: false,
        shoppingError: null,
      };
    case Types.GET_FAILURE:
      return {
        ...state,
        shoppingLoading: false,
        shoppingError: action.payload,
      };
    // Lista de categorias
    case Types.GET_LIST_REQUEST:
      return { ...state, shoppingListLoading: true };
    case Types.GET_LIST_SUCCESS:
      return {
        ...state,
        shoppingList: action.payload.data,
        shoppingListLoading: false,
        shoppingListError: null,
        shoppingListTotal: action.payload.total,
      };
    case Types.GET_LIST_FAILURE:
      return {
        ...state,
        shoppingListLoading: false,
        shoppingListError: action.payload,
      };
    // Insere um categoria
    case Types.GET_INSERT_REQUEST:
      return {
        ...state,
        shoppingInsertLoading: true,
        shoppingInsertError: null,
      };
    case Types.GET_INSERT_SUCCESS:
      return {
        ...state,
        shoppingInsertLoading: false,
        shoppingInsertError: null,
      };
    case Types.GET_INSERT_FAILURE:
      return {
        ...state,
        shoppingInsertLoading: false,
        shoppingInsertError: action.payload,
      };
    // Atualiza um categoria
    case Types.GET_UPDATE_REQUEST:
      return {
        ...state,
        shoppingUpdateLoading: true,
        shoppingUpdateError: null,
      };
    case Types.GET_UPDATE_SUCCESS:
      return {
        ...state,
        shoppingUpdateLoading: false,
        shoppingUpdateError: null,
      };
    case Types.GET_UPDATE_FAILURE:
      return {
        ...state,
        shoppingUpdateLoading: false,
        shoppingUpdateError: action.payload,
      };
    // Deleta uma categoria
    case Types.GET_DELETE_REQUEST:
      return {
        ...state,
        shoppingDeleteLoading: true,
        shoppingDeleteError: null,
      };
    case Types.GET_DELETE_SUCCESS:
      return {
        ...state,
        shoppingDeleteLoading: false,
        shoppingDeleteError: null,
      };
    case Types.GET_DELETE_FAILURE:
      return {
        ...state,
        shoppingDeleteLoading: false,
        shoppingDeleteError: action.payload,
      };
    default:
      return state;
  }
};

export const Creators = {
  // Busca uma categoria
  getShoppingRequest: ({ id }) => ({
    type: Types.GET_REQUEST,
    payload: { id },
  }),
  getShoppingSuccess: ({ data }) => ({
    type: Types.GET_SUCCESS,
    payload: { data },
  }),
  getShoppingFailure: error => ({
    type: Types.GET_FAILURE,
    payload: error,
  }),
  // Insere uma categoria
  getShoppingInsertRequest: ({
    name,
    email,
    description,
    cnpj,
    social_name,
    state_register,
    cell_phone,
    cnae,
    website,
    status,
    address,
    shopping_global,
    image_data,
  }) => ({
    type: Types.GET_INSERT_REQUEST,
    payload: {
      name,
      email,
      description,
      cnpj,
      social_name,
      state_register,
      cell_phone,
      cnae,
      website,
      status,
      address,
      shopping_global,
      image_data,
    },
  }),
  getShoppingInsertSuccess: () => ({
    type: Types.GET_INSERT_SUCCESS,
  }),
  getShoppingInsertFailure: error => ({
    type: Types.GET_INSERT_FAILURE,
    payload: error,
  }),
  // Busca lista de categorias
  getShoppingListRequest: ({
    page,
    perPage,
    search,
    orderByColumn,
    orderByDirection,
  }) => ({
    type: Types.GET_LIST_REQUEST,
    payload: { page, perPage, search, orderByColumn, orderByDirection },
  }),
  getShoppingListSuccess: ({ data, total }) => ({
    type: Types.GET_LIST_SUCCESS,
    payload: { data, total },
  }),
  getShoppingListFailure: error => ({
    type: Types.GET_LIST_FAILURE,
    payload: error,
  }),
  // Atualiza uma  Produto
  // Insere uma categoria
  getShoppingUpdateRequest: ({
    id,
    name,
    email,
    description,
    cnpj,
    social_name,
    state_register,
    cell_phone,
    cnae,
    website,
    status,
    address,
    shopping_global,
    image_data,
  }) => ({
    type: Types.GET_UPDATE_REQUEST,
    payload: {
      id,
      name,
      email,
      description,
      cnpj,
      social_name,
      state_register,
      cell_phone,
      cnae,
      website,
      status,
      address,
      shopping_global,
      image_data,
    },
  }),
  getShoppingUpdateSuccess: () => ({
    type: Types.GET_UPDATE_SUCCESS,
  }),
  getShoppingUpdateFailure: error => ({
    type: Types.GET_UPDATE_FAILURE,
    payload: error,
  }),
  // Deleta uma categoria
  getShoppingDeleteRequest: id => ({
    type: Types.GET_DELETE_REQUEST,
    payload: { id },
  }),
  getShoppingDeleteSuccess: () => ({
    type: Types.GET_DELETE_SUCCESS,
  }),
  getShoppingDeleteFailure: error => ({
    type: Types.GET_DELETE_FAILURE,
    payload: error,
  }),
};
