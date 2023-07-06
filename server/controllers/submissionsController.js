const Submissions = require("../models/Submissions");
const User = require("../models/User");
const Token = require("../models/Token");

class SubmissionController {
  static async getAllSubmissions(req, res) {
    try {
      const data = await Submissions.getAllSubmissions();
      res.status(200).json(data);
    } catch (error) {
      res.status(500).json({ error: `Internal Server Error - ${error}` });
    }
  }

  static async getSubmissionById(req, res) {
    const { id } = req.params;
    try {
      const submission = await Submissions.getSubmissionById(id);
      if (submission) {
        res.status(200).json(submission);
      } else {
        res.status(404).json({ error: `Submission not found` });
      }
    } catch (error) {
      res.status(500).json({ error: `Oops something went wrong - ${error}` });
    }
  }

  static async getSubmissionsByStatus(req, res) {
    const status = req.params.type;
    console.log(status);
    try {
      const submissions = await Submissions.getSubmissionsByStatus(status);
      res.status(200).json(submissions);
    } catch (err) {
      res.status(404).json({ error: err.message });
    }
  }

  static async createSubmission(req, res) {
    const submission = req.body;
    try {
      console.log("right here");
      const newSubmission = await Submissions.createSubmission(submission);
      console.log(submission);
      res.status(201).json(newSubmission);
    } catch (error) {
      res.status(500).json({ Error: `Error - ${error}` });
    }
  }

  static async newSubmission(req, res) {
    const submission = req.body;
    try {
      const newSubmission = await Submissions.newSubmission(submission);
      console.log(newSubmission);
      res.status(201).json(newSubmission);
    } catch (error) {
      res.status(500).json({ Error: `Error - ${error}` });
    }
  }

  static async updateSubmission(req, res) {
    try {
      const id = parseInt(req.params.id);
      const data = req.body;
      const result = await Submissions.updateSubmission(id, data);
      res.status(200).json(result);
    } catch (err) {
      res.status(404).json({ error: err.message });
    }
  }

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
  }

  //testtest

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

module.exports = SubmissionController;
