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
const CustomError = require("../utils/errorClass");

const login = async (req, res, next) => {
  const { email, password } = req.body;

  try {
    let user = await User.findOne({ email });

    if (!user) {
      throw new CustomError("Check Credentials.", 400);
    }

    const passCompare = await bcrypt.compare(password, user.password);

    if (!passCompare) {
      throw new CustomError("Invalid Credentials.", 401);
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
    next(error);
  }
};

const signup = async (req, res, next) => {
  const { name, email, password, confirmPassword } = req.body;

  try {
    if (password !== confirmPassword) {
      throw new CustomError("Check Credentials.", 400);
    }
    const user = await User.findOne({ email });

    if (user) {
      throw new CustomError("User already exists.", 400);
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

const refresh = async (req, res, next) => {
  try {
    const cookies = req.cookies;

    if (!cookies[APP_NAME]) {
      throw new CustomError(
        "Refresh Token not found in cookies.",
        401
      );
    }

    const refreshToken = cookies[APP_NAME];
    const user = await User.findOne({ refreshToken });

    jwt.verify(
      refreshToken,
      REFRESH_TOKEN_SECRET,
      async (err, decoded) => {
        if (err || user.email !== decoded.email) {
          throw new CustomError(
            "Invalid refresh token or credentials mismatch.",
            403
          );
        }
      }
    );

    const payload = { id: user._id, email: user.email };
    const accessToken = createAccessToken(payload);

    return res.status(200).json({ accessToken: accessToken });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

const logout = (req, res, next) => {
  const cookies = req.cookies;
  try {
    if (!cookies[APP_NAME]) {
      throw new CustomError("No cookies to clear.", 200);
    }

    res.clearCookie(APP_NAME, {
      httpOnly: true,
      sameSite: "None",
      secure: true,
    });

    throw new CustomError("Cookie cleared.", 200);
  } catch (error) {
    next(error);
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

module.exports = { signup, login, refresh, list, logout };
