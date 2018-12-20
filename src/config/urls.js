// const BASE_URL = 'http://localhost/englishchatapp/api'; // for Working
const BASE_URL = 'http://englishchatapp.esy.es/api'; // for Living
export const urls = {
  USER: {
    GET: BASE_URL + '/auth/user',
    LOGIN: BASE_URL + '/auth/login',
    LOGIN_FACEBOOK: BASE_URL + '/auth/loginFacebook',
    LOGIN_GOOGLE: BASE_URL + '/auth/loginGoogle',
  },
  TOPIC: {
    GET: BASE_URL + '/topic'
  },
  QUESTION: {
    GET: (question_id, user_id) => BASE_URL + `/question/${question_id}/user/${user_id}`,
    GET_FROM_TOPIC: (topic_id, page, user_id) => BASE_URL + `/question/topic/${topic_id}/${user_id}?page=${page}`,
    GET_ANSWERS: question_id => BASE_URL + `/question/${question_id}/answers`,
    POST: BASE_URL + '/question',
  },
  ANSWER: {
    POST: BASE_URL + '/answers',
    PUT: answer_id => `${BASE_URL}/answers/${answer_id}`
  },
  PARAGRAPH : {
    GET : id => `${BASE_URL}/paragraph/${id}`,
    GET_BY_TOPIC : (topic_id, user_id) => `${BASE_URL}/paragraph/topic/${topic_id}/${user_id}`,
    POST : BASE_URL + '/paragraph',
    PUT : id => `${BASE_URL}/paragraph/${id}`
  },
  NOTE: {
    // name, user_id, topic_id, current_topic_id
    GET : id => `${BASE_URL}/note/${id}`,
    GET_BY_TOPIC : (topic_id, user_id) => `${BASE_URL}/note/topic/${topic_id}/user/${user_id}`,
    POST : BASE_URL + '/note',
    PUT : id => `${BASE_URL}/note/${id}`,
    UPDATE_INDEX : `${BASE_URL}/note/index`,
    DELETE : BASE_URL + '/note',
  }
}
