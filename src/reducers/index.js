import { combineReducers } from 'redux';
import ui from './ui';
import auth from './auth';
import locations from './locations';
import groups from './groups';

const rootReducer = combineReducers({
  ui,
  auth,
  locations,
  groups,
});

export default rootReducer;
