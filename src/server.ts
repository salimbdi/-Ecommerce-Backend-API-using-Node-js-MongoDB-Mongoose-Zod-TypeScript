import app from './app';
import dotenv from "dotenv";
import connectDB from "./config/db";

dotenv.config();
const PORT = process.env.PORT || 4000;

// connect to MongoDB before starting server
connectDB();

app.listen(PORT, () => {
  console.log(`Server listening on http://localhost:${PORT}`);
});
