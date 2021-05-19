import * as types from '../types';

const initialState = {
  file: {},
  logs: {},
  error: null,
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case types.FETCH_LOGS:
      return {
        ...state,
        logs: {
          isLoading: payload?.isLoading || false,
          data: payload?.data || [],
        },
      };
    case types.FETCH_USER_LOG_FILE:
      return {
        ...state,
        file: {
          isLoading: payload?.isLoading || false,
          data: payload?.data || '',
        },
      };
    default:
      return state;
  }
};
