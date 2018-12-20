import {GET_MESSAGES, SUBMIT_ANSWER_TO_QUESTION,
  GET_ANSWER_QUESTION,
  GET_QUESTIONS_FROM_TOPIC,
  UPDATE_ANSWER
} from './type';
import {urls} from '../../config';

import queryString from 'query-string'

/* Submit answers to a question */
export const submitAnswerToQuestion = async ({user_id, question_id, answer_text}) => {
  const response = await fetch(urls.ANSWER.POST, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      user_id: user_id,
      question_id: question_id,
      answer_text : answer_text
    })
  });
  return response.json();
}

export const sendMessage = (question_id, answer_text) => {
  return (dispatch, getState) => {
    dispatch({
      type : SUBMIT_ANSWER_TO_QUESTION.PENDING
    });
    const { id } = getState().auth.user;
    return new Promise((resolve, reject) => {
      submitAnswerToQuestion({
        user_id : id,
        question_id : question_id,
        answer_text : answer_text
      })
        .then((result) => {
          // Dispatch successfully.
          dispatch({
            type : SUBMIT_ANSWER_TO_QUESTION.SUCCESS,
            // payload : result
          });
          resolve(result)
        })
        .catch((error) => {
          // dispatch error
          dispatch({
            type : SUBMIT_ANSWER_TO_QUESTION.ERROR,
            payload : error
          });
          reject(error)
        });
    })
  }
}
/* END: Submit answers to a question */

/* Update message */
// jack doing
export const fetchUpdate = async ({answer_id, answer_text}) => {
  const response = await fetch(urls.ANSWER.PUT(answer_id), {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      // answer_id : answer_id,
      answer_text : answer_text
    })
  });
  console.log( urls.ANSWER.PUT(answer_id) )
  return response.json();
}

export const updateMessage = (answer_id, answer_text) => {
  // AnswerID
  return dispatch => {
    dispatch({
      type : UPDATE_ANSWER.PENDING
    })
    return new Promise((resolve, reject) => {
      fetchUpdate({
        answer_id : answer_id,
        answer_text : answer_text
      })
        .then((result) => {
          console.log(result)
          // Update successfully.
          dispatch({
            type : UPDATE_ANSWER.SUCCESS,
            // payload : result
          });
          resolve(result)
        })
        .catch((error) => {
          dispatch({
            type : UPDATE_ANSWER.ERROR,
            payload : error
          })
          reject(error)
        })
    })
  }
}

// TODO: Jack: doing later.
export const fetchAnswerOfQuestion = async ({question_id, user_id}) => {
  if (user_id) {
    let queryString = queryString.stringify({
      user_id : user_id
    })
  }

  const response = await fetch(`${urls.QUESTION.GET_ANSWERS(question_id)}?${queryString}`);
  return response.json();
}

// get list of Answers in a Questions
export const getAnswerFromQuestion = (question_id) => {
  return (dispatch, getState) => {
    const { id } = getState().auth.user; // TODO
    dispatch({
      type : GET_ANSWER_QUESTION.PENDING
    });
    return new Promise((resolve, reject) => {
      fetchAnswerOfQuestion({
        question_id : question_id
      })
        .then((result) => {
          console.log(result)
          dispatch({
            type : GET_ANSWER_QUESTION.SUCCESS,
            // payload : result
          });
          resolve(result);
        })
        .catch((error) => {
          dispatch({
            type : GET_ANSWER_QUESTION.ERROR,
            payload : error
          });
          reject(error)
        })
    })
  }
}

// GET_QUESTIONS_FROM_TOPIC
export const fetchQuestions = async (topic_id, page, user_id) => {
  const response = await fetch(urls.QUESTION.GET_FROM_TOPIC(topic_id, page, user_id));
  return response.json();
}

export const getQuestions = (topic_id, page) => {
  return (dispatch, getState) => {
    const { id } = getState().auth.user;
    dispatch({
      type: GET_QUESTIONS_FROM_TOPIC.PENDING
    });
    return new Promise((resolve, reject) => {
      fetchQuestions(topic_id, page, id)
        .then((result) => {
          // TODO: use asyncStorage or Redux to keep the loaded data.
          dispatch({
            type : GET_QUESTIONS_FROM_TOPIC.SUCCESS,
            payload : {
              topic_id : topic_id,
              questions : result
            }
          });
          resolve(result)
        })
        .catch((error) => {
          dispatch({
            type : GET_QUESTIONS_FROM_TOPIC.ERROR,
            payload : error
          });
          reject(error);
        });
    });
  }
}

/** get 1 question */
export const fetchQuestion = async (question_id, user_id) => {
  const response = await fetch(urls.QUESTION.GET(question_id, user_id));
  return response.json();
}

export const getQuestion = (question_id) => {
  return (dispatch, getState) => {
    return new Promise((resolve, reject) => {
      const { id } = getState().auth.user;
      fetchQuestion(question_id, id)
        .then((result) => {
          resolve(result);
        })
        .catch((error) => {
          reject(error);
        });
    });
  }
}








// GET ANSWERS FROM QUESTIONS

// http://localhost/englishchatapp/api/question/10/answers
export const fetchAnswers = async (question_id) => {
  const response = await fetch(urls.QUESTION.GET_ANSWERS(question_id));
  return response.json();
}

export const getAnswers = () => {
  return dispatch => {

    return fetchAnswers()
      .then()
      .catch();
  }
}
