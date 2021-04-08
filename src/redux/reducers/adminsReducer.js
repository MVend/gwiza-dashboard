import {
  GET_ADMINS_SUCCESS,
  GET_ADMINS_ERROR,
  GET_ADMINS_START,
  CREATE_ADMIN_START,
  CREATE_ADMIN_SUCCESS,
  CREATE_ADMIN_ERROR,
  DELETE_ADMIN_SUCCESS,
} from "../types";

const initialState = {
  isLoading: false,
  isLoaded: false,
  btnLoading: false,
  values: {
    currentPage: 0,
    totalPages: 0,
    totalItems: 0,
    itemsPerPage: 0,
    rows: [],
  },
  error: null,
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case GET_ADMINS_START:
      return {
        ...state,
        isLoading: true,
      };
    case GET_ADMINS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        isLoaded: true,
        btnLoading: false,
        values: payload,
      };
    case GET_ADMINS_ERROR:
      return {
        ...state,
        isLoading: false,
        isLoaded: false,
        btnLoading: false,
        error: payload,
      };
    case CREATE_ADMIN_START:
      return {
        ...state,
        btnLoading: true,
      };
    case CREATE_ADMIN_SUCCESS:
      return {
        ...state,
        isLoading: false,
        btnLoading: false,
        isLoaded: true,
        values: {
          ...state.values,
          totalItems: state.values.totalItems + 1,
          rows: [...state.values.rows, payload],
        },
      };
    case CREATE_ADMIN_ERROR:
      return {
        ...state,
        isLoading: false,
        isLoaded: false,
        btnLoading: false,
        error: payload,
      };

    case DELETE_ADMIN_SUCCESS:
      const rows = state.values.rows.filter(
        ({ id }) => id !== payload
      );
      return {
        ...state,
        isLoading: false,
        isLoaded: true,
        btnLoading: false,
        values: {
          ...state.values,
          totalItems: state.values.totalItems - 1,
          rows,
        },
      };
    default:
      return state;
  }
};
