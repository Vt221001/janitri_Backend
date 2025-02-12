class ApiError extends Error {
    constructor(
      statusCode,
      errors = [],
      stack = ""
    ) {
      super();
      this.statusCode = statusCode;
      this.errors = errors;
      this.success = statusCode < 400;
      if (stack) {
        this.stack = stack;
      } else {
        Error.captureStackTrace(this, this.constructor);
      }
    }
  }
  
  export { ApiError };