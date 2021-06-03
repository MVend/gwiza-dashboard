import { combineReducers } from 'redux';
import auth from './authReducer';
import groups from './groupsReducer';
import members from './membersReducer';
import reasons from './reasonsReducer';
import locations from './locationsReducer';
import comments from './commentsReducer';
import approvals from './approvalsReducer';
import admins from './adminsReducer';
import dashboard from './dashboardReducer';
import migrations from './migrationsReducer';
import logs from './logsReducer';
import support from './supportReducer';

const rootReducer = combineReducers({
  auth,
  groups,
  members,
  reasons,
  locations,
  comments,
  approvals,
  admins,
  dashboard,
  migrations,
  logs,
  support,
});

export default rootReducer;
