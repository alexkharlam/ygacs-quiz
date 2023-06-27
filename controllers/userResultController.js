import Quiz from '../models/quizModel.js';
import UserResult from '../models/userResultModel.js';
import catchAsync from '../utils/catchAsync.js';

import AppError from './errorController/AppError.js';

export const createResult = catchAsync(async (req, res, next) => {
  const quiz = await Quiz.findById(req.body.quiz);
  if (!quiz) return next(new AppError('Quiz does not exist', 404));
  const userAnswers = req.body.answers;

  if (userAnswers.length !== quiz.questions.length)
    return next(
      new AppError('Amount of answers is not the same as questions', 400)
    );

  const userScores = quiz.questions.map((q, idx) =>
    q.answer === userAnswers[idx] ? 1 : 0
  );

  const userScore = userScores.reduce(
    (acc, val) => (val === 1 ? acc + val : acc),
    0
  );

  const userResult = await UserResult.create({
    user: req.user._id,
    quiz: req.body.quiz,
    userAnswers,
    scores: userScores,
    score: userScore,
  });

  res.status(200).json({
    status: 'success',
    data: {
      userResult,
    },
  });
});

export const fdg = '';
