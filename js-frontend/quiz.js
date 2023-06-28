/* eslint-disable */
import { createQuestionHTML, createResultHTML } from './createMarkup';

export default () => {
  const quizString = document.querySelector('main').dataset.quiz;
  if (!quizString) return;
  const quiz = JSON.parse(quizString);
  let currentQuestionIdx = 0;
  const userAnswers = [];
  let currentOption = null;

  const questionDOM = document.querySelector('.question');

  const finishQuiz = (userAnswers) => {
    location.assign(`/quizzes/${quiz.slug}/result/${userAnswers}`);
  };

  const handleCurOption = (target) => {
    currentOption = +target.getAttribute('num');

    const optionDOM = document.querySelectorAll('.question__option-btn');
    optionDOM.forEach((option) =>
      option.classList.remove('question__option-btn--active')
    );
    target.classList.add('question__option-btn--active');
  };

  const handleNextQuestion = () => {
    ++currentQuestionIdx;

    const isLast = currentQuestionIdx === quiz.questions.length - 1;
    questionDOM.innerHTML = createQuestionHTML(
      quiz,
      currentQuestionIdx,
      isLast
    );
  };

  questionDOM.addEventListener('click', function (e) {
    e.preventDefault();
    const classes = e.target.classList;

    // handle changing of current option
    if (classes.contains('question__option-btn')) handleCurOption(e.target);

    // handle switching to the next question
    if (classes.contains('btn-next') && currentOption !== null) {
      handleNextQuestion();
    }

    // handle storing user's answers
    if (classes.contains('btn-action') && currentOption !== null) {
      userAnswers.push(currentOption);
      currentOption = null;
      console.log(userAnswers);
      if (userAnswers.length === quiz.questions.length) {
        finishQuiz(userAnswers);
      }
    }
  });
};
