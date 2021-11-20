import express from "express";
import { join ,login } from "../controllers/userController";
import { home, search } from "../controllers/videocontroller";

const globalRouter = express.Router();

globalRouter.get("/", home);
globalRouter.get("/join", join);
globalRouter.get("/login", login); //꼭 로그인이라고 적어줄 필요는 없다 추천사항같은것이다
globalRouter.get("/search", search); 


export default globalRouter;
