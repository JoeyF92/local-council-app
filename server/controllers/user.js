const db = require("../database/connect");

class User {
  constructor({
    user_id,
    username,
    pass_word,
    user_address,
    is_admin = false,
  }) {
    this.id = user_id;
    this.username = username;
    this.pass_word = pass_word;
    this.userAddress = user_address;
    this.isAdmin = is_admin;
  }

  static async getOneById(id) {
    const response = await db.query("SELECT * FROM users WHERE user_id = $1", [
      id,
    ]);
    if (response.rows.length != 1) {
      throw new Error("Unable to locate user.");
    }
    return new User(response.rows[0]);
  }

  //this function allows us to search for user by username and get back their encrypted password
  static async getOneByUsername(username) {
    const response = await db.query("SELECT * FROM users WHERE username = $1", [
      username,
    ]);

    if (response.rows.length != 1) {
      throw new Error("Unable to locate user.");
    }
    return new User(response.rows[0]);
  }

  static async create(data) {
    const { username, password, user_address, isAdmin } = data;
    let response = await db.query(
      "INSERT INTO users (username, pass_word, user_address) VALUES ($1, $2, $3) RETURNING user_id;",
      [username, password, user_address]
    );
    const newId = response.rows[0].user_id;
    const newUser = await User.getOneById(newId);
    return newUser;
  }
}

module.exports = User;