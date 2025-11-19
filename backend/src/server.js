import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";
import linkRoutes from "./routes/linkRoutes.js";
import { Link } from "./models/Link.js";
import analyticsRoutes from "./routes/analyticsRoutes.js";

dotenv.config();

const app = express();

app.use(cors({
  origin: [
    "http://localhost:3000",
    "https://tinylink-assignment.vercel.app",
    "https://tinylink-assignment-cbnpetnmg-vishals-projects-09d6ab4d.vercel.app"
  ],
  methods: ["GET", "POST", "DELETE"],
  allowedHeaders: ["Content-Type"],
}));


app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/links", linkRoutes);

app.use("/api/analytics", analyticsRoutes);

app.get("/healthz", (req, res) => {
  res.status(200).json({ ok: true, version: "1.0" });
});
app.get("/:code", async (req, res) => {
  try {
    const { code } = req.params;
    const link = await Link.findOne({ code });

    if (!link) {
      return res.status(404).json({ message: "Link not found" });
    }

    link.totalClicks += 1;
    link.lastClicked = new Date();
    await link.save();

    return res.redirect(302, link.url);

  } catch (err) {
    console.error("Error redirecting:", err);
    return res.status(500).json({ message: "Server error" });
  }
});

connectDB();

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
