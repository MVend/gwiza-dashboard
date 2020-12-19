import { combineReducers } from "redux";
import authReducer from "./authReducer";
import groups from "./groupsReducer";
import members from "./membersReducer";
import reasons from "./reasonsReducer";
import locations from "./locationsReducer";
import comments from "./commentsReducer";
import approvals from "./approvalsReducer";
import admins from "./adminsReducer";
import dashboard from "./dashboardReducer";

const rootReducer = combineReducers({
  auth: authReducer,
  groups,
  members,
  reasons,
  locations,
  comments,
  approvals,
  admins,
  dashboard,
});

export default rootReducer;
