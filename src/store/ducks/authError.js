import { typeCastExpression } from "@babel/types";

export const Types = {
  GET_REQUEST: 'authError/GET_REQUEST',
  GET_FAILURE: 'authError/GET_FAILURE',
};

const initialState = {
  error: null,
};

export default function(state = initialState, action) {
  switch (action.type) {
    case Types.GET_REQUEST:
      return { ...state, error: null };
    case Types.GET_SUCCESS:
      return {
        ...state,
        error: null,
      };
    case Types.GET_FAILURE:
      return {
        ...state,
        error: action.payload,
      };
    default:
      return state;
  }
}

export const Creators = {
  getAuthErrorRequest: () => ({
    type: Types.GET_REQUEST,
    payload: null,
  }),
  getAuthErrorSuccess: data => ({
    type: Types.GET_SUCCESS,
    payload: data,
  }),
  getAuthErrorFailure: data => ({
    type: Types.GET_FAILURE,
    payload: data,
  }),
};
