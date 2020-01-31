/*
 *
 * Report reducer
 *
 */

export const Types = {
  // Obtem catergorias
  GET_REQUEST: 'dashboard/GET_REQUEST',
  GET_SUCCESS: 'dashboard/GET_SUCCESS',
  GET_FAILURE: 'dashboard/GET_FAILURE',
};

export const initialState = {
  // Categoria por id
  dashboard: {},
  dashboardLoading: false,
  dashboardError: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    // Categoria por id
    case Types.GET_REQUEST:
      return {
        ...state,
        dashboard: action.payload,
        dashboardError: null,
        dashboardLoading: true,
      };
    case Types.GET_SUCCESS:
      return {
        ...state,
        dashboard: action.payload.data,
        dashboardLoading: false,
        dashboardError: null,
      };
    case Types.GET_FAILURE:
      return {
        ...state,
        dashboardLoading: false,
        dashboardError: action.payload,
      };
    default:
      return state;
  }
};

export const Creators = {
  // Busca uma categoria
  getDashboardRequest: ({ dateStart, dateEnd }) => {
    return {
      type: Types.GET_REQUEST,
      payload: {
        dateStart,
        dateEnd,
      },
    };
  },
  getDashboardSuccess: ({ data }) => ({
    type: Types.GET_SUCCESS,
    payload: { data },
  }),
  getDashboardFailure: error => ({
    type: Types.GET_FAILURE,
    payload: error,
  }),
};
