import {combineReducers} from 'redux';

import book from './book';
import borrow from './borrow';
import user from './user';
import member from './member';
import pending from './pending'

const appReducer = combineReducers({
  book,
  borrow,
  user,
  member,
  pending
});

export default appReducer;
