const db = require("../database/connect");

const Submissions = require("../models/Submissions");
const User = require("../models/User");
const Token = require("../models/Token");


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

  static async updateSubmissionStatus(req, res) {
    try {
      const id = req.params.id;
      const action = req.body.action;
      const result = await Submissions.updateSubmissionStatus(id, action);
      res.status(200).json(result);
    } catch (err) {
      res.status(404).json({ error: "Failed to update status" });
    }
  }
  static async vote(req, res) {
    const { id } = req.params;
    const count = parseInt(req.body.votes);
    try {
      const token = req.headers.authorization;
      const user = await Token.getOneByToken(token);
      if (user.votes_used + count > 7) {
        throw new Error("Exceeded maximum votes allowed");
      }
      const updatedSubmission = await Submissions.vote(count, id);
      res.json(updatedSubmission);
      console.log("voted");
    } catch (err) {
      res.status(500).json({ error: "Failed to vote for the submission" });
    }

    static async vote(req, res){
        const id = parseInt(req.params.id) +1;
        const count = parseInt(req.body.vote);
        console.log(count)
        try {
            const token = req.headers.authorization;
            const tokenData = await Token.getOneByToken(token)
            const user_id = tokenData['user_id']
            const user = await User.getOneById(user_id)
        if(user.votes_used + count > 7) {
          console.log(user.votes_used + count)
            throw new Error('Exceeded maximum votes allowed');
        }
            console.log(count, id, user_id)
            const updatedSubmission = await Submissions.vote(count, id,  user_id);
            console.log("hiya")
            console.log(updatedSubmission)
            res.json(updatedSubmission);
            console.log("voted")
        }catch (err) {
        res.status(500).json({ error: 'Failed to vote for the submission' });
        }
    }

  static async clearVotes(req, res) {
    try {
      const data = await Submissions.clearVotes();
      res.status(200).json(data);
    } catch (error) {
      res.status(500).json({ error: `Internal Server Error - ${error}` });
    }
  }

  static async denyAll(req, res) {
    try {
      console.log("in here");
      const data = await Submissions.denyAll();
      res.status(200).json(data);
    } catch (error) {
      res.status(500).json({ error: `Internal Server Error - ${error}` });
    }
  }
}

module.exports = Submissions;