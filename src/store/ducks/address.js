/*
 *
 * Address reducer
 *
 */

export const Types = {
  // Obtem catergorias
  GET_VALIDATE_REQUEST: 'address/GET_VALIDATE_REQUEST',
  GET_VALIDATE_SUCCESS: 'address/GET_VALIDATE_SUCCESS',
  GET_VALIDATE_FAILURE: 'address/GET_VALIDATE_FAILURE',
};

export const initialState = {
  // Categoria por id
  addressValidate: {},
  addressValidateLoading: false,
  addressValidateError: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    // Categoria por id
    case Types.GET_VALIDATE_REQUEST:
      return {
        ...state,
        addressValidate: {},
        addressValidateError: null,
        addressValidateLoading: true,
      };
    case Types.GET_VALIDATE_SUCCESS:
      return {
        ...state,
        addressValidate: action.payload.data,
        addressValidateLoading: false,
        addressValidateError: null,
      };
    case Types.GET_VALIDATE_FAILURE:
      return {
        ...state,
        addressValidateLoading: false,
        addressValidateError: action.payload,
      };
    default:
      return state;
  }
};

export const Creators = {
  // Busca uma categoria
  getAddressValidateRequest: ({ code_post }) => {
    return {
      type: Types.GET_VALIDATE_REQUEST,
      payload: { code_post },
    };
  },
  getAddressValidateSuccess: ({ data }) => ({
    type: Types.GET_VALIDATE_SUCCESS,
    payload: { data },
  }),
  getAddressValidateFailure: error => ({
    type: Types.GET_VALIDATE_FAILURE,
    payload: error,
  }),
};
