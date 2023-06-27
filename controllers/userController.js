import User from '../models/userModel.js';
import catchAsync from '../utils/catchAsync.js';
import filterObj from '../utils/filterObj.js';

import { signSendToken } from './authController/jwtController.js';
import AppError from './errorController/AppError.js';

export const updatePassword = catchAsync(async (req, res, next) => {
  const user = await User.findById(req.user._id).select('+password');

  if (!(await user.checkCorrectPassword(req.body.oldPassword, user.password)))
    return next(new AppError('Old password is not correct', 400));

  user.password = req.body.password;
  user.passwordConfirm = req.body.passwordConfirm;
  await user.save();

  signSendToken(user, 200, res);
});

export const deleteAccount = catchAsync(async (req, res, next) => {
  await User.findByIdAndUpdate(req.user._id, { active: false });

  res.status(204).json({
    message: 'success',
    data: null,
  });
});

export const getMe = catchAsync(async (req, res, next) => {
  const user = await User.findById(req.user._id);

  res.status(200).json({
    message: 'success',
    data: {
      user: {
        name: user.name,
        email: user.email,
        photo: user.photo,
      },
    },
  });
});

export const updateMe = catchAsync(async (req, res, next) => {
  if (req.body.password || req.body.passwordConfirm)
    return next(new AppError('You can update only not sensitive data', 400));

  const filteredObj = filterObj(req.body, 'name', 'email', 'photo');
  const updatedUser = await User.findByIdAndUpdate(req.user._id, filteredObj, {
    new: true,
    runValidators: true,
  });

  res.status(200).json({
    message: 'success',
    data: {
      user: {
        name: updatedUser.name,
        email: updatedUser.email,
        photo: updatedUser.photo,
      },
    },
  });
});
