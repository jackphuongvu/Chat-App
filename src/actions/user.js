import {AsyncStorage} from 'react-native';
import {
  // SEND_MESSAGE, ADD_MESSAGE, START_FETCHING_MESSAGES
  LOGIN,
  GET_AUTH_USER,
  LOGOUT
} from './actionNames';
import axios from 'axios';
import {messages, urls} from '../config'

/**
 * Login Facebook
 */
export const fetchUserFacebook = async (res) => {
  const response = await fetch(urls.USER.LOGIN_FACEBOOK, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(res),
  });
  // console.log('jack check login Facebook')
  // console.log(response.json())
  return response.json();
}

export const loginFacebook = (res) => {
  return (dispatch) => {
    dispatch({
      type : LOGIN.PENDING
    })
    return new Promise((resolve, reject) => {
      fetchUserFacebook(res)
        .then(async (result) => {
          console.log(result)
          dispatch({
            type: LOGIN.SUCCESS,
            // payload: result // user
            // update user global User
          });
          dispatch({
            type: GET_AUTH_USER.SUCCESS,
            payload: result
          });
          // AsyncStorage.setItem('englishChatAppUser', result);
          // console.log( result )
          resolve(result)
        })
        .catch((error) => {
          dispatch({
            type: LOGIN.ERROR,
            payload: error
          });
          console.log( error )
          reject(error)
        });
    });
  }
}

/**
 * Login Google
 */
export const fetchUserGoogle = async (res) => {
  const response = await fetch(urls.USER.LOGIN_GOOGLE, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(res),
  });
  return response.json();
}

export const loginGoogle = (res) => {
  return (dispatch) => {
    dispatch({
      type : LOGIN.PENDING
    })
    return new Promise((resolve, reject) => {
      fetchUserGoogle(res)
        .then(async (result) => {
          dispatch({
            type: LOGIN.SUCCESS
          });
          dispatch({
            type: GET_AUTH_USER.SUCCESS,
            payload: result // UPDATE: result.user
          });
          // await AsyncStorage.setItem('accessToken', result.access_token);
          // AsyncStorage.setItem('englishChatAppUser', result);
          resolve(result)
        })
        .catch((error) => {
          dispatch({
            type: LOGIN.ERROR,
            payload: error
          });
          console.log( error )
          reject(error)
        });
    });
  }
}

export const loginDefault = (email, password) => {
  return (dispatch) => {
    dispatch({
      type: LOGIN.PENDING,
    });
    return new Promise((resolve, reject) => {
      fetchAccessToken(email, password)
        .then(async (result) => {
          // Check error with Login Fail
          console.log(result)
          if (result.message) {
            dispatch({
              type: LOGIN.ERROR,
              payload: result.message
            });
            // resolve(false);
          } else {
            dispatch({
              type: LOGIN.SUCCESS,
              payload: result.access_token
            });
            await AsyncStorage.setItem('accessToken', result.access_token);
            // resolve(true);
          }
          resolve(result)
        })
        .catch((error) => {
          let errorMessage = error.message;
          if (error.message === 'Network request failed') {
            errorMessage = messages.LOGIN.NETWORK_FAIL.text
          }
          dispatch({
            type: LOGIN.ERROR,
            payload: errorMessage
          });
          reject(errorMessage);
        });
    });
  }
};

export const getUser = () => {
  return (dispatch, getState) => {
    // console.log('getState inside getUser');
    dispatch({
      type: GET_AUTH_USER.PENDING
    });
    return fetchAuthUser(getState().auth.accessToken)
      .then((result) => {
        if (result.message) {
          dispatch({
            type: GET_AUTH_USER.ERROR,
            payload: result.message
          });
        } else {
          dispatch({
            type: GET_AUTH_USER.SUCCESS,
            payload: result
          });
          // AsyncStorage.setItem('englishChatAppUser', result);
        }
      })
      .catch((error) => {
        dispatch({
          type: GET_AUTH_USER.ERROR,
          payload: error
        });
      });
  }
}


export const fetchAuthUser = async accessToken => {
  const response = await fetch(urls.USER.GET, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + accessToken
    }
  });
  return response.json();
}


// fetch access token
export const fetchAccessToken = async (email, password) => {
  // GET request for remote image
  axios({
    method:'post',
    url:urls.USER.LOGIN,
    data: {
      firstName: 'Fred',
      lastName: 'Flintstone'
    }
    // responseType:'stream'
  })
    .then(function (response) {
      response.data.pipe(fs.createWriteStream('ada_lovelace.jpg'))
    });

  const response = await fetch(urls.USER.LOGIN, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      email: email,
      password: password
    }),
  })
  return response.json();
}

export const signOut = () => {
  return dispatch => {
    dispatch({
      type: LOGOUT.PENDING
    });
    return AsyncStorage.clear()
      .then((() => {
        dispatch({
          type: LOGOUT.SUCCESS
        });
      }))
      .catch((error) => {
        dispatch({
          type: LOGOUT.ERROR,
          payload: error
        });
      });
  }
}
