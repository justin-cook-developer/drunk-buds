import { combineReducers } from 'redux';
import ui from './ui';
import auth from './auth';

const rootReducer = combineReducers({
  ui,
  auth,
});

export default rootReducer;
