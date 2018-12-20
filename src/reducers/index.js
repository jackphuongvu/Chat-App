import { createNavigationReducer } from 'react-navigation-redux-helpers';
// import Root from '../navigation/Root';

import auth from './auth';
// import meta from './meta';
// import messages from './messages';
import navigation from './navigation';
import question from './question';

import { combineReducers } from 'redux';

// const navReducer = createNavigationReducer(Root);

// console.log(navigation)
// console.log(auth)
// console.log(question)

const rootReducer = combineReducers({
//   messages,
//   meta,
  nav : navigation,
  auth,
  question
});
export default rootReducer;
