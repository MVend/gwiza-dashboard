import { GET_DASHBOARD_STARTS, GET_DASHBOARD_SUCCESS } from "../actions";

const initialState = {
  isLoading: false,
  values: {},
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case GET_DASHBOARD_STARTS:
      return {
        ...state,
        isLoading: true,
      };
    case GET_DASHBOARD_SUCCESS:
      return {
        ...state,
        isLoading: false,
        values: payload,
      };
    default:
      return state;
  }
};
