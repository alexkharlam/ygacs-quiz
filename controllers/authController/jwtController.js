import { promisify } from 'util';

import jwt from 'jsonwebtoken';

export const verifyToken = (token) =>
  promisify(jwt.verify)(token, process.env.JWT_SECRET);

export const signToken = (userId) => {
  const secret = process.env.JWT_SECRET;
  const jwtExpiresIn = `${process.env.JWT_EXPIRES_IN}d`;

  const token = jwt.sign({ id: userId }, secret, {
    expiresIn: jwtExpiresIn,
  });

  return token;
};

export const signSendToken = (user, statusCode, res) => {
  const token = signToken(user._id);
  const cookieExpiresIn = new Date(
    Date.now() + process.env.JWT_EXPIRES_IN * 86400000
  );

  const cookieOptions = {
    expires: cookieExpiresIn,
    httpOnly: true,
  };
  if (process.env.NODE_ENV === 'production') cookieOptions.secure = true;

  res.cookie('jwt', token, cookieOptions);

  res.status(statusCode).json({
    status: 'success',
    data: {
      user: {
        name: user.name,
        email: user.email,
        role: user.role,
        photo: user.photo,
      },
    },
  });
};
