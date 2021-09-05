import express from "express";
import { join ,login } from "../controllers/userController";
import { trending, search } from "../controllers/videocontroller";

const globalRouter = express.Router();

globalRouter.get("/", trending);
globalRouter.get("/join", join);
globalRouter.get("/login", login); //꼭 로그인이라고 적어줄 필요는 없다 추천사항같은것이다


export default globalRouter;
