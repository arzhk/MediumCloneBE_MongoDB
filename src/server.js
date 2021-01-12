const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const listEndpoints = require("express-list-endpoints");
const articlesRoutes = require("./articles");
const {
  notFoundHandler,
  unauthorizedHandler,
  forbiddenHandler,
  badRequestHandler,
  catchAllHandler,
} = require("./errorHandling");

const app = express();

const port = process.env.PORT || 3001;

const loggerMiddleware = (req, res, next) => {
  console.log(`Logged ${req.url} ${req.method} -- ${new Date()}`);
  next();
};

app.use(cors());
app.use(express.json());
app.use(loggerMiddleware);

app.use("/articles", articlesRoutes);

app.use(notFoundHandler);
app.use(unauthorizedHandler);
app.use(forbiddenHandler);
app.use(badRequestHandler);
app.use(catchAllHandler);

console.log(listEndpoints(app));

mongoose
  .connect(process.env.MONGO_CONNECTION, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(
    app.listen(port, () => {
      console.log("Server is running on port: ", port);
    })
  );
