const jwt = require("jsonwebtoken");

const verifyToken = async (req, res, next) => {
  let token = req.headers["authorization"];

  if (token && token.startsWith("Bearer ")) {
    token = token.split(" ")[1];

    jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
      if (err) {
        return res.status(401).json({ message: "Invalid token" });
      } else {
        req.user = decoded;      // ✅ Set req.user here
        return next();           // ✅ Only call next() after req.user is set
      }
    });
  } else {
    return res.status(401).json({ message: "Invalid token" });
  }
};

module.exports = verifyToken;
