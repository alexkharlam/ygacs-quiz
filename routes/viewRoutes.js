import express from 'express';

import { isLoggedIn } from '../controllers/authController/authController.js';
import {
  getQuizzes,
  login,
  signup,
  getQuizOverview,
  getQuiz,
} from '../controllers/viewController.js';

const router = express.Router();

router.use(isLoggedIn);

router.get('/', getQuizzes);
router.get('/quizzes', getQuizzes);
router.get('/quizzes/:slug', getQuizOverview);
router.get('/quizzes/:slug/start', getQuiz);

// auth
router.get('/login', login);
router.get('/signup', signup);

export default router;
