import { toast } from "react-toastify";
import HttpRequest from "../../services/HttpRequest";
import creator from "./creator";
import {
  GET_GROUPS_SUCCESS,
  GET_GROUPS_ERROR,
  GET_GROUPS_START,
  CREATE_GROUP_START,
  CREATE_GROUP_ERROR,
  DELETE_GROUP_SUCCESS,
  UPDATE_GROUP_SUCCESS,
  GET_ONE_GROUP_SUCCESS,
  GET_ONE_GROUP_START,
  CREATE_GROUP_SUCCESS,
  CREATE_MEMBER_START,
  CREATE_MEMBER_ERROR,
  UPLOAD_MEMBERS_SUCCESS,
} from "../types";

export const createGroup = (data) => async (dispatch) => {
  try {
    dispatch(creator(CREATE_GROUP_START, true));
    const res = await HttpRequest.post("/groups", data);
    toast.success(res.message);
    dispatch(creator(CREATE_GROUP_SUCCESS, res.data));
  } catch (e) {
    if (e.response && e.response.data) {
      dispatch(creator(CREATE_GROUP_ERROR, e.response.data.error));
      return toast.error(e.response.data.error);
    }
  }
};

export const deleteGroup = (group_id) => async (dispatch) => {
  try {
    const res = await HttpRequest.delete(`/groups/${group_id}`);
    toast.success(res.message);
    dispatch(creator(DELETE_GROUP_SUCCESS, group_id));
  } catch (e) {
    if (e.response && e.response.data) {
      return toast.error(e.response.data.error);
    }
  }
};

export const findAll = (data) => async (dispatch) => {
  try {
    dispatch(creator(GET_GROUPS_START, true));
    const res = await HttpRequest.get(
      `/groups?page=${data.page}&size=${data.size}`
    );
    dispatch(creator(GET_GROUPS_SUCCESS, res.data));
  } catch (e) {
    if (e.response && e.response.data) {
      dispatch(creator(GET_GROUPS_ERROR, e.response.data.error));
      return toast.error(e.response.data.error);
    }
  }
};

export const search = (data) => async (dispatch) => {
  try {
    dispatch(creator(GET_GROUPS_START, true));
    const res = await HttpRequest.get(
      `/groups/search?searchHint=${data.searchHint}&page=${data.page}&size=${data.size}`
    );
    dispatch(creator(GET_GROUPS_SUCCESS, res.data));
  } catch (e) {
    if (e.response && e.response.data) {
      dispatch(creator(GET_GROUPS_ERROR, e.response.data.error));
      return toast.error(e.response.data.error);
    }
  }
};

export const findOne = (data) => async (dispatch) => {
  try {
    dispatch(creator(GET_ONE_GROUP_START, true));
    const res = await HttpRequest.get(`/groups/${data.group_id}`);
    dispatch(creator(GET_ONE_GROUP_SUCCESS, res.data));
  } catch (e) {
    if (e.response && e.response.data) {
      dispatch(creator(GET_GROUPS_ERROR, e.response.data.error));
      return toast.error(e.response.data.error);
    }
  }
};

export const updateGroup = (data, group_id) => async (dispatch) => {
  try {
    dispatch(creator(CREATE_GROUP_START));
    const res = await HttpRequest.put(`/groups/${group_id}`, data);
    toast.success(res.message);
    dispatch(creator(UPDATE_GROUP_SUCCESS, res.data));
  } catch (e) {
    if (e.response && e.response.data) {
      dispatch(creator(CREATE_GROUP_ERROR, e.response.data.error));
      return toast.error(e.response.data.error);
    }
  }
};

export const upload = (data) => async (dispatch) => {
  try {
    dispatch(creator(CREATE_MEMBER_START));
    const response = await HttpRequest.post(`/groups/upload/`, data);
    toast.success(response.message);

    const res = await HttpRequest.get(`/groups?page=0&size=1000`);
    dispatch(creator(GET_GROUPS_SUCCESS, res.data));
    dispatch(creator(UPLOAD_MEMBERS_SUCCESS, []));
  } catch (e) {
    if (e.response && e.response.data) {
      dispatch(creator(CREATE_MEMBER_ERROR, e.response.data.error));
      return toast.error(e.response.data.error);
    }
  }
};
