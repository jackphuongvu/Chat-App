import { USER_START_AUTHORIZING, USER_AUTHORIZED,
  LOGIN,
  GET_AUTH_USER,
  LOGOUT
} from '../actions/actionNames';
const initializeState = {
  isLoggingIn : false,
  isSigningOut : false,
  isAuthenticated : false, // after get access Token successfully.
  isPendingUser : false,
  accessToken : null,
  hasInitialUser : false, // global variable check current user.
  user : {},
  error : '',
  // ------------------------------
  name : '',
  avatar : 'https://abs.twimg.com/sticky/default_profile_images/default_profile_3_400x400.png',
  // authorizing : false,
  // authorized : false
}; // initialize User.
const auth = (state = initializeState, action) => {
  switch(action.type) {
    /* LOGIN */
    case LOGIN.PENDING:
      return Object.assign({}, state, {
        isLoggingIn : true,
        isAuthenticated : false
      });
    case LOGIN.SUCCESS:
      return Object.assign({}, state, {
        isLoggingIn : false,
        isAuthenticated : true,
        accessToken : action.payload
      });
    case LOGIN.ERROR:
      return Object.assign({}, state, {
        isLoggingIn : false,
        isAuthenticated : false,
        error : action.payload
      });
    /* REGISTER */

    /* GET_AUTH_USER */
    case GET_AUTH_USER.PENDING:
      return Object.assign({}, state, {
        isPendingUser : true
      });
    case GET_AUTH_USER.SUCCESS:
      return Object.assign({}, state, {
        isPendingUser : false,
        user : action.payload,
        hasInitialUser : true
        // TODO: Logout => hasInitialUser : false
      });
    case GET_AUTH_USER.ERROR:
      return Object.assign({}, state, {
        isPendingUser : false,
        error : action.payload
      });
    /* LOGOUT */
    case LOGOUT.PENDING:
      return Object.assign({}, state, {
        isSigningOut : true
      });
    case LOGOUT.SUCCESS:
      // return Object.assign({}, initializeState, {
      //   isSigningOut : false,
      //   hasInitialUser : false
      // });
      return initializeState;
    case LOGOUT.ERROR:
      return Object.assign({}, state, {
        isSigningOut : false,
        error : action.payload
      });

    /* Other actions */


    default:
      return state;
  }
};
export default auth;
