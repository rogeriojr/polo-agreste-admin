/*
 *
 * ProfileAccess reducer
 *
 */

export const Types = {
  // Obtem catergorias
  GET_REQUEST: 'profileAccess/GET_REQUEST',
  GET_SUCCESS: 'profileAccess/GET_SUCCESS',
  GET_FAILURE: 'profileAccess/GET_FAILURE',

  // Obtem perfil de acesso
  GET_LIST_REQUEST: 'profileAccess/GET_LIST_REQUEST',
  GET_LIST_SUCCESS: 'profileAccess/GET_LIST_SUCCESS',
  GET_LIST_FAILURE: 'profileAccess/GET_LIST_FAILURE',

  // Insere um perfil de acesso
  GET_INSERT_REQUEST: 'profileAccess/GET_INSERT_REQUEST',
  GET_INSERT_SUCCESS: 'profileAccess/GET_INSERT_SUCCESS',
  GET_INSERT_FAILURE: 'profileAccess/GET_INSERT_FAILURE',

  // Atualiza um perfil de acesso
  GET_UPDATE_REQUEST: 'profileAccess/GET_UPDATE_REQUEST',
  GET_UPDATE_SUCCESS: 'profileAccess/GET_UPDATE_SUCCESS',
  GET_UPDATE_FAILURE: 'profileAccess/GET_UPDATE_FAILURE',

  // Deleta um perfil de acesso
  GET_DELETE_REQUEST: 'profileAccess/GET_DELETE_REQUEST',
  GET_DELETE_SUCCESS: 'profileAccess/GET_DELETE_SUCCESS',
  GET_DELETE_FAILURE: 'profileAccess/GET_DELETE_FAILURE',
};

export const initialState = {
  // perfil de acesso por id
  profileAccess: {},
  profileAccessLoading: false,
  profileAccessError: null,
  // Lista de perfil de acesso
  profileAccessList: [],
  profileAccessListLoading: false,
  profileAccessListError: null,
  profileAccessListTotal: 0,
  // Insere umperfil de acesso perfil de acesso
  profileAccessInsertLoading: false,
  profileAccessInsertError: false,
  // Atualiza um perfil de acesso
  profileAccessUpdateLoading: false,
  profileAccessUpdateError: false,
  // Deleta perfil de acesso
  profileAccessDeleteLoading: false,
  profileAccessDeleteError: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    // perfil de acesso por id
    case Types.GET_REQUEST:
      return {
        ...state,
        profileAccess: {},
        profileAccessError: null,
        profileAccessLoading: true,
      };
    case Types.GET_SUCCESS:
      return {
        ...state,
        profileAccess: action.payload.data,
        profileAccessLoading: false,
        profileAccessError: null,
      };
    case Types.GET_FAILURE:
      return {
        ...state,
        profileAccessLoading: false,
        profileAccessError: action.payload,
      };
    // Lista de perfis de acesso
    case Types.GET_LIST_REQUEST:
      return { ...state, profileAccessListLoading: true };
    case Types.GET_LIST_SUCCESS:
      return {
        ...state,
        profileAccessList: action.payload.data,
        profileAccessListLoading: false,
        profileAccessListError: null,
        profileAccessListTotal: action.payload.total,
      };
    case Types.GET_LIST_FAILURE:
      return {
        ...state,
        profileAccessListLoading: false,
        profileAccessListError: action.payload,
      };
    case Types.GET_INSERT_REQUEST:
      return {
        ...state,
        profileAccessInsertLoading: true,
        profileAccessInsertError: null,
      };
    case Types.GET_INSERT_SUCCESS:
      return {
        ...state,
        profileAccessInsertLoading: false,
        profileAccessInsertError: null,
      };
    case Types.GET_INSERT_FAILURE:
      return {
        ...state,
        profileAccessInsertLoading: false,
        profileAccessInsertError: action.payload,
      };
    // Atualiza um perfil de acesso
    case Types.GET_UPDATE_REQUEST:
      return {
        ...state,
        profileAccessUpdateLoading: true,
        profileAccessUpdateError: null,
      };
    case Types.GET_UPDATE_SUCCESS:
      return {
        ...state,
        profileAccessUpdateLoading: false,
        profileAccessUpdateError: null,
      };
    case Types.GET_UPDATE_FAILURE:
      return {
        ...state,
        profileAccessUpdateLoading: false,
        profileAccessUpdateError: action.payload,
      };
    // Deleta um perfil de acesso
    case Types.GET_DELETE_REQUEST:
      return {
        ...state,
        profileAccessDeleteLoading: true,
        profileAccessDeleteError: null,
      };
    case Types.GET_DELETE_SUCCESS:
      return {
        ...state,
        profileAccessDeleteLoading: false,
        profileAccessDeleteError: null,
      };
    case Types.GET_DELETE_FAILURE:
      return {
        ...state,
        profileAccessDeleteLoading: false,
        profileAccessDeleteError: action.payload,
      };
    default:
      return state;
  }
};

export const Creators = {
  // Busca um perfil de acesso
  getProfileAccessRequest: ({ id }) => ({
    type: Types.GET_REQUEST,
    payload: { id },
  }),
  getProfileAccessSuccess: ({ data }) => ({
    type: Types.GET_SUCCESS,
    payload: { data },
  }),
  getProfileAccessFailure: error => ({
    type: Types.GET_FAILURE,
    payload: error,
  }),
  // Insere um perfil de acesso
  getProfileAccessInsertRequest: ({
    profileAccess_father,
    description,
    name,
    order_position,
    image_data,
  }) => ({
    type: Types.GET_INSERT_REQUEST,
    payload: {
      profileAccess_father,
      description,
      name,
      order_position,
      image_data,
    },
  }),
  getProfileAccessInsertSuccess: () => ({
    type: Types.GET_INSERT_SUCCESS,
  }),
  getProfileAccessInsertFailure: error => ({
    type: Types.GET_INSERT_FAILURE,
    payload: error,
  }),
  // Busca lista de perfis de acesso
  getProfileAccessListRequest: ({
    page,
    perPage,
    search,
    orderByColumn,
    orderByDirection,
  }) => ({
    type: Types.GET_LIST_REQUEST,
    payload: { page, perPage, search, orderByColumn, orderByDirection },
  }),
  getProfileAccessListSuccess: ({ data, total }) => ({
    type: Types.GET_LIST_SUCCESS,
    payload: { data, total },
  }),
  getProfileAccessListFailure: error => ({
    type: Types.GET_LIST_FAILURE,
    payload: error,
  }),
  // Atualiza um  perfil de acesso
  getProfileAccessUpdateRequest: ({
    id,
    profileAccess_father,
    description,
    name,
    order_position,
    image_data,
  }) => ({
    type: Types.GET_UPDATE_REQUEST,
    payload: {
      id,
      profileAccess_father,
      description,
      name,
      order_position,
      image_data,
    },
  }),
  getProfileAccessUpdateSuccess: () => ({
    type: Types.GET_UPDATE_SUCCESS,
  }),
  getProfileAccessUpdateFailure: error => ({
    type: Types.GET_UPDATE_FAILURE,
    payload: error,
  }),
  // Deleta um perfil de acesso
  getProfileAccessDeleteRequest: id => ({
    type: Types.GET_DELETE_REQUEST,
    payload: { id },
  }),
  getProfileAccessDeleteSuccess: () => ({
    type: Types.GET_DELETE_SUCCESS,
  }),
  getProfileAccessDeleteFailure: error => ({
    type: Types.GET_DELETE_FAILURE,
    payload: error,
  }),
};
