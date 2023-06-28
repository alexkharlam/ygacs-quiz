/* eslint-disable */

export const createQuestionHTML = (quiz, idx, lastQuestion = false) => {
  return `
  ${
    quiz.questions[idx].image
      ? `<img src="/img/quizzes/1.jpg" alt="" class="question__img" />`
      : ''
  }
  <h3 class="question__name">${quiz.questions[idx].questionTitle}</h3>
  ${quiz.questions[idx].options
    .map(
      (option, idx) => `
      <button num="${idx}" class="question__option-btn" type="button">${option}</button>
      `
    )
    .join(' ')}
      <button class="question__next-btn btn-action btn-${
        lastQuestion ? 'finish' : 'next'
      }">${lastQuestion ? 'Finish quiz' : 'Next question'}</button>
      `;
};
