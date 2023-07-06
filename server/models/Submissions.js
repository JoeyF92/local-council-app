const db = require("../database/connect");

class Submissions {
  static async getAllSubmissions() {
    const query = "SELECT * FROM voting_submissions";
    const { rows } = await db.query(query);
    return rows;
  }

  static async getSubmissionById(id) {
    const query = "SELECT * FROM voting_submissions WHERE submission_id = $1";
    const { rows } = await db.query(query, [id]);
    return rows[0];
  }

  static async getSubmissionsByStatus(submission_status) {
    const query =
      "SELECT * FROM voting_submissions WHERE submission_status= $1 ORDER BY votes DESC";
    const { rows } = await db.query(query, [submission_status]);
    return rows;
  }

  static async createSubmission(submission) {
    const { title, category, proposal, photo } = submission;
    const query =
      "INSERT INTO voting_submissions (title, category, proposal, photo) VALUES ($1, $2, $3, $4) RETURNING *";
    const values = [title, category, proposal, photo];
    const { rows } = await db.query(query, values);
    return rows[0];
  }

  static async updateSubmission(id, submission) {
    const { title, category, proposal, photo, submission_status } = submission;
    const query =
      "UPDATE voting_submissions SET title = $1, category = $2, proposal = $3, photo = $4, submission_status = $5 WHERE submission_id = $6 RETURNING *";
    const values = [title, category, proposal, photo, submission_status, id];
    const { rows } = await db.query(query, values);
    console.log(rows[0]);
    return rows[0];
  }
  //test

  static async updateSubmissionStatus(id, action) {
    const query =
      "UPDATE voting_submissions SET submission_status = $1 WHERE submission_id = $2 RETURNING *";
    const values = [action, parseInt(id)];
    const { rows } = await db.query(query, values);
    console.log(rows[0]);
    return rows[0];
  }

  static async vote(count, id, user_id) {
    const query = `UPDATE voting_submissions SET votes = votes + $1 WHERE submission_id = $2`;
    const values = [count, id];
    const userQuery = `UPDATE users SET votes_used = votes_used + $1 WHERE user_id = $2`;
    const userValues = [count, user_id];
    const { rows } = await db.query(query, values);
    const { userRows } = await db.query(userQuery, userValues);
    return { submission: rows[0], users: userRows[0] };
  }

  static async clearVotes() {
    const query = `UPDATE users SET votes_used = 0`;
    const { rows } = await db.query(query);
    return rows;
  }

  static async denyAll() {
    const query = `UPDATE voting_submissions SET submission_status = 'denied' WHERE submission_status = 'approved' RETURNING *`;
    const { rows } = await db.query(query);
    return rows;
  }
}

module.exports = Submissions;
