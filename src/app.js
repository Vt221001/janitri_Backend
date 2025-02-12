import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import { fileURLToPath } from "url";
import path from "path";
import { send } from "process";
import { errorHandler } from "./middleware/errorHandler.js";
import { userRouter } from "./routes/user.routes.js";
import { patientRouter } from "./routes/patient.routes.js";
import { heartRateRouter } from "./routes/heartRate.routes.js";
dotenv.config({
  path: "./.env",
});

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
  })
);

app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

app.use("/api", userRouter);
app.use("/api", patientRouter);
app.use("/api", heartRateRouter);

app.get("/", (req, res) => {
  res, send("welcome to Janitri Backend Assignment");
});

app.use(errorHandler);

export default app;
