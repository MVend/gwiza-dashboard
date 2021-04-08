import {
  GET_APPROVALS_SUCCESS,
  GET_APPROVALS_ERROR,
  GET_APPROVALS_START,
  CREATE_APPROVAL_START,
  CREATE_APPROVAL_ERROR,
  UPDATE_APPROVAL_SUCCESS,
  CREATE_APPROVAL_SUCCESS,
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
    case GET_APPROVALS_START:
      return {
        ...state,
        isLoading: true,
      };
    case GET_APPROVALS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        isLoaded: true,
        btnLoading: false,
        values: payload,
      };
    case GET_APPROVALS_ERROR:
      return {
        ...state,
        isLoading: false,
        isLoaded: false,
        btnLoading: false,
        error: payload,
      };
    case CREATE_APPROVAL_START:
      return {
        ...state,
        btnLoading: true,
      };
    case CREATE_APPROVAL_SUCCESS:
      const totalItems = !payload.approved
        ? state.values.totalItems - 1
        : state.values.totalItems + 1;

      return {
        ...state,
        isLoading: false,
        btnLoading: false,
        isLoaded: true,
        values: {
          ...state.values,
          totalItems,
          rows: [...state.values.rows, payload],
        },
      };
    case CREATE_APPROVAL_ERROR:
      return {
        ...state,
        isLoading: false,
        isLoaded: false,
        btnLoading: false,
        error: payload,
      };

    case UPDATE_APPROVAL_SUCCESS:
      return {
        ...state,
        isLoading: false,
        isLoaded: true,
        btnLoading: false,
        values: {
          ...state.values,
          rows: state.values.rows.map((value) =>
            value.user_id !== payload.user_id &&
            value.group_id !== payload.group_id &&
            value.approved !== false
              ? value
              : {}
          ),
        },
      };
    default:
      return state;
  }
};
