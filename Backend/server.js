require("dotenv").config();
const express = require("express");
const multer = require("multer");
const cors = require("cors");
const fs = require("fs");
const path = require("path");
const { spawn } = require("child_process");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const rateLimit = require("express-rate-limit");

const app = express();

// ====== Middlewares ======
app.use(express.json({ limit: "2mb" }));
app.use(cookieParser());
app.use(
  cors({
    origin: [process.env.CLIENT_URL, "http://localhost:5173", "http://localhost:5174"],
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  })
);

// Rate limit auth endpoints
const authLimiter = rateLimit({ windowMs: 15 * 60 * 1000, max: 100 });
app.use("/api/auth", authLimiter);

// ====== MongoDB connect ======
mongoose
  .connect(process.env.MONGO_URI, { dbName: "bg_remover" })
  .then(() => console.log("✅ MongoDB connected"))
  .catch((err) => console.error("MongoDB error:", err.message));

// ====== Health check ======
app.get("/api/health", (req, res) => res.send("Server is running ✅"));

// ====== Auth routes ======
app.use("/api/auth", require("./routes/auth"));

// ====== Background removal ======
if (!fs.existsSync("uploads")) fs.mkdirSync("uploads");
if (!fs.existsSync("outputs")) fs.mkdirSync("outputs");

const upload = multer({ dest: "uploads/" });

app.post("/remove-bg", upload.single("image"), (req, res) => {
  const inputPath = req.file.path;
  const outputPath = path.join("outputs", `${Date.now()}-output.png`);

  const python = spawn(
    process.platform === "win32"
      ? path.join(__dirname, "venv", "Scripts", "python.exe")
      : "python3",
    ["remove_bg.py", inputPath, outputPath]
  );

  python.stdout.on("data", (d) => process.stdout.write(`Python stdout: ${d}`));
  python.stderr.on("data", (d) => process.stdout.write(`Python stderr: ${d}`));

  python.on("close", (code) => {
    if (code !== 0) {
      try { fs.existsSync(inputPath) && fs.unlinkSync(inputPath); } catch {}
      return res.status(500).json({ error: "Background removal failed" });
    }
    res.sendFile(path.resolve(outputPath), () => {
      try { fs.unlinkSync(inputPath); } catch {}
      try { fs.unlinkSync(outputPath); } catch {}
    });
  });
});

// ====== Start server ======
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`✅ Server running on http://localhost:${PORT}`));
