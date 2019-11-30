export default class BasicError extends Error {
  constructor(statusCode, message, meta = {}) {
    super();
    this.statusCode = statusCode;
    this.message = message;
    this.meta = meta;
  }
}

export const handleError = (err, res) => {
  const { statusCode, message, meta } = err;
  res.status(statusCode).json({
    message,
    meta,
  });
};

export const rescueController = (fn) => {
  return (req, res, next)=> {
    return Promise.resolve(fn(req, res, next))
      .catch((e) => {
        console.log(e);
        let error = e;
        if (e.constructor.name !== 'BasicError') {
          error = new BasicError(500, 'We are sorry something went wrong');
        }
        next(error);
      });
  };
};
