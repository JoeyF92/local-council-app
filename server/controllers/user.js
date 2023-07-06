const bcrypt = require("bcrypt");

const User = require("../models/User");
const Token = require("../models/Token");

async function register(req, res) {
  try {
    const data = req.body;
    const salt = await bcrypt.genSalt(parseInt(process.env.BCRYPT_SALT_ROUNDS));
    data["password"] = await bcrypt.hash(data["password"], salt);
    const result = await User.create(data);
    res.status(201).send(result);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
}

async function login(req, res) {
  const data = req.body;
  try {
    // retrieve the user from the model based on username inputted
    const user = await User.getOneByUsername(data.username);
    //compare the encrypted password to the plain text password
    const authenticated = await bcrypt.compare(
      data.password,
      user["pass_word"]
    );

    if (!authenticated) {
      throw new Error("Incorrect credentials.");
    } else {
      // if the user is authenticated, we can assign it a token
      const token = await Token.create(user.id);
      //we can use the authenticated object to see if user is authenticated now, and we can pass in the token too in the response

      res.status(200).json({ authenticated: true, token: token });
    }
  } catch (err) {
    res.status(403).json({ error: err.message });
  }
}

async function logout(req, res) {
  const token = req.headers.authorization;
  try {
    const response = await Token.removeToken(token);
    res.status(202).json({ message: response });
  } catch (error) {
    res.status(403).json({ Error: error.message });
  }
}

module.exports = {
  register,
  login,
  logout,
};
