import express from "express";
import compression from "compression";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import "express-async-errors";

import Env from "./config/env";
import router from "./routes";
import { errorHandler } from "./middlewares/errorHandler";

const app = express();

app.set("trust proxy", 1);

app.use(
  cors({
    origin: Env.frontendUrl,
    credentials: true,
  })
);
app.use(helmet());
app.use(compression());
app.use(express.json({ limit: "1mb" }));
app.use(express.urlencoded({ extended: true }));
app.use(morgan(Env.isDev ? "dev" : "combined"));

app.use(router);
app.use(errorHandler);

export default app;

