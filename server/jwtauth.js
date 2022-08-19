const jwt = require("jsonwebtoken");
const config = require('./config/token');

verifyToken = (req, res, next) => {
  let token = req.headers["x-access-token"];
  if (!token) {
    return res.status(403).send({
      message: "No token provided!"
    });
  }
  jwt.verify(token, config.token, (err, decoded) => {
    if (err) {
      return res.status(401).send({
        message: "Unauthorized!"
      });
    }
    next(req, res);
  });
};

module.exports = {
    verifyToken,
  };