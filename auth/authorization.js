class AuthError extends Error {
  constructor(message, statusCode) {
      super(message);
      this.statusCode = statusCode;
  }
}

const authorize = (
  permissionLevel,
) => async (req, res, next) => {
  let authorized = req.headers.permissionlevel === permissionLevel;
    if (
        authorized
    ) {
        next();
    } else {
        const message = `ruta ${req.url} metdodo ${req.method} no autorizada`;
        const err = new AuthError(message, 401);
        next(err);
    }
};

module.exports = authorize;