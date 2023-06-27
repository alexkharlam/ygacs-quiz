import path from 'path';
import { fileURLToPath } from 'url';

import compression from 'compression';
import express from 'express';

import AppError from './controllers/errorController/AppError.js';
import errorHandler from './controllers/errorController/errorController.js';
import expressHelpers from './middleware/expressHelpers.js';
import sanitization from './middleware/sanitization.js';
import security from './middleware/security.js';
import authRouter from './routes/authRoutes.js';
import quizRouter from './routes/quizRoutes.js';
import userResultsRouter from './routes/userResultRoutes.js';
import userRouter from './routes/userRoutes.js';
import viewRouter from './routes/viewRoutes.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

//

const app = express();

// middlewares:
// security
security(app);
// VIEW ENGINE
app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));
// SERVING STATIC FILES
app.use(express.static(path.join(__dirname, 'public')));
// EXPRESS HELPERS
expressHelpers(app);
// Sanitization
sanitization(app);
// COMPRESSION
app.use(compression());
// Handlers

// routes
app.use('/api/auth', authRouter);
app.use('/api/user', userRouter);
app.use('/api/quizzes', quizRouter);
app.use('/api/userResults', userResultsRouter);
app.use('/', viewRouter);

// Error handling
app.all('*', (req, res, next) => next(new AppError('Not found', 404)));
app.use(errorHandler);

export default app;
