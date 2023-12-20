import express from "express";
import { connectDB } from "./dataBase/connection.js";
import { config } from "dotenv";
import bodyParser from "body-parser";
import routes from "./routes/index.js";
import cors from "cors";
const app = express();
config();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());
app.use(express.json());
app.use(routes);


connectDB();

app.use((err, req, res, next) => {
  res.status(err.status || 400).json({
    msg: err.msg,
  });
});

app.listen(process.env.PORT, () => {
  console.log(`Server started at  port ${process.env.PORT}`);
  console.log("Press CTRL+C to Stop Server");
});
