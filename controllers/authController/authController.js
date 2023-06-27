import User from '../../models/userModel.js';
import catchAsync from '../../utils/catchAsync.js';
import AppError from '../errorController/AppError.js';

import { signSendToken, verifyToken } from './jwtController.js';

export const signup = catchAsync(async (req, res, next) => {
  const filteredBody = {
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
    passwordConfirm: req.body.passwordConfirm,
  };

  const newUser = await User.create(filteredBody);

  // creating web token
  signSendToken(newUser, 201, res);
});

export const login = catchAsync(async (req, res, next) => {
  const { email, password: candidatePassword } = req.body;
  // 1. Check if user typed email and password
  if (!email || !candidatePassword)
    return next(new AppError('Please provide email and password', 400));
  // 2. Check if user exists and password correct
  const user = await User.findOne({ email }).select('+password');
  if (
    !user ||
    !(await user.checkCorrectPassword(candidatePassword, user.password))
  )
    return next(new AppError(`Incorrect email or password`, 400));

  // 3. Create JWT and send back to the client
  signSendToken(user, 200, res);
});

export const protect = catchAsync(async (req, res, next) => {
  // 1. get the token and check if it's there
  const token = req.cookies.jwt;
  if (!token) return next(new AppError('You are not logged in', 401));
  // 2. verify token
  const decoded = await verifyToken(token);
  // 3. If success, check if user still exists
  const freshUser = await User.findById(decoded.id);
  if (!freshUser) return next(new AppError('User no longer exist', 404));
  // 4. Check if user changed password after JWT was issued
  if (freshUser.passwordChangedAfter(decoded.iat))
    return next(new AppError('Password changed, please login again', 401));

  req.user = freshUser;
  next();
});

export const restrictTo =
  (...roles) =>
  (req, res, next) => {
    // function will be called by express
    if (!roles.includes(req.user.role))
      return next(
        new AppError(`You don't have permission to perform this action`, 403)
      );

    next();
  };

export const logout = (req, res) => {
  res.cookie('jwt', 'loggedout', {
    // setting empty cookie
    expires: new Date(Date.now() + 1000),
    httpOnly: true,
  });
  res.status(200).json({
    status: 'success',
  });
};

// RENDERED PAGES:
export const isLoggedIn = async (req, res, next) => {
  try {
    // 1. get the token and check if it's there
    const token = req.cookies.jwt;
    if (!token) return next();
    // 2. verify token
    const decoded = await verifyToken(token);
    // 3. If success, check if user still exists
    const freshUser = await User.findById(decoded.id);
    if (!freshUser) return next();
    // 4. Check if user changed password after JWT was issued
    if (freshUser.passwordChangedAfter(decoded.iat)) return next();

    req.user = freshUser;
    res.locals.user = freshUser;
    return next();
  } catch (err) {
    return next();
  }
};
