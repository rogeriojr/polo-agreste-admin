/*
 *
 * Report reducer
 *
 */

export const Types = {
  // Sacar um valor
  GET_WITHDRAW_REQUEST: 'withdraw/GET_WITHDRAW_REQUEST',
  GET_WITHDRAW_SUCCESS: 'withdraw/GET_WITHDRAW_SUCCESS',
  GET_WITHDRAW_FAILURE: 'withdraw/GET_WITHDRAW_FAILURE',
};

export const initialState = {
  // Sacar um valor
  withdrawLoading: false,
  withdrawError: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    // Sacar um valor
    case Types.GET_WITHDRAW_REQUEST:
      return {
        ...state,
        withdrawLoading: true,
        withdrawError: null,
      };
    case Types.GET_WITHDRAW_SUCCESS:
      return {
        ...state,
        withdrawLoading: false,
        withdrawError: null,
      };
    case Types.GET_WITHDRAW_FAILURE:
      return {
        ...state,
        withdrawLoading: false,
        withdrawError: action.payload,
      };
    default:
      return state;
  }
};

export const Creators = {
  // Sacar um valor
  getWithdrawRequest: amount => ({
    type: Types.GET_WITHDRAW_REQUEST,
    payload: { amount },
  }),
  getWithdrawSuccess: ({ data }) => ({
    type: Types.GET_WITHDRAW_SUCCESS,
    payload: { data },
  }),
  getWithdrawFailure: error => ({
    type: Types.GET_WITHDRAW_FAILURE,
    payload: error,
  }),
};
