import express, { json } from "express";
import dotenv from "dotenv";
import cors, { CorsOptions } from "cors";
import { router } from "./routes";
import connect from "./db/connect";

dotenv.config();

const app = express();
const port = process.env.PORT || 8000;
const DB_URL = process.env.MONGODB_URI || "";

const CORS_OPTIONS: CorsOptions = {
  optionsSuccessStatus: 200,
  origin: [/localhost/],
  credentials: true,
  allowedHeaders: ["x-trace-token", "Cookie", "Content-Type", "Authorization"],
};

app.use(express.urlencoded({ extended: true }));
app.use(cors(CORS_OPTIONS));
app.use(json());

connect({ db: DB_URL });

app.use(router);

app.get("/_health", (req, res) => {
  res.send("OK");
});

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});
