import express from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import userRoutes from "./routes/user";

const app = express();
const PORT = 3000;
const MONGO_URI = "app-mongodb-uri";

app.use(bodyParser.json());
app.use("/api/users", userRoutes);

mongoose
  .connect(MONGO_URI, {})
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("Database connection error:", err);
  });
