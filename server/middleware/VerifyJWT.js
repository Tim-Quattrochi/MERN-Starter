const jwt = require("jsonwebtoken");
const { ACCESS_TOKEN_SECRET } = require("../config/constants");

const verifyJWT = async (req, res, next) => {
  const authHeader =
    req.headers.authorization || req.headers.Authorization; //It's not a bad idea to check for capitalization.

  if (!authHeader?.startsWith("Bearer")) {
    return res.status(401).json({ error: "Not Authorized." });
  }

  const accessToken = authHeader.split(" ")[1];

  try {
    jwt.verify(accessToken, ACCESS_TOKEN_SECRET, (err, decoded) => {
      if (err) {
        console.log(err);
        return res.status(403).json({ error: "Forbidden." });
      }
      //setting the user from decoded access token.
      req.user = decoded.email; //Can change this to  name if you need.
      req.id = decoded.id;
      next();
    });
  } catch (error) {
    console.log(error);
    return res.status(403).json({ error: "Forbidden." });
  }
};

module.exports = verifyJWT;
