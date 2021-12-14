import express from "express";
import { getJoin ,postJoin,getLogin,postLogin } from "../controllers/userController";
import { home, search } from "../controllers/videocontroller";
import { publicOnlyMiddleware } from "../middlewares";

const rootRouter = express.Router();

rootRouter.get("/", home);
rootRouter.route("/join").all(publicOnlyMiddleware).get(getJoin).post(postJoin);
rootRouter.route("/login").all(publicOnlyMiddleware).get(getLogin).post(postLogin); //꼭 로그인이라고 적어줄 필요는 없다 추천사항같은것이다
rootRouter.get("/search", search); 


export default rootRouter;
