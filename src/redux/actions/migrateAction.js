import axios from "axios";
import { toast } from "react-toastify";
import AuthToken from "../../utils/authToken";
import { MIGRATION_START, MIGRATION_FAILED } from "../types";
import creator from "./creator";

export const migrateAction = (method, endpoint, actionType, data) => async (
  dispatch
) => {
  try {
    const baseUrl = "http://localhost:9000/api/migrate";
    axios.defaults.headers["x-auth-token"] = AuthToken.getToken();
    dispatch(creator(MIGRATION_START));
    const res = await axios[method](baseUrl + endpoint, data);
    // toast.success(res?.data?.message);
    dispatch(creator(actionType, res?.data));
  } catch (e) {
    if (e.response && e.response.data) {
      dispatch(creator(MIGRATION_FAILED, { error: e.response.data }));
      dispatch(creator(actionType, { error: e.response.data.error }));
      return toast.error(e.response.data.error);
    }
  }
};
