/*
 *
 * Report reducer
 *
 */

export const Types = {
  // Obtem catergorias
  GET_ORDER_REQUEST: 'report/GET_ORDER_REQUEST',
  GET_ORDER_SUCCESS: 'report/GET_ORDER_SUCCESS',
  GET_ORDER_FAILURE: 'report/GET_ORDER_FAILURE',
};

export const initialState = {
  // Categoria por id
  reportOrder: {},
  reportOrderLoading: false,
  reportOrderError: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    // Categoria por id
    case Types.GET_ORDER_REQUEST:
      return {
        ...state,
        reportOrder: {},
        reportOrderError: null,
        reportOrderLoading: true,
      };
    case Types.GET_ORDER_SUCCESS:
      return {
        ...state,
        reportOrder: action.payload.data,
        reportOrderLoading: false,
        reportOrderError: null,
      };
    case Types.GET_ORDER_FAILURE:
      return {
        ...state,
        reportOrderLoading: false,
        reportOrderError: action.payload,
      };
    default:
      return state;
  }
};

export const Creators = {
  // Busca uma categoria
  getReportOrderRequest: ({ date_start, date_end }) => {
    return {
      type: Types.GET_ORDER_REQUEST,
      payload: { date_start, date_end },
    };
  },
  getReportOrderSuccess: ({ data }) => ({
    type: Types.GET_ORDER_SUCCESS,
    payload: { data },
  }),
  getReportOrderFailure: error => ({
    type: Types.GET_ORDER_FAILURE,
    payload: error,
  }),
};
