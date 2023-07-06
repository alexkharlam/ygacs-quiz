import express from 'express';

import { isLoggedIn } from '../controllers/authController/authController.js';
import {
  getQuizzes,
  login,
  signup,
  getQuizOverview,
  getAccount,
  getQuiz,
  getQuizResult,
} from '../controllers/viewController.js';

const router = express.Router();

router.use(isLoggedIn);
router.get('/', getQuizzes);
router.get('/account', getAccount);
router.get('/quizzes', getQuizzes);
router.get('/quizzes/:slug', getQuizOverview);
router.get('/quizzes/:slug/start', getQuiz);
router.get('/quizzes/:slug/result/:userAnswers', getQuizResult);

// auth
router.get('/login', login);
router.get('/signup', signup);

export default router;
