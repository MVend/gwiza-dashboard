import {
  GET_MEMBERS_SUCCESS,
  GET_MEMBERS_ERROR,
  GET_MEMBERS_START,
  CREATE_MEMBER_START,
  CREATE_MEMBER_SUCCESS,
  CREATE_MEMBER_ERROR,
  DELETE_MEMBER_SUCCESS,
  UPDATE_MEMBER_SUCCESS,
  UPLOAD_MEMBERS_SUCCESS,
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
    case GET_MEMBERS_START:
      return {
        ...state,
        isLoading: true,
      };
    case GET_MEMBERS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        isLoaded: true,
        btnLoading: false,
        values: payload,
      };
    case GET_MEMBERS_ERROR:
      return {
        ...state,
        isLoading: false,
        isLoaded: false,
        btnLoading: false,
        error: payload,
      };
    case CREATE_MEMBER_START:
      return {
        ...state,
        btnLoading: true,
      };
    case CREATE_MEMBER_SUCCESS:
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
    case CREATE_MEMBER_ERROR:
      return {
        ...state,
        isLoading: false,
        isLoaded: false,
        btnLoading: false,
        error: payload,
      };

    case UPDATE_MEMBER_SUCCESS:
      return {
        ...state,
        isLoading: false,
        isLoaded: true,
        btnLoading: false,
        values: {
          ...state.values,
          rows: state.values.rows.map((value) =>
            +value.member_id !== +payload.member_id ? value : payload
          ),
        },
      };

    case UPLOAD_MEMBERS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        btnLoading: false,
        isLoaded: true,
        values: {
          ...state.values,
          totalItems: state.values.totalItems + payload.length,
          rows: [...state.values.rows, ...payload],
        },
      };
    case DELETE_MEMBER_SUCCESS:
      const rows = state.values.rows.filter(
        ({ member_id }) => member_id !== payload
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
