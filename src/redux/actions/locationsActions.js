import { toast } from "react-toastify";
import HttpRequest from "../../services/HttpRequest";
import creator from "./creator";
import {
  FIND_LOCATION_START,
  FIND_PROVINCE_SUCCESS,
  FIND_DISTRICT_SUCCESS,
  FIND_SECTOR_SUCCESS,
  FIND_CELL_SUCCESS,
  FIND_VILLAGE_SUCCESS,
  FIND_LOCATION_ERROR,
} from "../types";

export const findProvinces = () => async (dispatch) => {
  try {
    dispatch(creator(FIND_LOCATION_START));
    const res = await HttpRequest.get("/locations/provinces");
    dispatch(creator(FIND_PROVINCE_SUCCESS, res.data));
  } catch (e) {
    if (e.response && e.response.data) {
      dispatch(creator(FIND_LOCATION_ERROR, e.response.data.error));
      return toast.error(e.response.data.error);
    }
  }
};

export const findDistricts = (data) => async (dispatch) => {
  try {
    dispatch(creator(FIND_LOCATION_START));
    const res = await HttpRequest.get(
      `/locations/districts/${data.province_id}`
    );
    dispatch(creator(FIND_DISTRICT_SUCCESS, res.data));
  } catch (e) {
    if (e.response && e.response.data) {
      dispatch(creator(FIND_LOCATION_ERROR, e.response.data.error));
      return toast.error(e.response.data.error);
    }
  }
};

export const findSectors = (data) => async (dispatch) => {
  try {
    dispatch(creator(FIND_LOCATION_START));
    const res = await HttpRequest.get(`/locations/sectors/${data.district_id}`);
    dispatch(creator(FIND_SECTOR_SUCCESS, res.data));
  } catch (e) {
    if (e.response && e.response.data) {
      dispatch(creator(FIND_LOCATION_ERROR, e.response.data.error));
      return toast.error(e.response.data.error);
    }
  }
};

export const findCells = (data) => async (dispatch) => {
  try {
    dispatch(creator(FIND_LOCATION_START));
    const res = await HttpRequest.get(`/locations/cells/${data.sector_id}`);
    dispatch(creator(FIND_CELL_SUCCESS, res.data));
  } catch (e) {
    if (e.response && e.response.data) {
      dispatch(creator(FIND_LOCATION_ERROR, e.response.data.error));
      return toast.error(e.response.data.error);
    }
  }
};

export const findVillages = (data) => async (dispatch) => {
  try {
    dispatch(creator(FIND_LOCATION_START));
    const res = await HttpRequest.get(`/locations/villages/${data.cell_id}`);
    dispatch(creator(FIND_VILLAGE_SUCCESS, res.data));
  } catch (e) {
    if (e.response && e.response.data) {
      dispatch(creator(FIND_LOCATION_ERROR, e.response.data.error));
      return toast.error(e.response.data.error);
    }
  }
};
