import {
  FIND_LOCATION_START,
  FIND_PROVINCE_SUCCESS,
  FIND_DISTRICT_SUCCESS,
  FIND_SECTOR_SUCCESS,
  FIND_CELL_SUCCESS,
  FIND_VILLAGE_SUCCESS,
  FIND_LOCATION_ERROR,
} from '../types';

const initialState = {
  isLoading: false,
  isLoaded: false,
  provinces: [],
  districts: [],
  sectors: [],
  cells: [],
  villages: [],
  error: null,
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case FIND_LOCATION_START:
      return {
        ...state,
        isLoading: true,
      };
    case FIND_PROVINCE_SUCCESS:
      return {
        ...state,
        isLoading: false,
        isLoaded: true,
        provinces: payload,
      };
    case FIND_DISTRICT_SUCCESS:
      return {
        ...state,
        isLoading: false,
        isLoaded: true,
        districts: payload,
      };
    case FIND_SECTOR_SUCCESS:
      return {
        ...state,
        isLoading: false,
        isLoaded: true,
        sectors: payload,
      };
    case FIND_CELL_SUCCESS:
      return {
        ...state,
        isLoading: false,
        isLoaded: true,
        cells: payload,
      };
    case FIND_VILLAGE_SUCCESS:
      return {
        ...state,
        isLoading: false,
        isLoaded: true,
        villages: payload,
      };
    case FIND_LOCATION_ERROR:
      return {
        ...state,
        isLoading: false,
        isLoaded: false,
        error: payload,
      };
    default:
      return state;
  }
};
