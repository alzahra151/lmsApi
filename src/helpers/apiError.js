class ApiError extends Error {
  constructor(message, httpStatus) {
    super(message, httpStatus);
    this.message = message;
    this.name = this.name;
    this.message = message;
    this.status = httpStatus || 500;
  }
}

module.exports = ApiError;
