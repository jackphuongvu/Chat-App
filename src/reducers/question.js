import {
  SUBMIT_ANSWER_TO_QUESTION,
  GET_ANSWER_QUESTION, GET_QUESTIONS_FROM_TOPIC,
  UPDATE_ANSWER
} from '../actions/questions/type'
// SUBMIT_ANSWER_TO_QUESTION
import {SUBMIT_PARAGRAPH, UPDATE_PARAGRAPH} from "../actions/paragraph/type";
import {GET_TOPICS, SET_CURRENT_TOPIC} from "../actions/topic/type";
/*
answer : [
 1 : 'answer of question_id = 1'
 2 : 'answer of question_id = 2'

]
 */

const initializeState = {
  isPendingTopics : false,
  isPendingAnswer : false, // get answer
  isPendingQuestions : false,
  isSubmittingAnswer : false, // post answer
  isUpdatingAnswer : false, // update answer
  // ----------------
  isSubmittingParagraph : false, // post paragraph
  isPendingParagraph : false, // get paragraph
  isUpdatingParagraph : false, // update paragraph
  error : '',
  questions : {},
  answer : [], // still dont know should we use it or not.
  topics : [],
  topic : {}
}; // initialize Question

const question = (state = initializeState, action) => {
  switch(action.type) {
    /** get all topics */
    case GET_TOPICS.PENDING:
      return Object.assign({}, state, {
        isPendingTopics : true
      });
    case GET_TOPICS.SUCCESS:
      return Object.assign({}, state, {
        isPendingTopics : false,
        topics : action.payload
      });
    case GET_TOPICS.ERROR:
      return Object.assign({}, state, {
        isPendingTopics : false,
        error : action.payload
      });
    /* END */
    case SUBMIT_ANSWER_TO_QUESTION.PENDING:
      return Object.assign({}, state, {
        isSubmittingAnswer : true
      });
    case SUBMIT_ANSWER_TO_QUESTION.SUCCESS:
      return Object.assign({}, state, {
        isSubmittingAnswer : false
      });
    case SUBMIT_ANSWER_TO_QUESTION.ERROR:
      return Object.assign({}, state, {
        isSubmittingAnswer : false,
        error : action.payload
      });
    /* END: SUBMIT_ANSWER_TO_QUESTION */
    case GET_ANSWER_QUESTION.PENDING:
      return Object.assign({}, state, {
        isPendingAnswer : true
      });
    case GET_ANSWER_QUESTION.SUCCESS:
      return Object.assign({}, state, {
        isPendingAnswer : false
      });
    case GET_ANSWER_QUESTION.ERROR:
      return Object.assign({}, state, {
        isPendingAnswer : false,
        error : action.payload
      });
    /* END: SUBMIT_ANSWER_TO_QUESTION */
    case GET_QUESTIONS_FROM_TOPIC.PENDING:
      return Object.assign({}, state, {
        isPendingQuestions : true
      });
    case GET_QUESTIONS_FROM_TOPIC.SUCCESS:
      // let newQuestions = {};
      //
      // let currentQuestions = state.questions[action.payload.topic_id];
      // if (currentQuestions.length) state.questions[action.payload.topic_id] = action.payload.questions.concat(currentQuestions);
      // else state.questions[action.payload.topic_id] = action.payload.questions;


      return Object.assign({}, state, {
        isPendingQuestions : false,
        questions : action.payload.questions
      });
    case GET_QUESTIONS_FROM_TOPIC.ERROR:
      return Object.assign({}, state, {
        isPendingQuestions : false,
        error : action.payload
      });
      /* Get answers from Questions */
    // case : how to speak English like a native.
      /** update answer */
    case UPDATE_ANSWER.PENDING:
      return Object.assign({}, state, {
        isUpdatingAnswer : true
      });
    case UPDATE_ANSWER.SUCCESS:
      return Object.assign({}, state, {
        isUpdatingAnswer : false
      });
    case UPDATE_ANSWER.ERROR:
      return Object.assign({}, state, {
        isUpdatingAnswer : false,
        error : action.payload
      });
      // END: update answer
    /* Update Global answer */
    case SUBMIT_PARAGRAPH.PENDING:
      return Object.assign({}, state, {
        isSubmittingParagraph : true
      });
    case SUBMIT_PARAGRAPH.SUCCESS:
      return Object.assign({}, state, {
        isSubmittingParagraph : false
      });
    case SUBMIT_PARAGRAPH.ERROR:
      return Object.assign({}, state, {
        isSubmittingParagraph : false,
        error : action.payload
      });
    case UPDATE_PARAGRAPH.PENDING:
      return Object.assign({}, state, {
        isUpdatingParagraph : true
      });
    case UPDATE_PARAGRAPH.SUCCESS:
      return Object.assign({}, state, {
        isUpdatingParagraph : false
      });
    case UPDATE_PARAGRAPH.ERROR:
      return Object.assign({}, state, {
        isUpdatingParagraph : false,
        error : action.payload
      });

    /** ------------------------------------- */
    // Work with Topic.
    case SET_CURRENT_TOPIC:
      return Object.assign({}, state, {
        topic : action.payload
      });


    default :
      return state;
  }
}

export default question;
