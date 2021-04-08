import { toast } from "react-toastify";
import HttpRequest from "../../services/HttpRequest";
import creator from "./creator";
import {
  CREATE_MEMBER_START,
  CREATE_MEMBER_ERROR,
  CREATE_MEMBER_SUCCESS,
  GET_MEMBERS_SUCCESS,
  GET_MEMBERS_ERROR,
  GET_MEMBERS_START,
  GET_ONE_MEMBER_SUCCESS,
  DELETE_MEMBER_SUCCESS,
  UPDATE_MEMBER_SUCCESS,
  UPLOAD_MEMBERS_SUCCESS,
} from "../types";

export const findAll = (data) => async (dispatch) => {
  try {
    dispatch(creator(GET_MEMBERS_START));
    const res = await HttpRequest.get(
      `/members?group_id=${data.group_id}&page=${data.page}&size=${data.size}`
    );
    dispatch(creator(GET_MEMBERS_SUCCESS, res.data));
  } catch (e) {
    if (e.response && e.response.data) {
      dispatch(creator(GET_MEMBERS_ERROR, e.response.data.error));
      return toast.error(e.response.data.error);
    }
  }
};

export const findOne = (data) => async (dispatch) => {
  try {
    dispatch(creator(GET_MEMBERS_START));
    const res = await HttpRequest.get(`/members/${data.member_id}`);
    dispatch(creator(GET_ONE_MEMBER_SUCCESS, res.data));
  } catch (e) {
    if (e.response && e.response.data) {
      dispatch(creator(GET_MEMBERS_ERROR, e.response.data.error));
      return toast.error(e.response.data.error);
    }
  }
};

export const createMember = (data) => async (dispatch) => {
  try {
    dispatch(creator(CREATE_MEMBER_START));
    const res = await HttpRequest.post("/members", data);
    toast.success(res.message);
    dispatch(creator(CREATE_MEMBER_SUCCESS, res.data));
  } catch (e) {
    if (e.response && e.response.data) {
      dispatch(creator(CREATE_MEMBER_ERROR, e.response.data.error));
      return toast.error(e.response.data.error);
    }
  }
};

export const deleteMember = (member_id) => async (dispatch) => {
  try {
    const res = await HttpRequest.delete(`/members/${member_id}`);
    toast.success(res.message);
    dispatch(creator(DELETE_MEMBER_SUCCESS, member_id));
  } catch (e) {
    if (e.response && e.response.data) {
      return toast.error(e.response.data.error);
    }
  }
};

export const updateMember = (data, member_id) => async (dispatch) => {
  try {
    dispatch(creator(CREATE_MEMBER_START));
    const res = await HttpRequest.put(`/members/${member_id}`, data);
    toast.success(res.message);
    dispatch(creator(UPDATE_MEMBER_SUCCESS, res.data));
  } catch (e) {
    if (e.response && e.response.data) {
      dispatch(creator(CREATE_MEMBER_ERROR, e.response.data.error));
      return toast.error(e.response.data.error);
    }
  }
};

export const search = (data) => async (dispatch) => {
  try {
    dispatch(creator(GET_MEMBERS_START));
    const res = await HttpRequest.get(
      `/members/search?group_id=${data.group_id}&searchHint=${data.searchHint}&page=${data.page}&size=${data.size}`
    );
    dispatch(creator(GET_MEMBERS_SUCCESS, res.data));
  } catch (e) {
    if (e.response && e.response.data) {
      dispatch(creator(GET_MEMBERS_ERROR, e.response.data.error));
      return toast.error(e.response.data.error);
    }
  }
};

export const upload = (data, group_id) => async (dispatch) => {
  try {
    dispatch(creator(CREATE_MEMBER_START));
    const res = await HttpRequest.post(
      `/members/upload/${group_id}`,
      data
    );
    toast.success(res.message);
    dispatch(creator(UPLOAD_MEMBERS_SUCCESS, res.data));
  } catch (e) {
    if (e.response && e.response.data) {
      dispatch(creator(CREATE_MEMBER_ERROR, e.response.data.error));
      return toast.error(e.response.data.error);
    }
  }
};
