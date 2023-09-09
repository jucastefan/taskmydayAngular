const express = require("express");
const morgan = require("morgan");
const cors = require("cors");

const taskRouter = require("./routes/taskRoutes");

const app = express();
app.use(cors());

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

app.use(express.json());
app.use(express.static(`${__dirname}/public`));

app.use("/api/v1/tasks", taskRouter);

module.exports = app;
