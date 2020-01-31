/*
 *
 * Report reducer
 *
 */

export const Types = {
  // Obtem catergorias
  GET_WALLET_REQUEST: 'wallet/GET_WALLET_REQUEST',
  GET_WALLET_SUCCESS: 'wallet/GET_WALLET_SUCCESS',
  GET_WALLET_FAILURE: 'wallet/GET_WALLET_FAILURE',
};

export const initialState = {
  // Categoria por id
  wallet: {},
  walletLoading: false,
  walletError: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    // Categoria por id
    case Types.GET_WALLET_REQUEST:
      return {
        ...state,
        wallet: {},
        walletError: null,
        walletLoading: true,
      };
    case Types.GET_WALLET_SUCCESS:
      return {
        ...state,
        wallet: action.payload.data,
        walletLoading: false,
        walletError: null,
      };
    case Types.GET_WALLET_FAILURE:
      return {
        ...state,
        walletLoading: false,
        walletError: action.payload,
      };
    default:
      return state;
  }
};

export const Creators = {
  // Busca uma categoria
  getWalletRequest: () => {
    return {
      type: Types.GET_WALLET_REQUEST,
      payload: {},
    };
  },
  getWalletSuccess: ({ data }) => ({
    type: Types.GET_WALLET_SUCCESS,
    payload: { data },
  }),
  getWalletFailure: error => ({
    type: Types.GET_WALLET_FAILURE,
    payload: error,
  }),
};
