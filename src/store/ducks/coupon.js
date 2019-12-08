/*
 *
 * Coupon reducer
 *
 */

export const Types = {
  // Obtem catergorias
  GET_REQUEST: 'coupon/GET_REQUEST',
  GET_SUCCESS: 'coupon/GET_SUCCESS',
  GET_FAILURE: 'coupon/GET_FAILURE',

  // Obtem catergorias
  GET_LIST_REQUEST: 'coupon/GET_LIST_REQUEST',
  GET_LIST_SUCCESS: 'coupon/GET_LIST_SUCCESS',
  GET_LIST_FAILURE: 'coupon/GET_LIST_FAILURE',

  // Insere uma catergoria
  GET_INSERT_REQUEST: 'coupon/GET_INSERT_REQUEST',
  GET_INSERT_SUCCESS: 'coupon/GET_INSERT_SUCCESS',
  GET_INSERT_FAILURE: 'coupon/GET_INSERT_FAILURE',

  // Atualiza uma catergoria
  GET_UPDATE_REQUEST: 'coupon/GET_UPDATE_REQUEST',
  GET_UPDATE_SUCCESS: 'coupon/GET_UPDATE_SUCCESS',
  GET_UPDATE_FAILURE: 'coupon/GET_UPDATE_FAILURE',

  // Deleta uma catergoria
  GET_DELETE_REQUEST: 'coupon/GET_DELETE_REQUEST',
  GET_DELETE_SUCCESS: 'coupon/GET_DELETE_SUCCESS',
  GET_DELETE_FAILURE: 'coupon/GET_DELETE_FAILURE',
};

export const initialState = {
  // Categoria por id
  coupon: {},
  couponLoading: false,
  couponError: null,
  // Lista de categorias
  couponList: [],
  couponListLoading: false,
  couponListError: null,
  couponListTotal: 0,
  // Insere uma categoria
  couponInsertLoading: false,
  couponInsertError: false,
  // Atualiza uma categoria
  couponUpdateLoading: false,
  couponUpdateError: false,
  // Deleta categoria
  couponDeleteLoading: false,
  couponDeleteError: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    // Categoria por id
    case Types.GET_REQUEST:
      return {
        ...state,
        coupon: {},
        couponError: null,
        couponLoading: true,
      };
    case Types.GET_SUCCESS:
      return {
        ...state,
        coupon: action.payload.data,
        couponLoading: false,
        couponError: null,
      };
    case Types.GET_FAILURE:
      return {
        ...state,
        couponLoading: false,
        couponError: action.payload,
      };
    // Lista de categorias
    case Types.GET_LIST_REQUEST:
      return { ...state, couponListLoading: true };
    case Types.GET_LIST_SUCCESS:
      return {
        ...state,
        couponList: action.payload.data,
        couponListLoading: false,
        couponListError: null,
        couponListTotal: action.payload.total,
      };
    case Types.GET_LIST_FAILURE:
      return {
        ...state,
        couponListLoading: false,
        couponListError: action.payload,
      };
    // Insere
    case Types.GET_INSERT_REQUEST:
      return {
        ...state,
        couponInsertLoading: true,
        couponInsertError: null,
      };
    case Types.GET_INSERT_SUCCESS:
      return {
        ...state,
        couponInsertLoading: false,
        couponInsertError: null,
      };
    case Types.GET_INSERT_FAILURE:
      return {
        ...state,
        couponInsertLoading: false,
        couponInsertError: action.payload,
      };
    // Atualiza um categoria
    case Types.GET_UPDATE_REQUEST:
      return {
        ...state,
        couponUpdateLoading: true,
        couponUpdateError: null,
      };
    case Types.GET_UPDATE_SUCCESS:
      return {
        ...state,
        couponUpdateLoading: false,
        couponUpdateError: null,
      };
    case Types.GET_UPDATE_FAILURE:
      return {
        ...state,
        couponUpdateLoading: false,
        couponListError: action.payload,
      };
    // Deleta uma categoria
    case Types.GET_DELETE_REQUEST:
      return {
        ...state,
        couponDeleteLoading: true,
        couponDeleteError: null,
      };
    case Types.GET_DELETE_SUCCESS:
      return {
        ...state,
        couponDeleteLoading: false,
        couponDeleteError: null,
      };
    case Types.GET_DELETE_FAILURE:
      return {
        ...state,
        couponDeleteLoading: false,
        couponDeleteError: action.payload,
      };
    default:
      return state;
  }
};

export const Creators = {
  // Busca uma categoria
  getCouponRequest: ({ id }) => ({
    type: Types.GET_REQUEST,
    payload: { id },
  }),
  getCouponSuccess: ({ data }) => ({
    type: Types.GET_SUCCESS,
    payload: { data },
  }),
  getCouponFailure: error => ({
    type: Types.GET_FAILURE,
    payload: error,
  }),
  // Insere uma categoria
  getCouponInsertRequest: ({
    name,
    code,
    date_start,
    date_end,
    type_discount,
    price_discount,
    price_min,
    price_max,
    quantity,
    quantity_client,
    status,
  }) => ({
    type: Types.GET_INSERT_REQUEST,
    payload: {
      name,
      code,
      date_start,
      date_end,
      type_discount,
      price_discount,
      price_min,
      price_max,
      quantity,
      quantity_client,
      status,
    },
  }),
  getCouponInsertSuccess: () => ({
    type: Types.GET_INSERT_SUCCESS,
  }),
  getCouponInsertFailure: error => ({
    type: Types.GET_INSERT_FAILURE,
    payload: error,
  }),
  // Busca lista de categorias
  getCouponListRequest: ({
    page,
    perPage,
    search,
    orderByColumn,
    orderByDirection,
  }) => ({
    type: Types.GET_LIST_REQUEST,
    payload: { page, perPage, search, orderByColumn, orderByDirection },
  }),
  getCouponListSuccess: ({ data, total }) => ({
    type: Types.GET_LIST_SUCCESS,
    payload: { data, total },
  }),
  getCouponListFailure: error => ({
    type: Types.GET_LIST_FAILURE,
    payload: error,
  }),
  // Atualiza uma  Categoria
  // Insere uma categoria
  getCouponUpdateRequest: ({
    id,
    name,
    code,
    date_start,
    date_end,
    type_discount,
    price_discount,
    price_min,
    price_max,
    quantity,
    quantity_client,
    status,
  }) => ({
    type: Types.GET_UPDATE_REQUEST,
    payload: {
      id,
      name,
      code,
      date_start,
      date_end,
      type_discount,
      price_discount,
      price_min,
      price_max,
      quantity,
      quantity_client,
      status,
    },
  }),
  getCouponUpdateSuccess: () => ({
    type: Types.GET_UPDATE_SUCCESS,
  }),
  getCouponUpdateFailure: error => ({
    type: Types.GET_UPDATE_FAILURE,
    payload: error,
  }),
  // Deleta uma categoria
  getCouponDeleteRequest: id => ({
    type: Types.GET_DELETE_REQUEST,
    payload: { id },
  }),
  getCouponDeleteSuccess: () => ({
    type: Types.GET_DELETE_SUCCESS,
  }),
  getCouponDeleteFailure: error => ({
    type: Types.GET_DELETE_FAILURE,
    payload: error,
  }),
};
