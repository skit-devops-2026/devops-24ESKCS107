import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import workoutRoutes from "./routes/workoutRoutes.js";


dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.json({ message: "FitForge API is running" });
});

const startServer = async () => {
  await connectDB();
  app.use("/api/workouts", workoutRoutes);

  app.listen(process.env.PORT || 5000, () => {
    console.log("Server running on port 5000");
  });
};

startServer();