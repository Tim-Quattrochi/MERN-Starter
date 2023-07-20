const { JWT_SECRET } = require("../config/constants");
const {
  createToken,
  createAccessToken,
  createRefreshToken,
} = require("../config/createToken");
const createCookie = require("../config/createCookie");
const User = require("../models/user.model");
const bcrypt = require("bcrypt");

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
    console.log(payload);

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

const signup = async (req, res) => {
  const { name, email, password, confirmPassword } = req.body;

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
    console.log(payload);
    const token = createAccessToken(payload);

    newUser = newUser.toJSON();
    delete newUser.password;
    delete newUser.__v;

    newUser = { ...newUser, token: token };

    res.status(201).json(newUser);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Something went wrong." });
  }
};

module.exports = { signup, login };
