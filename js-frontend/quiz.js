/* eslint-disable */

export default () => {
  const quizString = document.querySelector('main').dataset.quiz;
  if (!quizString) return;
  const quiz = JSON.parse(quizString);
  console.log(quiz);
  let currentQuestionIdx = 0;
  const userAnswers = [];
  let currentOption = null;

  const questionDOM = document.querySelector('.question');

  const finishQuiz = async (userAnswers) => {
    try {
      const res = await axios({
        method: 'POST',
        url: '/api/userResults',
        data: {
          quiz: quiz._id,
          answers: userAnswers,
        },
      });

      if (res.data.status === 'success') {
        console.log(res);
      }
    } catch (err) {
      alert(err.response.data.message);
    }
  };

  const createQuestionHTML = (idx, lastQuestion = false) => {
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
    questionDOM.innerHTML = createQuestionHTML(currentQuestionIdx, isLast);
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
      if (userAnswers.length === quiz.questions.length) {
        finishQuiz(userAnswers);
      }
    }
  });
};
