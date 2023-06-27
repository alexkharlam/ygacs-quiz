import mongoSanitize from 'express-mongo-sanitize';
import xss from 'xss-clean';
import hpp from 'hpp';

const sanitization = (app) => {
  app.use(mongoSanitize());
  app.use(xss());
  app.use(hpp({ whitelist: ['duration'] }));
};

export default sanitization;
