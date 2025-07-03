import express from "express";
import dotenv from "dotenv";
import { getdata } from "./controller/GetData.js";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config();

const app = express();

app.use(express.json());
app.use(
  cors({
    origin: process.env.CORS_ORIGINS
      ? process.env.CORS_ORIGINS.split(",")
      : ["http://localhost:5173"],
    methods: ["POST", "PUT", "DELETE", "GET"],
    credentials: true,
  })
);

app.use(express.static(path.join(__dirname, "../Frontend/vite-project/dist")));

app.get("/get", (req, res, next) => {
  console.log("GET /get endpoint hit");
  getdata(req, res, next);
});

app.get("*", (req, res) => {
  console.log("Frontend fallback triggered for:", req.url);
  res.sendFile(
    path.join(__dirname, "../Frontend/vite-project/dist/index.html")
  );
});

app.use((err, req, res, next) => {
  console.error("Error in route:", req.path, err.message, err.stack);
  res.status(500).json({ success: false, message: "Internal Server Error" });
});

const port = process.env.PORT || 3004;
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
  console.log("Environment variables:", {
    PORT: process.env.PORT,
    CORS_ORIGINS: process.env.CORS_ORIGINS,
    DB_HOST: process.env.DB_HOST,
    DB_NAME: process.env.DB_NAME,
  });
});
