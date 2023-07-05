const express = require("express");
const SubmissionsController = require("../controllers/submissionsController")
const submissionRouter = express.Router();

submissionRouter.get("/", SubmissionsController.getAllSubmissions);
submissionRouter.get("/:id", SubmissionsController.getSubmissionById);
submissionRouter.post("/", SubmissionsController.createSubmission);
// submissionRouter.delete("/id", SubmissionsController.deleteSubmission);
submissionRouter.patch("/vote/:id", SubmissionsController.vote)


//admin
submissionRouter.patch("/", SubmissionsController.clearVotes)
submissionRouter.get("/status", SubmissionsController.getSubmissionsByStatus);
submissionRouter.patch("/:id", SubmissionsController.updateSubmissionStatus)
submissionRouter.put("/:id", SubmissionsController.updateSubmission);

module.exports = submissionRouter;
