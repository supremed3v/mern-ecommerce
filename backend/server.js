import express from "express";
import fileUpload from "express-fileupload";
import cors from "cors";
import cloudinary from "cloudinary";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import connectDB from "./db.js";
import userRoutes from "./routes/userRoutes.js";
import productRoutes from "./routes/productRoutes.js";
import bodyParser from "body-parser";

dotenv.config();

connectDB();

const app = express();
app.use(express.json({ limit: "50mb" }));
app.use(cookieParser());
app.use(express.urlencoded({ extended: true, limit: "50mb" }));
app.use(bodyParser.urlencoded({ extended: true, limit: "50mb" }));
app.use(cors());
app.use(
  fileUpload({
    useTempFiles: true,
  })
);

// Routes

app.use("/api/v1", userRoutes);
app.use("/api/v1", productRoutes);
app.use("/", (req, res) => {
  res.send(200).json({ message: "Welcome to the API" });
});

// Connect to cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
});

const PORT = process.env.PORT;

process.on("uncaughtException", (err) => {
  console.log(`Error: ${err.message}`);
  console.log(`Shutting down the server due to Uncaught Exception`);
  process.exit(1);
});

const server = app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

// Handle unhandled promise rejections

process.on("unhandledRejection", (err) => {
  console.log(`Logged Error: ${err}`);
  server.close(() => process.exit(1));
});
