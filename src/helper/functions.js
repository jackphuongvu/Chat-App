import uuid from 'uuidv4';
import queryString from 'query-string';

const DATA_API = 'https://connectenglishlearner.000webhostapp.com/wp-json/wp/v2';


// url = 'hhttps://connectenglishlearner.000webhostapp.com/wp-json/wp/v2/question?search=friends'
/**
 * TODO:
 * - Fix TotalQuestion
 */
export const getQuestionByTopicAsync = (slug, page) => {
  if (!slug)
    slug = 'travel';
  if (!page)
    page = 1;
  // let queryQuestions = queryString.stringify({
  //   filter[topic] : slug,
  //   page : 2
  // });

  let url = `${DATA_API}/question?filter[topic]=${slug}&page=${page}`;
  // console.log(url);
  // let url = `${DATA_API}/question?${queryQuestions}`;
  return new Promise((resolve, reject) => {
    fetch(url)
      .then(response => response.json())
      .then((result => {
        // console.log(result);
        const questionArray = result.map((question) => ({
          id : question.id,
          title : question.title.rendered,
          totalAnswer : 5
        }));
        resolve(questionArray);
      }))
      .catch(error => {
        // console.log(error);
        reject(error);
      });
  });
}
