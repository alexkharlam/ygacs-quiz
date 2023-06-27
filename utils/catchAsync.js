const catchAsync = (asyncFn) => (req, res, next) =>
  asyncFn(req, res, next).catch(next);

export default catchAsync;
