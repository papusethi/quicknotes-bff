import { configDotenv } from "dotenv";
import express from "express";
import path, { dirname } from "path";
import { fileURLToPath } from "url";
import userRouter from "./routes/user.route.js";

// Resolves the current path. An alternative way for CommonJS way.
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

configDotenv({ path: path.resolve(__dirname, "../.env") });

const app = express();

const port = parseInt(process.env.PORT) || 12000;
const hostname = process.env.HOSTNAME || "localhost";

app.listen(port, hostname, () => {
  console.log(`QuikNotes server is running: http://${hostname}:${port}`);
});

app.use("/user", userRouter);
