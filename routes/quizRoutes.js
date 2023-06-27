import express from 'express';

import {
  protect,
  restrictTo,
} from '../controllers/authController/authController.js';
import {
  getQuizzes,
  getQuiz,
  createQuiz,
  deleteQuiz,
  deleteAllQuizes,
} from '../controllers/quizController.js';

const router = express.Router();

router.use(protect);
router.use(restrictTo('admin'));

router.get('/', getQuizzes);
router.post('/', createQuiz);
router.delete('/', deleteAllQuizes);

router.get('/:id', getQuiz);
router.delete('/:id', deleteQuiz);

export default router;
