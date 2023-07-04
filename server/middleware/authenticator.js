const Token = require("../models/token");

//check whether client request comes in with a token
async function authenticator(req, res, next) {
  try {
    //req.headers is where you find the extra information in the request
    // so we use it to access our authorization key we've made
    const userToken = req.headers["authorization"];

    //check there is a user token - throw error if not
    if (userToken == "null") {
      throw new Error("User not authenticated.");
    } else {
      // check the token in the req.headers, actually exists in the token table
      const validToken = await Token.getOneByToken(userToken);
      if (!validToken) {
        throw new Error("User's token doesnt match server");
      } else {
        next();
      }
    }
  } catch (err) {
    res.status(403).json({ error: err.message });
  }
}

module.exports = authenticator;
