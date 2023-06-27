import AppError from './AppError.js';

export const validationError = (err) => {
  const message = Object.values(err.errors)
    .map((fieldErr) => fieldErr.message)
    .join(', ');

  return new AppError(message, 400);
};

export const dublicateFields = (err) => {
  const errors = Object.keys(err.keyValue).join(', ');

  const message = `${errors} already exists. Please use another`;

  return new AppError(message, 400);
};

export const castError = (err) => {
  const message = `Invalid ${err.path}: ${err.value}`;

  return new AppError(message, 400);
};

export const jwtExpiredError = () => new AppError('Your session expired', 401);

export const jwtError = () => new AppError('Invalid token', 401);
