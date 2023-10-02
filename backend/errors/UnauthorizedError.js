class UnauthorizedError extends Error {
  constructor(message) {
    console.log(message);
    super(message);
    this.status = 401;
  }
}

module.exports = UnauthorizedError;
