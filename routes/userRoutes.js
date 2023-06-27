import express from 'express';

import { protect } from '../controllers/authController/authController.js';
import {
  deleteAccount,
  updatePassword,
  getMe,
  updateMe,
} from '../controllers/userController.js';

const router = express.Router();

router.use(protect);

router.get('/me', getMe);
router.patch('/updateMe', updateMe);
router.patch('/updatePassword', updatePassword);
router.delete('/deleteMe', deleteAccount);

export default router;
