import { toast } from "react-toastify";
import HttpRequest from "../../services/HttpRequest";
import creator from "./creator";
import { GET_DASHBOARD_STARTS, GET_DASHBOARD_SUCCESS } from "../types";

export const getDashboardData = () => async (dispatch) => {
  try {
    dispatch(creator(GET_DASHBOARD_STARTS));
    const res = await HttpRequest.get("/dashboard");
    dispatch(creator(GET_DASHBOARD_SUCCESS, res.data));
  } catch (e) {
    if (e.response && e.response.data) {
      return toast.error(e.response.data.error);
    }
    toast.error("Something went wrong");
  }
};
