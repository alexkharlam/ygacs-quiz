import rateLimit from 'express-rate-limit';
import helmet from 'helmet';

const security = (app) => {
  // app.use(
  //   helmet({
  //     contentSecurityPolicy: {
  //       directives: {
  //         defaultSrc: ["'self'"],
  //         scriptSrc: [
  //           "'self'",
  //           'https://cdn.jsdelivr.net/npm/axios/dist/axios.min.js',
  //         ],
  //       },
  //     },
  //   })
  // );

  const limiter = rateLimit({
    max: 100,
    windowMs: 60 * 60 * 1000,
    message: 'Too many requests from this ip. Please try again in a hour',
  });
  app.use('/api', limiter);
};

export default security;
