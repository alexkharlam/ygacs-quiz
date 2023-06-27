import express from 'express';

import { protect } from '../controllers/authController/authController.js';
import { createResult } from '../controllers/userResultController.js';

const router = express.Router();

router.use(protect);

router.post('/', createResult);

export default router;
