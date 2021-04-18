import { toast } from "react-toastify";
import HttpRequest from "../../services/HttpRequest";
import creator from "./creator";
import {
  CREATE_ADMIN_START,
  CREATE_ADMIN_ERROR,
  CREATE_ADMIN_SUCCESS,
  GET_ADMINS_SUCCESS,
  GET_ADMINS_ERROR,
  GET_ADMINS_START,
  DELETE_ADMIN_SUCCESS,
} from "../types";

export const findAll = (data) => async (dispatch) => {
  try {
    dispatch(creator(GET_ADMINS_START));
    const res = await HttpRequest.get(
      `/admins?group_id=${data.group_id}&page=${data.page}&size=${data.size}`
    );
    dispatch(creator(GET_ADMINS_SUCCESS, res.data));
  } catch (e) {
    if (e.response && e.response.data) {
      dispatch(creator(GET_ADMINS_ERROR, e.response.data.error));
      return toast.error(e.response.data.error);
    }
  }
};

export const create = (data) => async (dispatch) => {
  try {
    dispatch(creator(CREATE_ADMIN_START));
    const res = await HttpRequest.post("/admins", data.payload);
    toast.success(res.message);
    data.id = res.data.id;
    dispatch(creator(CREATE_ADMIN_SUCCESS, data));
  } catch (e) {
    if (e.response && e.response.data) {
      dispatch(creator(CREATE_ADMIN_ERROR, e.response.data.error));
      return toast.error(e.response.data.error);
    }
  }
};

export const remove = (admin_id) => async (dispatch) => {
  try {
    const res = await HttpRequest.delete(`/admins/${admin_id}`);
    toast.success(res.message);
    dispatch(creator(DELETE_ADMIN_SUCCESS, admin_id));
  } catch (e) {
    if (e.response && e.response.data) {
      return toast.error(e.response.data.error);
    }
  }
};
