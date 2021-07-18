import express from "express";
import morgan from "morgan";
const app = express();
const logger = morgan("dev");
const POST = 4000;

// const logger = (req,res,next) => {
//     console.log(`${req.method} ${req.url}`);
//     next();
// };

const privateMiddleware = (req,res,next) => {
    const url =req.url;
    if(url ==="/protected"){
        return res.send("<h1>Not Allowed</h1>");
    }
};
const handleListening = () => console.log(`Listening on port http:/localhost:${POST}`);

const home = (req, res) => {
    return res.send("hello");
  };
  const login = (req, res) => {
    return res.send("login");
  };

app.use(logger);
app.get("/", home);
app.get("/login", login);
app.listen(POST , handleListening);


// app.get("/protected",handleProtected);
// const handleProtected = (req,res) => {
//     return res.send("Welcome to the private lounge.");
// }