const express = require("express");
const morgan = require("morgan");
const helmet = require("./node_modules/helmet/dist");
const mongoSanitize = require("./node_modules/express-mongo-sanitize");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const AppError = require("./utils/appError");
const globalErrorHandler = require("./controllers/errorController");
const spotRouter = require("./routes/spotRoutes");
const userRouter = require("./routes/userRoutes");

const app = express();
const path = require("path");
app.use(cors());
// 1) ------------------MIDDLEWARE-------------
// Set security HTTP header
app.use(helmet());

//development logging
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}
//body parser, reading data from body into req.body
app.use(express.json());
app.use(cookieParser());

//Data sanitization against noSql query injection
app.use(mongoSanitize());
//Data sanitization against xss

app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  // console.log(req.cookies);
  next();
});
app.use(express.static(path.join(__dirname, "client/build")));

// 3) ---------------ROUTES-------------
app.use("/static", express.static("public"));
app.use("/api/v1/spots", spotRouter);
app.use("/api/v1/users", userRouter);

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "client", "build", "index.html"));
});

app.all("*", (req, res, next) => {
  next(new AppError(`can't find ${req.originalUrl} on this server!`));
});

app.use(globalErrorHandler);

module.exports = app;
