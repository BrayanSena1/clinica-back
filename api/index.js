
import express from "express";
import serverless from "serverless-http";
import cors from "cors";
import morgan from "morgan";
import { connectDB } from "../src/config/db.js";

import auth from "../src/routes/auth.routes.js";
import empleados from "../src/routes/empleados.routes.js";

const app = express();
app.use(cors({ origin: ["https://TU-SITIO.netlify.app", "http://localhost:5173"] }));
app.use(morgan("dev"));
app.use(express.json());

// Conectar a Mongo antes de atender rutas (cacheado)
app.use(async (_req, _res, next) => { await connectDB(); next(); });

app.get("/api/health", (_req, res) => res.json({ ok: true }));
app.use("/api/auth", auth);
app.use("/api/empleados", empleados);

export default serverless(app);

