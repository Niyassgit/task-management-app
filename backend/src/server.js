import "dotenv/config";
import app from "./app.js";
import mongoose from "mongoose";

const PORT = process.env.PORT || 3000;
const MONGODB_URI = process.env.MONGODB_URI;
mongoose
  .connect(MONGODB_URI)
  .then(() => {
    console.log("Db is connected successfully ✅");
    app.listen(PORT, () => {
      console.log(`Server is running on the port http://localhost:${PORT}`);
    });
  })
  .catch((err) => console.log("Could not connected to MongoDB", err));
