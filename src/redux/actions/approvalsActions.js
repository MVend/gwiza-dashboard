import { toast } from "react-toastify";
import HttpRequest from "../../services/HttpRequest";
import creator from "./creator";
import {
  GET_APPROVALS_SUCCESS,
  GET_APPROVALS_ERROR,
  GET_APPROVALS_START,
  CREATE_APPROVAL_START,
  CREATE_APPROVAL_ERROR,
  UPDATE_APPROVAL_SUCCESS,
  CREATE_APPROVAL_SUCCESS,
} from ".";

export const create = (data) => async (dispatch) => {
  try {
    dispatch(creator(CREATE_APPROVAL_START, true));
    const res = await HttpRequest.post("/approvals", data);
    const msg = !res.data.approved
      ? "Group disapproved successfully"
      : "Group approved successfully";
    toast.success(msg);
    dispatch(creator(CREATE_APPROVAL_SUCCESS, res.data));
  } catch (e) {
    if (e.response && e.response.data) {
      dispatch(creator(CREATE_APPROVAL_ERROR, e.response.data.error));
      return toast.error(e.response.data.error);
    }
  }
};

export const findAll = (data) => async (dispatch) => {
  try {
    dispatch(creator(GET_APPROVALS_START, true));
    const res = await HttpRequest.get(
      `/approvals?group_id=${data.group_id}&page=0&size=1000`
    );
    dispatch(creator(GET_APPROVALS_SUCCESS, res.data));
  } catch (e) {
    if (e.response && e.response.data) {
      dispatch(creator(GET_APPROVALS_ERROR, e.response.data.error));
      return toast.error(e.response.data.error);
    }
  }
};

export const update = (data) => async (dispatch) => {
  try {
    dispatch(creator(CREATE_APPROVAL_START));
    const res = await HttpRequest.put(`/approvals/0`, data);
    toast.success(res.message);
    dispatch(creator(UPDATE_APPROVAL_SUCCESS, res.data));
  } catch (e) {
    if (e.response && e.response.data) {
      dispatch(creator(CREATE_APPROVAL_ERROR, e.response.data.error));
      return toast.error(e.response.data.error);
    }
  }
};
