import {
  GET_GROUPS_SUCCESS,
  GET_GROUPS_ERROR,
  GET_GROUPS_START,
  CREATE_GROUP_START,
  CREATE_GROUP_SUCCESS,
  CREATE_GROUP_ERROR,
  DELETE_GROUP_SUCCESS,
  UPDATE_GROUP_SUCCESS,
  GET_ONE_GROUP_SUCCESS,
  GET_ONE_GROUP_START,
} from '../types';

const initialState = {
  isLoading: false,
  detailsLoading: false,
  isLoaded: false,
  btnLoading: false,
  oneGroup: {
    members: [],
    reasons: [],
  },
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
    case GET_GROUPS_START:
      return {
        ...state,
        isLoading: true,
      };
    case GET_ONE_GROUP_START:
      return {
        ...state,
        detailsLoading: true,
      };
    case GET_GROUPS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        isLoaded: true,
        btnLoading: false,
        values: payload,
      };
    case GET_ONE_GROUP_SUCCESS:
      return {
        ...state,
        isLoading: false,
        isLoaded: true,
        detailsLoading: false,
        oneGroup: payload,
      };
    case GET_GROUPS_ERROR:
      return {
        ...state,
        isLoading: false,
        isLoaded: false,
        btnLoading: false,
        error: payload,
      };
    case CREATE_GROUP_START:
      return {
        ...state,
        btnLoading: true,
      };
    case CREATE_GROUP_SUCCESS:
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
    case CREATE_GROUP_ERROR:
      return {
        ...state,
        isLoading: false,
        isLoaded: false,
        btnLoading: false,
        error: payload,
      };

    case UPDATE_GROUP_SUCCESS:
      return {
        ...state,
        isLoading: false,
        isLoaded: true,
        btnLoading: false,
        values: {
          ...state.values,
          rows: state.values.rows.map((value) =>
            value.group_id !== payload.group_id ? value : payload,
          ),
        },
      };
    case DELETE_GROUP_SUCCESS:
      const rows = state.values.rows.filter(({ group_id }) => group_id !== payload);
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
