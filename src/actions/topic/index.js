import {GET_TOPICS, SET_CURRENT_TOPIC} from './type'
import {urls} from "../../config";


export const fetchTopics = async () => {
  const response = await fetch(urls.TOPIC.GET)
  return response.json()
}

export const getTopics = () => {
  return dispatch => {
    dispatch({
      type : GET_TOPICS.PENDING
    });
    return fetchTopics()
      .then((result) => {
        dispatch({
          type : GET_TOPICS.SUCCESS,
          payload : result
        })
      })
      .catch((error) => {
        dispatch({
          type : GET_TOPICS.ERROR,
          payload : error
        })
      })
  }
}

export const setCurrentTopic = (topic) => {
  return {
    type : SET_CURRENT_TOPIC,
    payload : topic
  }
}
