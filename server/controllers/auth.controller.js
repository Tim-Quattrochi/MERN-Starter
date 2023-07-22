const {
  createAccessToken,
  createRefreshToken,
} = require("../config/createToken");
const createCookie = require("../config/createCookie");
const User = require("../models/user.model");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const {
  REFRESH_TOKEN_SECRET,
  APP_NAME,
} = require("../config/constants");

const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    let user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ error: "Check Credentials." });
    }

    const passCompare = await bcrypt.compare(password, user.password);

    if (!passCompare) {
      return res.status(401).json({ error: "Invalid credentials." });
    }

    const payload = { id: user._id, email: user.email };

    const accessToken = createAccessToken(payload);

    const refreshToken = createRefreshToken(payload);
    createCookie(refreshToken, res);

    user.refreshToken = refreshToken;

    await user.save();

    user = user.toJSON();
    delete user.refreshToken;
    delete user.password;
    delete user.__v;

    return res
      .status(200)
      .json({ ...user, accessToken: accessToken });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Something went wrong." });
  }
};

const signup = async (req, res, next) => {
  const { name, email, password, confirmPassword } = req.body;

  if (password !== confirmPassword) {
    return res.status(400).json({ error: "Passwords must match." });
  }

  try {
    const user = await User.findOne({ email });

    if (user) {
      return res.status(400).json({ error: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    let newUser = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    const payload = { id: newUser._id, email: newUser.email };

    const accessToken = createAccessToken(payload);

    newUser = newUser.toJSON();
    delete newUser.password;
    delete newUser.__v;

    newUser = { ...newUser, accessToken };

    res.status(201).json(newUser);
  } catch (error) {
    console.log(error);
    next(error);
  }
};

const refresh = async (req, res) => {
  try {
    const cookies = req.cookies;

    if (!cookies[APP_NAME]) {
      return res
        .status(401)
        .json({ error: "Refresh token not found in cookies." });
    }

    const refreshToken = cookies[APP_NAME];
    const user = await User.findOne({ refreshToken });

    jwt.verify(
      refreshToken,
      REFRESH_TOKEN_SECRET,
      async (err, decoded) => {
        if (err || user.email !== decoded.email) {
          return res.status(403).json({
            error: "Invalid refresh token or credentials mismatch.",
          });
        }
      }
    );

    const payload = { id: user._id, email: user.email };
    const accessToken = createAccessToken(payload);

    return res.status(200).json({ accessToken: accessToken });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Something went wrong." });
  }
};

const list = async (req, res) => {
  try {
    res.status(200).json({ list: [1, 2, 3, 4, 5] });
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

module.exports = { signup, login, refresh, list };
