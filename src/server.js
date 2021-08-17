import express from "express";
import morgan from "morgan";
import globalRouter from "./routers/globalRouter";
import videoRouter from "./routers/videoRouter";
import userRouter from "./routers/userRouter";


const app = express();
const logger = morgan("dev");
const POST = 4050;

app.set("view engine","pug");
app.set("views", process.cwd() + "/src/views");
app.use(logger);
app.use("/",globalRouter);
app.use("/videos",videoRouter);
app.use("/users",userRouter);


const handleListening = () => console.log(`Listening on port http:/localhost:${POST}`);
app.listen(POST , handleListening);

