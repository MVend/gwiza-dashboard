import {
  GET_REASONS_SUCCESS,
  GET_REASONS_ERROR,
  GET_REASONS_START,
  CREATE_REASON_START,
  CREATE_REASON_SUCCESS,
  CREATE_REASON_ERROR,
  DELETE_REASON_SUCCESS,
  UPDATE_REASON_SUCCESS,
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
    case GET_REASONS_START:
      return {
        ...state,
        isLoading: true,
      };
    case GET_REASONS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        isLoaded: true,
        btnLoading: false,
        values: payload,
      };
    case GET_REASONS_ERROR:
      return {
        ...state,
        isLoading: false,
        isLoaded: false,
        btnLoading: false,
        error: payload,
      };
    case CREATE_REASON_START:
      return {
        ...state,
        btnLoading: true,
      };
    case CREATE_REASON_SUCCESS:
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
    case CREATE_REASON_ERROR:
      return {
        ...state,
        isLoading: false,
        isLoaded: false,
        btnLoading: false,
        error: payload,
      };

    case UPDATE_REASON_SUCCESS:
      return {
        ...state,
        isLoading: false,
        isLoaded: true,
        btnLoading: false,
        values: {
          ...state.values,
          rows: state.values.rows.map((value) =>
            value.reason_id !== payload.reason_id ? value : payload
          ),
        },
      };
    case DELETE_REASON_SUCCESS:
      const rows = state.values.rows.filter(
        ({ reason_id }) => reason_id !== payload
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
