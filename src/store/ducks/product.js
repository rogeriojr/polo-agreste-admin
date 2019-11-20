/*
 *
 * Product reducer
 *
 */

export const Types = {
  // Obtem catergorias
  GET_REQUEST: 'product/GET_REQUEST',
  GET_SUCCESS: 'product/GET_SUCCESS',
  GET_FAILURE: 'product/GET_FAILURE',

  // Obtem catergorias
  GET_LIST_REQUEST: 'product/GET_LIST_REQUEST',
  GET_LIST_SUCCESS: 'product/GET_LIST_SUCCESS',
  GET_LIST_FAILURE: 'product/GET_LIST_FAILURE',

  // Insere uma catergoria
  GET_INSERT_REQUEST: 'product/GET_INSERT_REQUEST',
  GET_INSERT_SUCCESS: 'product/GET_INSERT_SUCCESS',
  GET_INSERT_FAILURE: 'product/GET_INSERT_FAILURE',

  // Atualiza uma catergoria
  GET_UPDATE_REQUEST: 'product/GET_UPDATE_REQUEST',
  GET_UPDATE_SUCCESS: 'product/GET_UPDATE_SUCCESS',
  GET_UPDATE_FAILURE: 'product/GET_UPDATE_FAILURE',

  // Deleta uma catergoria
  GET_DELETE_REQUEST: 'product/GET_DELETE_REQUEST',
  GET_DELETE_SUCCESS: 'product/GET_DELETE_SUCCESS',
  GET_DELETE_FAILURE: 'product/GET_DELETE_FAILURE',

  // Deleta uma catergoria
  GET_IMAGE_DELETE_REQUEST: 'product/GET_IMAGE_DELETE_REQUEST',
  GET_IMAGE_DELETE_SUCCESS: 'product/GET_IMAGE_DELETE_SUCCESS',
  GET_IMAGE_DELETE_FAILURE: 'product/GET_IMAGE_DELETE_FAILURE',
};

export const initialState = {
  // Produto por id
  product: {},
  productLoading: false,
  productError: null,
  // Lista de categorias
  productList: [],
  productListLoading: false,
  productListError: null,
  productListTotal: 0,
  // Insere uma categoria
  productInsertLoading: false,
  productInsertError: false,
  // Atualiza uma categoria
  productUpdateLoading: false,
  productUpdateError: false,
  // Deleta categoria
  productDeleteLoading: false,
  productDeleteError: null,

  // Deleta uma imagem de categoria
  productImageDeleteLoading: false,
  productImageDeleteError: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    // Produto por id
    case Types.GET_REQUEST:
      return {
        ...state,
        product: {},
        productError: null,
        productLoading: true,
      };
    case Types.GET_SUCCESS:
      return {
        ...state,
        product: action.payload.data,
        productLoading: false,
        productError: null,
      };
    case Types.GET_FAILURE:
      return {
        ...state,
        productLoading: false,
        productError: action.payload,
      };
    // Lista de categorias
    case Types.GET_LIST_REQUEST:
      return { ...state, productListLoading: true };
    case Types.GET_LIST_SUCCESS:
      return {
        ...state,
        productList: action.payload.data,
        productListLoading: false,
        productListError: null,
        productListTotal: action.payload.total,
      };
    case Types.GET_LIST_FAILURE:
      return {
        ...state,
        productListLoading: false,
        productListError: action.payload,
      };
    // Insere um categoria
    case Types.GET_INSERT_REQUEST:
      return {
        ...state,
        productInsertLoading: true,
        productInsertError: null,
      };
    case Types.GET_INSERT_SUCCESS:
      return {
        ...state,
        productInsertLoading: false,
        productInsertError: null,
      };
    case Types.GET_INSERT_FAILURE:
      return {
        ...state,
        productInsertLoading: false,
        productInsertError: action.payload,
      };
    // Atualiza um categoria
    case Types.GET_UPDATE_REQUEST:
      return {
        ...state,
        productUpdateLoading: true,
        productUpdateError: null,
      };
    case Types.GET_UPDATE_SUCCESS:
      return {
        ...state,
        product: action.payload,
        productUpdateLoading: false,
        productUpdateError: null,
      };
    case Types.GET_UPDATE_FAILURE:
      return {
        ...state,
        productUpdateLoading: false,
        productUpdateError: action.payload,
      };
    // Deleta uma categoria
    case Types.GET_DELETE_REQUEST:
      return {
        ...state,
        productDeleteLoading: true,
        productDeleteError: null,
      };
    case Types.GET_DELETE_SUCCESS:
      return {
        ...state,
        productDeleteLoading: false,
        productDeleteError: null,
      };
    case Types.GET_DELETE_FAILURE:
      return {
        ...state,
        productDeleteLoading: false,
        productDeleteError: action.payload,
      };
    // Deleta uma image de categoria
    case Types.GET_IMAGE_DELETE_REQUEST:
      return {
        ...state,
        productImageDeleteLoading: true,
        productImageDeleteError: null,
      };
    case Types.GET_IMAGE_DELETE_SUCCESS:
      return {
        ...state,
        productImageDeleteLoading: false,
        productImageDeleteError: null,
      };
    case Types.GET_IMAGE_DELETE_FAILURE:
      return {
        ...state,
        productImageDeleteLoading: false,
        productImageDeleteError: action.payload,
      };
    default:
      return state;
  }
};

