const express = require("express");
const cors = require("cors");
const logRoutes = require("./middleware/logger");
const submissionRouter = require("./routes/submissions");

//const userRouter = require("./routers/user");
//add other routers here:

const app = express();

app.use(cors());
app.use(express.json());
app.use(logRoutes);

app.get("/", (req, res) => {
  res.json({
    name: "Vote for your services",
    description:
      "See what improvements are happening in your area and make your own suggestions",
  });
});

//app.use("/users", userRouter);
app.use('/submissions', submissionRouter)

module.exports = app;
