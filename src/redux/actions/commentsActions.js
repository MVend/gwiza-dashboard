import { toast } from "react-toastify";
import HttpRequest from "../../services/HttpRequest";
import creator from "./creator";
import {
  GET_COMMENTS_SUCCESS,
  GET_COMMENTS_ERROR,
  GET_COMMENTS_START,
  CREATE_COMMENT_START,
  CREATE_COMMENT_SUCCESS,
  CREATE_COMMENT_ERROR,
} from ".";

export const createComment = (data) => async (dispatch) => {
  try {
    dispatch(creator(CREATE_COMMENT_START, true));
    const res = await HttpRequest.post("/comments", data);
    toast.success(res.message);
    dispatch(creator(CREATE_COMMENT_SUCCESS, res.data));
  } catch (e) {
    if (e.response && e.response.data) {
      dispatch(creator(CREATE_COMMENT_ERROR, e.response.data.error));
      return toast.error(e.response.data.error);
    }
  }
};

export const findAll = (data) => async (dispatch) => {
  try {
    dispatch(creator(GET_COMMENTS_START, true));
    const res = await HttpRequest.get(
      `/comments?group_id=${data.group_id}&page=${data.page}&size=${data.size}`
    );
    dispatch(creator(GET_COMMENTS_SUCCESS, res.data));
  } catch (e) {
    if (e.response && e.response.data) {
      dispatch(creator(GET_COMMENTS_ERROR, e.response.data.error));
      return toast.error(e.response.data.error);
    }
  }
};
