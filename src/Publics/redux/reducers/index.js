import {combineReducers} from 'redux';

import book from './book';
import borrow from './borrow';
import user from './user';
import member from './member';

const appReducer = combineReducers({
  book,
  borrow,
  user,
  member
});

export default appReducer;
