import Quiz from '../models/quizModel.js';
import catchAsync from '../utils/catchAsync.js';

export const getQuizzes = catchAsync(async (req, res, next) => {
  const quizess = await Quiz.find();

  res.status(200).json({
    status: 'success',
    data: {
      quizess,
    },
  });
});

export const getQuiz = catchAsync(async (req, res, next) => {
  const quiz = await Quiz.findById(req.params.id);

  res.status(200).json({
    status: 'success',
    data: {
      quiz,
    },
  });
});

export const createQuiz = catchAsync(async (req, res, next) => {
  const quizData = req.body;
  quizData.author = req.user._id;
  quizData.onModeration = true;
  const quiz = await Quiz.create(quizData);

  res.status(200).json({
    status: 'success',
    data: { quiz },
  });
});

export const deleteQuiz = catchAsync(async (req, res, next) => {
  await Quiz.findByIdAndRemove(req.params.id);

  res.status(204).json({
    status: 'success',
    data: null,
  });
});

export const deleteAllQuizes = catchAsync(async (req, res, next) => {
  await Quiz.deleteMany();

  res.status(204).json({
    status: 'success',
    data: null,
  });
});
