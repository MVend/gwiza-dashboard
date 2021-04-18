import {
  GET_COMMENTS_SUCCESS,
  GET_COMMENTS_ERROR,
  GET_COMMENTS_START,
  CREATE_COMMENT_START,
  CREATE_COMMENT_SUCCESS,
  CREATE_COMMENT_ERROR,
  DELETE_COMMENT_SUCCESS,
  UPDATE_COMMENT_SUCCESS,
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
    case GET_COMMENTS_START:
      return {
        ...state,
        isLoading: true,
      };
    case GET_COMMENTS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        isLoaded: true,
        btnLoading: false,
        values: payload,
      };
    case GET_COMMENTS_ERROR:
      return {
        ...state,
        isLoading: false,
        isLoaded: false,
        btnLoading: false,
        error: payload,
      };
    case CREATE_COMMENT_START:
      return {
        ...state,
        btnLoading: true,
      };
    case CREATE_COMMENT_SUCCESS:
      return {
        ...state,
        isLoading: false,
        btnLoading: false,
        isLoaded: true,
        values: {
          ...state.values,
          rows: [...state.values.rows, payload],
        },
      };
    case CREATE_COMMENT_ERROR:
      return {
        ...state,
        isLoading: false,
        isLoaded: false,
        btnLoading: false,
        error: payload,
      };

    case UPDATE_COMMENT_SUCCESS:
      return {
        ...state,
        isLoading: false,
        isLoaded: true,
        btnLoading: false,
        values: {
          ...state.values,
          rows: state.values.rows.map((value) =>
            value.id !== payload.id ? value : payload
          ),
        },
      };
    case DELETE_COMMENT_SUCCESS:
      const rows = state.values.rows.filter(
        ({ id }) => id !== payload
      );
      return {
        ...state,
        isLoading: false,
        isLoaded: true,
        btnLoading: false,
        values: {
          rows,
        },
      };
    default:
      return state;
  }
};
