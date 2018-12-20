import { NavigationActions } from 'react-navigation';

import Root from '../navigation/Root';

/*First*/
const initialState = Root.router.getStateForAction(NavigationActions.init());

/*Second*/
// const initialState = Root.router.getStateForAction(NavigationActions.navigate({ routeName: 'AuthLoadingScreen' }));

/*Third one*/
/*use new way to get initialState of all actions*/
const firstAction = Root.router.getActionForPathAndParams('AuthLoadingScreen');
const tempNavState = Root.router.getStateForAction(firstAction);

const initialNavState = Root.router.getStateForAction(
  tempNavState
);
// ---------------------------------------------------------------

export default (state = initialState, action) => {
  // let nextState;
  // switch(action.type) {
  //   case 'LoginScreen':
  //     nextState = Root.router.getStateForAction(
  //       NavigationActions.navigate({ routeName: 'LoginScreen' }),
  //       state
  //     );
  //     break;
  //   case 'ListTopic':
  //     nextState = Root.router.getStateForAction(
  //       NavigationActions.navigate({ routeName: 'ListTopic' }),
  //       state
  //     );
  //     break;
  //   case 'Chat':
  //     nextState = Root.router.getStateForAction(
  //       NavigationActions.navigate({ routeName: 'Chat' }),
  //       state
  //     );
  //     break;
  //   default : break
  // }

  // return Navigator.router.getStateForAction(action, state)
  let newState = Root.router.getStateForAction(action, state);
  return newState || state;
};
// ======================================
// const AppNavigator = createStackNavigator(AppRouteConfigs);

// const initialState = AppNavigator.router.getStateForAction(AppNavigator.router.getActionForPathAndParams('Unauthorized'));

// const navReducer = (state = initialState, action) => {
//   const nextState = AppNavigator.router.getStateForAction(action, state);

//   // Simply return the original `state` if `nextState` is null or undefined.
//   return nextState || state;
// };
