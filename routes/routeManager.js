const homeRouter = require("./homeRouter");
const userRouter = require("./userRouter");
const apiRouter = require("./apiRouter");
module.exports = (app) => {
  app.use("/user/api", apiRouter);
  app.use("/user", userRouter);
  app.use("/", homeRouter);
};
