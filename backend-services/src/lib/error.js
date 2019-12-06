export default class ApiError extends Error {
  constructor(statusCode, message, meta = {}, options = { validationError: true }) {
    super();
    this.statusCode = statusCode;
    this.message = message;
    this.meta = this.metaFactory(meta, options);
  }

  get meta() {
    return this._meta;
  }

  set meta(meta) {
    this._meta = meta;
  }

  get message() {
    return this._message;
  }

  set message(message) {
    this._message = message;
  }

  metaFactory(meta, options) {
    if (options.validationError === true) {
      const format = {};
      Object.keys(meta).forEach((field) => {
        format[field] = meta[field].message;
      });
      return format;
    }
    return meta;
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
        if (e.constructor.name !== 'ApiError') {
          error = new ApiError(500, 'We are sorry something went wrong');
        }
        next(error);
      });
  };
};
