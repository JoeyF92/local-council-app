const express = require("express");
const SubmissionsController = require("../controllers/submissionsController")
const submissionRouter = express.Router();

submissionRouter.get("/", SubmissionsController.getAllSubmissions);
submissionRouter.get("/:id", SubmissionsController.getSubmissionById);
submissionRouter.get("/status", SubmissionsController.getSubmissionsByStatus);
submissionRouter.post("/", SubmissionsController.createSubmission);
// submissionRouter.delete("/id", SubmissionsController.deleteSubmission);
submissionRouter.put("/:id", SubmissionsController.updateSubmission);
submissionRouter.patch("/vote/:id", SubmissionsController.vote)
submissionRouter.patch("/:id", SubmissionsController.updateSubmissionStatus)


module.exports = submissionRouter;