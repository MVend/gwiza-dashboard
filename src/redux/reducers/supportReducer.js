import * as types from '../types';

const initialState = {
  balances: {},
  groups: {},
  groupBalances: {},
  error: null,
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case types.FETCH_SUPPORT_GROUPS:
      return {
        ...state,
        groups: {
          isLoading: payload?.isLoading || false,
          data: payload?.data || [],
        },
      };
    case types.FETCH_SUPPORT_GROUP_BALANCES:
      return {
        ...state,
        balances: {
          isLoading: payload?.isLoading || false,
          data: payload?.data || [],
        },
      };
    case types.UPDATE_GROUP_BALANCES:
      return {
        ...state,
        groupBalances: {
          isLoading: payload?.isLoading || false,
          data: payload?.data || [],
        },
      };
    case types.FETCH_GROUP_LOAN_REQUESTS:
      return {
        ...state,
        loanRequests: {
          isLoading: payload?.isLoading || false,
          data: payload?.data || [],
        },
      };
    default:
      return state;
  }
};
