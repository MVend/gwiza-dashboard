import { toast } from "react-toastify";
import HttpRequest from "../../services/HttpRequest";
import creator from "./creator";
import {
  GET_REASONS_SUCCESS,
  GET_REASONS_ERROR,
  GET_REASONS_START,
  CREATE_REASON_START,
  CREATE_REASON_ERROR,
  DELETE_REASON_SUCCESS,
  UPDATE_REASON_SUCCESS,
  GET_ONE_REASON_SUCCESS,
  GET_ONE_REASON_START,
  CREATE_REASON_SUCCESS,
} from ".";

export const createReason = (data) => async (dispatch) => {
  try {
    dispatch(creator(CREATE_REASON_START, true));
    const res = await HttpRequest.post("/reasons", data);
    toast.success(res.message);
    dispatch(creator(CREATE_REASON_SUCCESS, res.data));
  } catch (e) {
    if (e.response && e.response.data) {
      dispatch(creator(CREATE_REASON_ERROR, e.response.data.error));
      return toast.error(e.response.data.error);
    }
  }
};

export const deleteReason = (reason_id) => async (dispatch) => {
  try {
    const res = await HttpRequest.delete(`/reasons/${reason_id}`);
    toast.success(res.message);
    dispatch(creator(DELETE_REASON_SUCCESS, reason_id));
  } catch (e) {
    if (e.response && e.response.data) {
      return toast.error(e.response.data.error);
    }
  }
};

export const findAll = (data) => async (dispatch) => {
  try {
    dispatch(creator(GET_REASONS_START, true));
    const res = await HttpRequest.get(
      `/reasons?group_id=${data.group_id}&page=${data.page}&size=${data.size}`
    );
    dispatch(creator(GET_REASONS_SUCCESS, res.data));
  } catch (e) {
    if (e.response && e.response.data) {
      dispatch(creator(GET_REASONS_ERROR, e.response.data.error));
      return toast.error(e.response.data.error);
    }
  }
};
export const findOne = (data) => async (dispatch) => {
  try {
    dispatch(creator(GET_ONE_REASON_START, true));
    const res = await HttpRequest.get(`/reasons/${data.reason_id}`);
    dispatch(creator(GET_ONE_REASON_SUCCESS, res.data));
  } catch (e) {
    if (e.response && e.response.data) {
      dispatch(creator(GET_REASONS_ERROR, e.response.data.error));
      return toast.error(e.response.data.error);
    }
  }
};

export const updateReason = (data, reason_id) => async (dispatch) => {
  try {
    dispatch(creator(CREATE_REASON_START));
    const res = await HttpRequest.put(`/reasons/${reason_id}`, data);
    toast.success(res.message);
    dispatch(creator(UPDATE_REASON_SUCCESS, res.data));
  } catch (e) {
    if (e.response && e.response.data) {
      dispatch(creator(CREATE_REASON_ERROR, e.response.data.error));
      return toast.error(e.response.data.error);
    }
  }
};
