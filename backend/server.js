import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import router from "./routes/analyse.route.js";
import globalErrorHandler from "./controllers/global_error.controller.js";

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

app.use("/api/", router);

// Global error handling middleware
app.use(globalErrorHandler);