export const Creators = {
  // Busca uma categoria
  getProductRequest: ({ id }) => ({
    type: Types.GET_REQUEST,
    payload: { id },
  }),
  getProductSuccess: ({ data }) => ({
    type: Types.GET_SUCCESS,
    payload: { data },
  }),
  getProductFailure: error => ({
    type: Types.GET_FAILURE,
    payload: error,
  }),
  // Insere uma categoria
  getProductInsertRequest: ({
    code_integration,
    genres,
    code_ncm,
    code_ean,
    name,
    description,
    description_tec,
    stock_control,
    stock,
    price,
    price_whole,
    quantity_max,
    quantity_min_whole,
    quantity_max_whole,
    height,
    width,
    length,
    weight,
    status,
    store,
    categories,
    featured,
    images_data,
    variations,
    related,
  }) => ({
    type: Types.GET_INSERT_REQUEST,
    payload: {
      code_integration,
      genres,
      code_ncm,
      code_ean,
      name,
      description,
      description_tec,
      stock_control,
      stock,
      price,
      price_whole,
      quantity_max,
      quantity_min_whole,
      quantity_max_whole,
      height,
      width,
      length,
      weight,
      status,
      store,
      categories,
      featured,
      images_data,
      variations,
      related,
    },
  }),
  getProductInsertSuccess: () => ({
    type: Types.GET_INSERT_SUCCESS,
  }),
  getProductInsertFailure: error => ({
    type: Types.GET_INSERT_FAILURE,
    payload: error,
  }),
  // Busca lista de categorias
  getProductListRequest: ({
    page,
    perPage,
    search,
    orderByColumn,
    orderByDirection,
  }) => ({
    type: Types.GET_LIST_REQUEST,
    payload: { page, perPage, search, orderByColumn, orderByDirection },
  }),
  getProductListSuccess: ({ data, total }) => ({
    type: Types.GET_LIST_SUCCESS,
    payload: { data, total },
  }),
  getProductListFailure: error => ({
    type: Types.GET_LIST_FAILURE,
    payload: error,
  }),
  // Atualiza uma  Produto
  // Insere uma categoria
  getProductUpdateRequest: ({
    id,
    code_integration,
    genres,
    code_ncm,
    code_ean,
    name,
    description,
    description_tec,
    stock_control,
    stock,
    price,
    price_whole,
    quantity_max,
    quantity_min_whole,
    quantity_max_whole,
    height,
    width,
    length,
    weight,
    status,
    store,
    categories,
    featured,
    images_data,
    variations,
    related,
  }) => ({
    type: Types.GET_UPDATE_REQUEST,
    payload: {
      id,
      code_integration,
      genres,
      code_ncm,
      code_ean,
      name,
      description,
      description_tec,
      stock_control,
      stock,
      price,
      price_whole,
      quantity_max,
      quantity_min_whole,
      quantity_max_whole,
      height,
      width,
      length,
      weight,
      status,
      store,
      categories,
      featured,
      images_data,
      variations,
      related,
    },
  }),
  getProductUpdateSuccess: ({ data }) => ({
    type: Types.GET_UPDATE_SUCCESS,
    payload: data,
  }),
  getProductUpdateFailure: error => ({
    type: Types.GET_UPDATE_FAILURE,
    payload: error,
  }),
  // Deleta uma categoria
  getProductDeleteRequest: id => ({
    type: Types.GET_DELETE_REQUEST,
    payload: { id },
  }),
  getProductDeleteSuccess: () => ({
    type: Types.GET_DELETE_SUCCESS,
  }),
  getProductDeleteFailure: error => ({
    type: Types.GET_DELETE_FAILURE,
    payload: error,
  }),

  // Deleta uma image categoria
  getImageProductDeleteRequest: ({ id, id_product }) => ({
    type: Types.GET_IMAGE_DELETE_REQUEST,
    payload: { id, id_product },
  }),
  getImageProductDeleteSuccess: () => ({
    type: Types.GET_IMAGE_DELETE_SUCCESS,
  }),
  getImageProductDeleteFailure: error => ({
    type: Types.GET_IMAGE_DELETE_FAILURE,
    payload: error,
  }),
};
