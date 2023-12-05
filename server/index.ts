import express, { json } from "express";
import dotenv from "dotenv";
import cors from "cors";
import { router } from "./routes";
import connect from "./db/connect";

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;
const DB_URL = process.env.MONGODB_URI || "";

app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(json());

connect({ db: DB_URL });

app.use(router);

app.get("/_health", (req, res) => {
  res.send("OK");
});

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});
