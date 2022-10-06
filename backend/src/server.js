import express from "express";
import bodyParser from "body-parser";
import viewEngine from "./config/viewEngine";
import initWebRouter from "./routes/web";
import connectDB from "./config/connectDB";
import cors from "cors";
require("dotenv").config();

let app = express();
app.use(cors({ credentials: true, origin: true }));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

viewEngine(app);
initWebRouter(app);

connectDB();

let port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log("server running" + port);
});
