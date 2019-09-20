/*
 *
 * Category reducer
 *
 */

export const Types = {
  // Obtem catergorias
  GET_REQUEST: 'order/GET_REQUEST',
  GET_SUCCESS: 'order/GET_SUCCESS',
  GET_FAILURE: 'order/GET_FAILURE',

  // Obtem catergorias
  GET_LIST_REQUEST: 'order/GET_LIST_REQUEST',
  GET_LIST_SUCCESS: 'order/GET_LIST_SUCCESS',
  GET_LIST_FAILURE: 'order/GET_LIST_FAILURE',

  // Insere uma catergoria
  GET_INSERT_REQUEST: 'order/GET_INSERT_REQUEST',
  GET_INSERT_SUCCESS: 'order/GET_INSERT_SUCCESS',
  GET_INSERT_FAILURE: 'order/GET_INSERT_FAILURE',

  // Atualiza uma catergoria
  GET_UPDATE_REQUEST: 'order/GET_UPDATE_REQUEST',
  GET_UPDATE_SUCCESS: 'order/GET_UPDATE_SUCCESS',
  GET_UPDATE_FAILURE: 'order/GET_UPDATE_FAILURE',

  // Deleta uma catergoria
  GET_DELETE_REQUEST: 'order/GET_DELETE_REQUEST',
  GET_DELETE_SUCCESS: 'order/GET_DELETE_SUCCESS',
  GET_DELETE_FAILURE: 'order/GET_DELETE_FAILURE',
};

export const initialState = {
  // Categoria por id
  order: {},
  orderLoading: false,
  orderError: null,
  // Lista de pedidos
  orderList: [],
  orderListLoading: false,
  orderListError: null,
  orderListTotal: 0,
  // Insere uma pedido
  orderInsertLoading: false,
  orderInsertError: false,
  // Atualiza uma pedido
  orderUpdateLoading: false,
  orderUpdateError: false,
  // Deleta pedido
  orderDeleteLoading: false,
  orderDeleteError: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    // Categoria por id
    case Types.GET_REQUEST:
      return {
        ...state,
        order: {},
        orderError: null,
        orderLoading: true,
      };
    case Types.GET_SUCCESS:
      return {
        ...state,
        order: action.payload.data,
        orderLoading: false,
        orderError: null,
      };
    case Types.GET_FAILURE:
      return {
        ...state,
        orderLoading: false,
        orderError: action.payload,
      };
    // Lista de pedidos
    case Types.GET_LIST_REQUEST:
      return { ...state, orderListLoading: true };
    case Types.GET_LIST_SUCCESS:
      return {
        ...state,
        orderList: action.payload.data,
        orderListLoading: false,
        orderListError: null,
        orderListTotal: action.payload.total,
      };
    case Types.GET_LIST_FAILURE:
      return {
        ...state,
        orderListLoading: false,
        orderListError: action.payload,
      };
    case Types.GET_INSERT_REQUEST:
      return {
        ...state,
        orderInsertLoading: true,
        orderInsertError: null,
      };
    case Types.GET_INSERT_SUCCESS:
      return {
        ...state,
        orderInsertLoading: false,
        orderInsertError: null,
      };
    case Types.GET_INSERT_FAILURE:
      return {
        ...state,
        orderInsertLoading: false,
        orderInsertError: action.payload,
      };
    // Atualiza um pedido
    case Types.GET_UPDATE_REQUEST:
      return {
        ...state,
        orderUpdateLoading: true,
        orderUpdateError: null,
      };
    case Types.GET_UPDATE_SUCCESS:
      return {
        ...state,
        orderUpdateLoading: false,
        orderUpdateError: null,
      };
    case Types.GET_UPDATE_FAILURE:
      return {
        ...state,
        orderUpdateLoading: false,
        orderUpdateError: action.payload,
      };
    // Deleta uma pedido
    case Types.GET_DELETE_REQUEST:
      return {
        ...state,
        orderDeleteLoading: true,
        orderDeleteError: null,
      };
    case Types.GET_DELETE_SUCCESS:
      return {
        ...state,
        orderDeleteLoading: false,
        orderDeleteError: null,
      };
    case Types.GET_DELETE_FAILURE:
      return {
        ...state,
        orderDeleteLoading: false,
        orderDeleteError: action.payload,
      };
    default:
      return state;
  }
};

export const Creators = {
  // Busca uma pedido
  getOrderRequest: ({ id }) => ({
    type: Types.GET_REQUEST,
    payload: { id },
  }),
  getOrderSuccess: ({ data }) => ({
    type: Types.GET_SUCCESS,
    payload: { data },
  }),
  getOrderFailure: error => ({
    type: Types.GET_FAILURE,
    payload: error,
  }),
  // Insere uma pedido
  getOrderInsertRequest: ({
    order_father,
    description,
    name,
    order_position,
  }) => ({
    type: Types.GET_INSERT_REQUEST,
    payload: { order_father, description, name, order_position },
  }),
  getOrderInsertSuccess: () => ({
    type: Types.GET_INSERT_SUCCESS,
  }),
  getOrderInsertFailure: error => ({
    type: Types.GET_INSERT_FAILURE,
    payload: error,
  }),
  // Busca lista de pedidos
  getOrderListRequest: ({
    page,
    perPage,
    search,
    orderByColumn,
    orderByDirection,
    dateStart,
    dateEnd,
  }) => ({
    type: Types.GET_LIST_REQUEST,
    payload: {
      page,
      perPage,
      search,
      orderByColumn,
      orderByDirection,
      dateStart,
      dateEnd,
    },
  }),
  getOrderListSuccess: ({ data, total }) => ({
    type: Types.GET_LIST_SUCCESS,
    payload: { data, total },
  }),
  getOrderListFailure: error => ({
    type: Types.GET_LIST_FAILURE,
    payload: error,
  }),
  // Atualiza uma  Categoria
  // Insere uma pedido
  getOrderUpdateRequest: ({
    id,
    order_father,
    description,
    name,
    order_position,
  }) => ({
    type: Types.GET_UPDATE_REQUEST,
    payload: { id, order_father, description, name, order_position },
  }),
  getOrderUpdateSuccess: () => ({
    type: Types.GET_UPDATE_SUCCESS,
  }),
  getOrderUpdateFailure: error => ({
    type: Types.GET_UPDATE_FAILURE,
    payload: error,
  }),
  // Deleta uma pedido
  getOrderDeleteRequest: id => ({
    type: Types.GET_DELETE_REQUEST,
    payload: { id },
  }),
  getOrderDeleteSuccess: () => ({
    type: Types.GET_DELETE_SUCCESS,
  }),
  getOrderDeleteFailure: error => ({
    type: Types.GET_DELETE_FAILURE,
    payload: error,
  }),
};
