import { combineReducers } from 'redux';
import ui from './ui';
import auth from './auth';
import groups from './groups';

const rootReducer = combineReducers({
  ui,
  auth,
  groups,
});

export default rootReducer;
