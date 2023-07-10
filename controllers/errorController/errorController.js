import {
  validationError,
  dublicateFields,
  castError,
  jwtError,
  jwtExpiredError,
} from './handleSpecificErrors.js';

const sendErrorDev = (err, req, res) => {
  err.isApiErr = req.originalUrl.startsWith('/api');

  if (err.isApiErr) {
    res.status(+err.statusCode).json({
      status: err.status,
      message: err.message,
      error: err,
    });
  }

  if (!err.isApiErr) {
    res.status(+err.statusCode).render('error', {
      title: 'Something went wrong',
      message: err.message,
      statusCode: err.statusCode,
    });
  }
};

const sendErrorProd = (err, req, res) => {
  err.isApiErr = req.originalUrl.startsWith('/api');
  console.log('🛑 Error log ⬇️');
  console.log(err);

  // error is API and OPERATIONAL
  if (err.isApiErr && err.isOperational) {
    res.status(+err.statusCode).json({
      status: err.status,
      message: err.message,
    });
  }

  // error is API and NOT OPERATIONAL
  if (err.isApiErr && !err.isOperational) {
    res.status(500).json({
      status: 'error',
      message: 'Something went wrong! Try again later',
    });
  }

  // error is NOT API and OPERATIONAL
  if (!err.isApiErr && err.isOperational) {
    res.status(err.statusCode).render('error', {
      title: err.message,
      message: err.message,
      statusCode: err.statusCode,
    });
  }

  // error is NOT API and NOT OPERATIONAL
  if (!err.isApiErr && !err.isOperational) {
    res.status(500).render('error', {
      title: 'Something went wrong!',
      message: 'Please try again later 😴',
      statusCode: 500,
    });
  }
};

export default (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || 'error';

  const env = process.env.NODE_ENV;
  // error handling depends on current enviroment
  if (env === 'development') return sendErrorDev(err, req, res);
  if (env === 'production') {
    if (err.name === 'CastError') err = castError(err);
    if (err.name === 'ValidationError') err = validationError(err);
    if (err.code === 11000) err = dublicateFields(err);
    if (err.name === 'JsonWebTokenError') err = jwtError(err);
    if (err.name === 'TokenExpiredError') err = jwtExpiredError(err);

    return sendErrorProd(err, req, res);
  }
};
