import Quiz from '../models/quizModel.js';
import User from '../models/userModel.js';
import UserResult from '../models/userResultModel.js';
import catchAsync from '../utils/catchAsync.js';

import AppError from './errorController/AppError.js';

export const getQuizzes = catchAsync(async (req, res) => {
  const quizzes = await Quiz.find()
    .select('name photo tags createdAt slug')
    .lean();
  if (!req.user) {
    res.status(200).render('home', {
      title: 'All quizzes',
      quizzes,
    });
  }

  if (req.user) {
    const userResults = await UserResult.find({ user: req.user._id });
    const userResultsHash = {};
    userResults.forEach((result) => {
      userResultsHash[result.quiz.toString()] = result.score;
    });

    const quizzesResults = quizzes.map((quiz) => {
      quiz.result = userResultsHash[quiz._id.toString()] || null;
      return quiz;
    });

    res.status(200).render('home', {
      title: 'All quizzes',
      quizzes: quizzesResults,
    });
  }
});

export const getQuizOverview = catchAsync(async (req, res, next) => {
  if (!req.user)
    return next(new AppError('You have to sign in to take quizzes', 403));

  const quiz = await Quiz.findOne({ slug: req.params.slug })
    .select('name photo tags createdAt slug questionsQuantity')
    .lean();

  if (!quiz) return next(new AppError('Quiz not found', 404));
  const userResult = await UserResult.findOne({
    quiz: quiz._id,
    user: req.user._id,
  }).select('score');
  if (userResult) quiz.result = userResult.score;
  console.log(quiz);

  res.status(200).render('quiz-overview', {
    title: quiz.name,
    quiz,
  });
});

export const getQuiz = catchAsync(async (req, res, next) => {
  if (!req.user)
    return next(new AppError('You have to sign in to take quizzes', 403));

  const quiz = await Quiz.findOne({ slug: req.params.slug }).select(
    '+name -questions.answer'
  );

  if (!quiz) return next(new AppError('Quiz not found', 404));

  const userResult = await UserResult.findOne({
    user: req.user._id,
    quiz: quiz._id,
  });
  if (userResult)
    return next(new AppError('You already completed this quiz', 400));

  res.status(200).render('quiz', { title: quiz.name, quiz: quiz });
});

export const getQuizResult = catchAsync(async (req, res, next) => {
  const userAnswers = req.params.userAnswers.split(',');
  const quiz = await Quiz.findOne({ slug: req.params.slug });
  if (!quiz) return next(new AppError('Quiz does not exist', 404));

  const existingResult = await UserResult.findOne({
    user: req.user._id,
    quiz: quiz._id,
  });
  if (existingResult)
    return next(new AppError('You already completed this quiz', 400));

  if (userAnswers.length !== quiz.questions.length)
    return next(
      new AppError('Amount of answers is not the same as questions', 400)
    );

  const userScores = quiz.questions.map((q, idx) =>
    q.answer === +userAnswers[idx] ? 1 : 0
  );
  const rightAnswers = userScores.reduce(
    (acc, val) => (val === 1 ? acc + val : acc),
    0
  );
  const userScore = `${rightAnswers}/${quiz.questions.length}`;

  const userResult = await UserResult.create({
    user: req.user._id,
    quiz: quiz._id,
    userAnswers,
    scores: userScores,
    score: userScore,
  });

  res.status(200).render('quiz-result', {
    title: 'title',
    quiz,
    userResult,
  });
});

export const getAccount = catchAsync(async (req, res, next) => {
  if (!req.user) return next(new AppError('You are not logged in', 401));

  const user = await User.findById(req.user._id);
  console.log(user);

  res.status(200).render('account', {
    title: 'Account',
    user,
  });
});

export const login = catchAsync(async (req, res, next) => {
  if (req.user) return next(new AppError('You are already logged in', 400));

  res.status(200).render('login', {
    title: 'Sign in',
  });
});

export const signup = catchAsync(async (req, res, next) => {
  if (req.user) return next(new AppError('You are already logged in', 400));

  res.status(200).render('signup', {
    title: 'Sign up',
  });
});

export const getAbout = catchAsync(async (req, res, next) => {
  res.status(200).render('about', {
    title: 'About',
  });
});
