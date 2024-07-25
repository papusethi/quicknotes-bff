import cookieParser from "cookie-parser";
import { configDotenv } from "dotenv";
import express from "express";
import mongoose from "mongoose";
import path, { dirname } from "path";
import { fileURLToPath } from "url";
import authRouter from "./routes/auth.route.js";
import noteRouter from "./routes/note.route.js";
import userRouter from "./routes/user.route.js";

// Resolves the current path. An alternative way for CommonJS way.
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

configDotenv({ path: path.resolve(__dirname, "../.env") });

const port = parseInt(process.env.PORT) || 12000;
const hostname = process.env.HOSTNAME || "localhost";

// Connection to MongoDB.
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.info("Connected to MongoDB"))
  .catch((error) => console.error(error));

// Express app creation.
const app = express();

// Server listening.
app.listen(port, hostname, () => {
  console.log(`QuikNotes server is running: http://${hostname}:${port}`);
});

// Middlewares usage.
app.use(express.json());
app.use(cookieParser());

// Route specific middlewares.
app.use("/auth", authRouter);
app.use("/user", userRouter);
app.use("/note", noteRouter);

// Global error middleware.
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server Error";
  return res.status(statusCode).json({ success: false, statusCode, message });
});
