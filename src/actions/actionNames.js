import { createActionSet } from '../utils/action-helper';

// export const ADD_MESSAGE = 'ADD_MESSAGE';
// export const SEND_MESSAGE = 'SEND_MESSAGE';
export const USER_START_AUTHORIZING = 'USER_START_AUTHORIZING';
export const USER_AUTHORIZED = 'USER_AUTHORIZED';
export const LOGIN = createActionSet('LOGIN');
export const GET_AUTH_USER = createActionSet('GET_AUTH_USER');
export const LOGOUT = createActionSet('LOGOUT');
// export const START_FETCHING_MESSAGES = 'START_FETCHING_MESSAGES';