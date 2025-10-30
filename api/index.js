// api/index.js
import express from "express";
import serverless from "serverless-http";
import cors from "cors";
import morgan from "morgan";
import { connectDB } from "../src/config/db.js";
import auth from "../src/routes/auth.routes.js";
import empleados from "../src/routes/empleados.routes.js";

const app = express();

// permite tu front en Netlify
app.use(cors({
  origin: ["https://clinicabrayan.netlify.app", "http://localhost:5173"]
}));
app.use(morgan("dev"));
app.use(express.json());

// conecta a Mongo (cacheado en tu connectDB)
app.use(async (_req, _res, next) => { await connectDB(); next(); });

// ⚠️ OJO: SIN /api aquí
app.get("/health", (_req, res) => res.json({ ok: true }));
app.use("/auth", auth);
app.use("/empleados", empleados);

// exporta la función serverless
export default serverless(app);
