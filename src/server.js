
import express from "express";
import morgan from "morgan";
import session from "express-session";
import flash from "express-flash";
import rootRouter from "./routers/rootRouter";
import videoRouter from "./routers/videoRouter";
import userRouter from "./routers/userRouter";
import { localsMiddleware } from "./middlewares";
import MongoStore from "connect-mongo";
import apiRouter from "./routers/apiRouter";

const app = express();
const logger = morgan("dev");

app.set("view engine", "pug");
app.set("views", process.cwd() + "/src/views");
app.use(logger);
app.use(express.urlencoded({ extended: true }));

console.log(process.env.COOKIE_SECRET);

app.use(
  session({
    secret: process.env.COOKIE_SECRET,
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({ mongoUrl: process.env.DB_URL }),
  })
);

app.use((req, res, next) => {
  res.locals.sexy = "you";
  req.sessionStore.all((error, sessions) => {
    console.log(sessions);
    next();
  });
});

//app.use(express.json());
app.use(flash());
app.use(localsMiddleware); // 순서가 매우 중요합니다 위에 있으면 출력해주지 않아요
app.use("/uploads",express.static("uploads"));
app.use("/static",express.static("assets"),express.static("node_modules/@ffmpeg/core/dist"));
app.use("/", rootRouter);
app.use((req, res, next) => {
  res.header("Cross-Origin-Embedder-Policy", "require-corp");
  res.header("Cross-Origin-Opener-Policy", "same-origin");
  next();
  });
app.use("/videos", videoRouter);
app.use("/users", userRouter);
app.use("/api",apiRouter);
export default app;
