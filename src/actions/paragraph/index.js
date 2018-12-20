import {urls} from "../../config";
import {SUBMIT_PARAGRAPH, UPDATE_PARAGRAPH} from "./type";

export const submitParagraphToTopic = async (text, user_id, topic_id) => {
  const response = await fetch(urls.PARAGRAPH.POST, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      text : text,
      user_id: user_id,
      topic_id: topic_id
    })
  });
  return response.json();
}

export const sendParagraph = (text, topic_id) => {
  return (dispatch, getState) => {
    const { id } = getState().auth.user;
    dispatch({
      type : SUBMIT_PARAGRAPH.PENDING,
      payload : {
        text,
        topic_id,
      }
    });
    return new Promise((resolve, reject) => {
      submitParagraphToTopic(text, id, topic_id)
        .then((result) => {
          console.log( result )
          dispatch({
            type : SUBMIT_PARAGRAPH.SUCCESS
          });
          resolve(result);
        })
        .catch((error) => {
          dispatch({
            type : SUBMIT_PARAGRAPH.ERROR,
            payload : error
          });
          reject(error);
        })
    })
  }
}

// fetchByTopic
export const fetchParagraph = async (topic_id, user_id) => {
  // GET_PARAGRAPH
  // topic_id, user_id
  const response = await fetch(urls.PARAGRAPH.GET_BY_TOPIC(topic_id, user_id));
  return response.json();
}

export const getParagraph = (topic_id) => {
  return (dispatch, getState) => {
    const { id } = getState().auth.user;
    return new Promise( (resolve, reject) => {
      // user_id, topic_id
      fetchParagraph(topic_id, id)
        .then((result) => {
          resolve(result)
        })
        .catch((error) => {
          reject(error)
        })
    });
  }
}

// -----------------------------
// Paragraph

export const fetchUpdateParagraph = async (paragraph_id, text) => {
  const response = await fetch(urls.PARAGRAPH.PUT(paragraph_id), {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      // answer_id : answer_id,
      // text
      //
      text : text,
      // answer_text : answer_text
    })
  });
  return response.json();
}

export const updateParagraph = (paragraph_id, text) => {
  return dispatch => {
    // paragraph_id
    return fetchUpdateParagraph(paragraph_id, text)
      .then((result) => {
        console.log( result )
        dispatch({
          type : UPDATE_PARAGRAPH.SUCCESS
        });
      })
      .catch((error) => {
        dispatch({
          type : UPDATE_PARAGRAPH.ERROR,
          payload : error
        });
      })
  }
}
// UPDATE_PARAGRAPH
